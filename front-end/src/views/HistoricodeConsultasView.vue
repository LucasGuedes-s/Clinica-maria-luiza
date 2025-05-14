<template>
    <Sidebar />
    <div class="main-content">
        <h1>Histórico de Consultas</h1>
        <div class="input">
            <label for="especialidade">Filtrar por Especialidade:</label>
            <select v-model="especialidadeSelecionada">
                <option value="">Todas</option>
                <option v-for="especialidade in especialidadesUnicas" :key="especialidade" :value="especialidade">
                    {{ especialidade }}
                </option>
            </select>
        </div>
        <div class="container_historico" v-for="consulta in consultasFiltradas" :key="consulta.id">
            <h1 v-if="consultas.length == 0">Nenhuma consulta registrada</h1>

            <div class="infos_historico">
                <div class="info_item">
                    <label for="resposta-data">Data:</label>
                    <input type="text" id="resposta-data" :value="formatDate(consulta.data)" readonly>
                </div>
                <div class="info_item">
                    <label for="especialista-nome">Especialista:</label>
                    <input type="text" id="especialista-nome"
                        :value="consulta.consulta + ' - ' + consulta.profissional.nome" readonly>
                </div>

                <div class="info_item descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4" :value="consulta.descricao" readonly></textarea>
                </div>
                <div class="botoes">
                    <button class="btn_detalhar_hist" @click="laudo(consulta.laudos)">Fotos</button>
                    <button class="btn_arquivopdf_hist" @click="arquivoPdf(consulta.id)">Arquivo em PDF</button>
                    <button class="btn_editar_consul" @click="abrirModal(consulta)">Editar Consulta</button>
                </div>
            </div>
        </div>

        <!-- Modal de Edição -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Editar Consulta</h2>
                <label>Data:</label>
                <input type="date"  v-model="consultaEdit.data">

                <label for="imagem">Laudos:</label>
                <input type="file" @change="handleFileUpload" multiple>

                <label>Descrição:</label>
                <textarea rows="8" v-model="consultaEdit.descricao"></textarea>

                <div class="modal-buttons">
                    <button @click="salvarEdicao">Salvar</button>
                    <button @click="fecharModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    <Chat />
