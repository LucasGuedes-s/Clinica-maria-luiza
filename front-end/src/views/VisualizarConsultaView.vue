<template>
    <Sidebar />
    <div class="main-content">
        <h1>Consultas</h1>

        <div class="filtros">
            <input type="text" placeholder="Buscar por nome do paciente" v-model="nomePaciente">
            <input type="date" id="data_inicio" v-model="dataInicio">
            <input type="date" id="data_fim" v-model="dataFim">
            <button class="btn_arquivopdf" @click="gerarPDF">Arquivo em PDF</button>
        </div>
        <div class="tipo_consulta">
            <button @click="getConsultas('TRADICIONAL')">Consultas</button>
            <button @click="getConsultas('ABA')">Consultas ABA</button>
        </div>
        <div class="container_consultas" v-for="consulta in consultasFiltradas" :key="consulta.id">
            <div class="infos_historico">
                <div class="info_item nome_paciente">
                    <label for="nome_paciente">Paciente:</label>
                    <input type="text" id="nome_paciente" :value="consulta.paciente.nome" readonly>
                </div>

                <div class="info_item">
                    <label for="resposta-data">Data:</label>
                    <input type="text" id="resposta-data" :value="`${formatDate(consulta.data)}`" readonly>
                </div>
                <div class="info_item">
                    <label for="especialista-nome">Hora de inicio e fim:</label>
                    <input type="text" id="especialista-nome"
                        :value="consulta.hora_inicio && consulta.hora_fim ? `${consulta.hora_inicio} - ${consulta.hora_fim}` : 'Horário não informado'"
                        readonly>
                </div>

                <div class="info_item descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4"
                        :value="tipo === 'ABA' ? consulta.descricao_atividade : consulta.descricao" readonly></textarea>
                    <label for="historico_descricao" v-if="tipo === 'ABA'">Aplicações:</label>
                    <textarea id="historico_descricao" rows="4" v-if="tipo === 'ABA'"
                        :value="[consulta.Aplicacao1, consulta.Aplicacao2, consulta.Aplicacao3, consulta.Aplicacao4, consulta.Aplicacao5].filter(Boolean).join('\n')"
                        readonly></textarea>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

h1 {
    color: #84E7FF;
}

.container_consultas {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
}

.tipo_consulta {
    display: flex;
    margin-bottom: 20px;
    gap: 20px;
}

.tipo_consulta button {
    width: 50%;
    padding: 10px 50px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    /* Sombra mais sutil na parte inferior */
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.infos_historico {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    box-sizing: border-box;
}

.info_item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.descricao,
.nome_paciente,
.btn_arquivopdf {
    grid-column: 1 / -1;
}

.info_item label {
    margin-bottom: 5px;
    color: #7E7E7E;
}

.info_item input,
.info_item textarea {
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    color: #7E7E7E;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
}

.info_item textarea {
    resize: none;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    text-align: justify;
}

.btn_arquivopdf {
    padding: 10px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    /* Agora ocupa 100% da largura */
}

.filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filtros input,
.filtros select {
    padding: 8px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    width: 100%;
}

.filtros button {
    padding: 10px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
}
</style>
<script>
import Sidebar from '@/components/Sidebar.vue';
import api from '@/axios';
import { useAuthStore } from '@/store';
import { formatDate } from '../utils/formatarData';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default {
    name: 'visualizarconsultas',
    components: {
        Sidebar
    },
    data() {
        return {
            consultas: [],
            email: '',
            tipoConsulta: '',
            formatDate,
            tipo: '',
            dataInicio: '',
            dataFim: '',
            nomePaciente: ''
        }
    },
    setup() {
        const store = useAuthStore()
        return { store }
    },
    methods: {
        async getConsultas(tipoConsulta) {
            try {
                const profissional = localStorage.getItem('profissional')
                const token = this.store.token
                this.tipo = tipoConsulta

                const filtro = {
                    email: profissional,
                    tipoConsulta: tipoConsulta
                }

                if (this.dataInicio) filtro.dataInicio = this.dataInicio
                if (this.dataFim) filtro.dataFim = this.dataFim

                await api.post(`/consultas`, filtro, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    this.consultas = response.data.consultasProfissional
                    console.log(this.consultas)
                }).catch(error => {
                    console.error(error)
                })

            } catch (error) {
                console.error('Erro ao buscar consultas:', error)
            }
        },
        gerarPDF() {
            try {
                const doc = new jsPDF();

                // Adicionar a imagem (logo)
                const imgPath = require('../assets/girafas.png');  // Ajuste para o caminho correto
                // Obter a largura da página
                const pageWidth = doc.internal.pageSize.width;

                // Obter a largura da imagem (ajuste a altura proporcionalmente para manter a qualidade)
                const imgWidth = 40;
                const imgHeight = 40;

                // Calcular a posição para centralizar a imagem
                const x = (pageWidth - imgWidth) / 2;  // Centraliza a imagem na página

                // Adicionar a imagem no centro do topo da página
                doc.addImage(imgPath, 'PNG', x, 10, imgWidth, imgHeight);  // Posição centralizada no topo (10px do topo)

                // Gerar a tabela com dados
                const dados = this.consultasFiltradas.map(consulta => {
                    return [
                        consulta.paciente.nome,
                        consulta.profissional.nome,

                        this.formatDate(consulta.data),
                        consulta.hora_inicio && consulta.hora_fim
                            ? `${consulta.hora_inicio} - ${consulta.hora_fim}`
                            : 'Não informado',
                        this.tipo === 'ABA'
                            ? consulta.descricao_atividade || ''
                            : consulta.descricao || ''
                    ];
                });

                // Adicionar a tabela com autoTable
                autoTable(doc, {
                    startY: 60,  // Inicia a tabela abaixo do título (ajuste conforme necessário)
                    head: [['Paciente', 'Profissional', 'Data', 'Horário', 'Descrição']],
                    body: dados,
                    styles: { fontSize: 10 },
                    headStyles: {
                        fillColor: [132, 231, 255],
                    },
                });

                doc.save(`consultas_${this.tipo}.pdf`)
            } catch (error) {
                console.error('Erro ao gerar PDF:', error)
            }
        }
    },
    computed: {
        consultasFiltradas() {
            if (!this.nomePaciente) return this.consultas;
            return this.consultas.filter(consulta =>
                consulta.paciente.nome.toLowerCase().includes(this.nomePaciente.toLowerCase())
            );
        }
    }
}
</script>