</template>

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}
.input{
    padding: 10px 20px;
    display: flex;
    margin-bottom: 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    background-color: white;
}
.input input,
select {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.container_historico {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
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

.descricao {
    grid-column: 1 / -1;
}

.botoes {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    gap: 20px;
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

.btn_detalhar_hist,
.btn_arquivopdf_hist,
.btn_editar_consul {
    flex: 1;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content h2 {
    color: #84E7FF;
    margin-bottom: 2px;
    font-size: 30px;
    margin-top: 2px;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 2px solid #84E7FF;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.modal-content input,
.modal-content textarea {
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
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    text-align: justify;
    resize: none;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;
}

.modal-buttons button {
    flex: 1;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
}

@media (max-width: 768px) {
    .main-content {
        margin-left: 0;
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import { useAuthStore } from '@/store.js'
import { formatDate } from '../utils/formatarData';
import Swal from 'sweetalert2';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';
import router from '@/router/index.js';
import api from '@/axios';
import Chat from '@/components/Chat.vue';

export default {
    name: 'historicodeconsulta',

    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    components: {
        Sidebar,
        Chat
    },
    data() {
        return {
            formatDate,
            consultas: [],
            especialidadeSelecionada: "",
            cpf: sessionStorage.getItem('cpf') || '',
            arquivosSelecionados: [],
            formatDate,
            showModal: false,
            consultaEdit: {},
            laudos: [], // <-- aqui!

        };
    },
    mounted() {
        //Limpar o CPF do sessionStorage após uso
        //sessionStorage.removeItem('cpf');
        this.getConsultas()
    },
    computed: {
        consultasFiltradas() {
            if (!this.especialidadeSelecionada) {
                return this.consultas; // Exibe todas se nenhuma especialidade for escolhida
            }
            return this.consultas.filter(consulta =>
                consulta.consulta && consulta.consulta === this.especialidadeSelecionada
            );
        },
        especialidadesUnicas() {
            return [...new Set(this.consultas.map(consulta => consulta.consulta).filter(Boolean))];
        }
    },
    methods: {
        async laudo(link) {
            try {
                if (link.length === 0) {
                    Swal.fire("Nenhum laudo anexado nesta consulta");
                }
                else if (link) {
                    for (let i = 0; i < link.length; i++) {
                        window.open(link[i], '_blank');
                    }
                }

            }
            catch {

            }

        },
        async arquivoPdf(id) {
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 3000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await Axios({
                url: `https://clinica-maria-luiza-bjdd.onrender.com/pdf/consulta/${id}`,  // Altere a URL conforme necessário
                method: 'GET',
                responseType: 'blob',  // Importante para tratar a resposta como um blob
            }).then(response => {
                // Crie um URL para o blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `consulta.pdf`); // Nome do arquivo
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao gerar PDF',
                    timer: 4000,
                })
                console.error('Erro ao baixar o PDF:', error)
            });
        },
        async getConsultas() {
            const token = this.store.token
            const cpf = this.cpf

            api.get(`/consulta/paciente/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.consultas = response.data.consultas.consultas.slice().reverse()
                console.log(this.consultas)
                //sessionStorage.removeItem('cpf');
            }).catch(error => {
                console.error(error)
            })
        },
        abrirModal(consulta) {
            const formattedDate = new Date(consulta.data).toISOString().split('T')[0]; // Ex: "2025-03-29"
            this.consultaEdit = { 
                ...consulta,
                data: formattedDate,
                laudos: consulta.laudos || []
                // consultaAba: consult.consultaAba || {} 
            }; 
            this.showModal = true;
        },
        fecharModal() {
            this.showModal = false;
        },
        async salvarEdicao() {
            const token = this.store.token;

            try {
                if (this.laudos.length > 0) {
                    this.consultaEdit.laudos = this.laudos;
                }

                const consultaParaEnvio = JSON.parse(JSON.stringify(this.consultaEdit));

                const response = await api.put(
                    '/editar/consulta',
                    consultaParaEnvio,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const index = this.consultas.findIndex(c => c.id === this.consultaEdit.id);
                if (index !== -1) {
                    this.consultas.splice(index, 1, {
                        ...this.consultaEdit,
                        profissional: this.consultas[index].profissional
                    });
                }

                this.showModal = false;
                this.laudos = [];

                Swal.fire({
                    icon: 'success',
                    title: 'Consulta atualizada com sucesso!',
                    timer: 2000
                });

            } catch (error) {
                console.error("Erro ao atualizar consulta:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao atualizar consulta',
                    text: error.response?.data?.error || 'Tente novamente mais tarde.'
                });
            }
        },
        async handleFileUpload(event) {
            try {
                const arquivos = Array.from(event.target.files); // Novas imagens
                const novasUrls = []; // Para armazenar os novos links

                for (const imagem of arquivos) {
                    const uniqueImageName = uuidv4() + '_' + imagem.name;
                    const storageRef = ref(storage, 'laudos/' + uniqueImageName);

                    const snapshot = await uploadBytes(storageRef, imagem);
                    const downloadURL = await getDownloadURL(snapshot.ref);

                    novasUrls.push(downloadURL); // Adiciona URL ao array
                }

                // Substitui o campo 'laudos' da consulta que está sendo editada
                this.consultaEdit.laudos = novasUrls;

                console.log("Laudos atualizados:", this.consultaEdit.laudos);
            } catch (error) {
                console.error("Erro ao carregar laudos", error);
            }
        },
        filtrarConsultas() {
            // Apenas força a reatividade, pois o filtro já acontece na computed
            this.consultas = [...this.consultas];
        },
    }
}
</script>