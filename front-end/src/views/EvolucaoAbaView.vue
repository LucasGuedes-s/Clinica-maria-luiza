<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_evolucao">
        <div>
            <GraficoEvolucao :dado="cpf" />
        </div>
        <div class="titulo_evolucao">
            <h1>Histórico de consultas Aba</h1>
        </div>
        <table class="tabela">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Atividade</th>
                    <th>Aplicador</th>
                    <th>Aplicação 01</th>
                    <th>Aplicação 02</th>
                    <th>Aplicação 03</th>
                    <th>Aplicação 04</th>
                    <th>Aplicação 05</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="consult in consulta" :key="consult.pacientes">
                    <td>{{ formatDate(consult.data) }}</td>
                    <td>{{ consult.descricao_atividade }}</td>
                    <td>{{ consult.profissional.nome }}</td>
                    <td>{{ consult.Aplicacao1 }}</td>
                    <td>{{ consult.Aplicacao2 }}</td>
                    <td>{{ consult.Aplicacao3 }}</td>
                    <td>{{ consult.Aplicacao4 }}</td>
                    <td>{{ consult.Aplicacao5 }}</td>
                    <button class="btn_foto" @click="abrirFoto(consult.foto)">Ver foto</button>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { formatDate } from '../utils/formatarData';

export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            consulta: [],
            formatDate
        }
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        Sidebar,
        GraficoEvolucao
    },
    methods: {
        async abrirFoto(link) {
                try {
                    if (link.length === 0) {
                        Swal.fire("Nenhuma imagem foi anexada nessa consulta");
                    }
                    else if (link) {
                        window.open(link, '_blank');
                    }

                }
                catch {
                }

            },
        async getConsultas() {
            await Axios.get(`https://clinica-maria-luiza.onrender.com/consultasAba/paciente/${this.cpf}`
            ).then(response => {
                this.consulta = response.data.consultas.slice(-7)

            }).catch(error => {
                console.error(error)
            })
        }
    }
}
</script>

<style>
.titulo_evolucao {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #84E7FF;
}

.titulo_evolucao h1 {
    color: #D9D9D9;
}
.main-content_evolucao{
    margin-left: 250px;
    padding: 10px;
}

/* Cabeçalho da tabela */
table thead {
    background-color: #84E7FF;
    color: #fff;
}

table {
    background-color: white;
    width: 100%;
}

table th,
table td {
    padding: 12px 15px;
    text-align: left;
}

table th {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
}

/* Linhas da tabela */
table tbody tr {
    border-bottom: 1px solid #ddd;
}

/* Cor alternada nas linhas da tabela */
table tbody tr:nth-of-type(even) {
    background-color: #f2f2f2;
}

table tbody tr:hover {
    background-color: #f1f1f1;
}

/* Estilo das células */
table td {
    font-size: 14px;
}

.btn_foto {
    background-color: #84E7FF;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
}

@media (max-width: 768px) {
    .main-content_evolucao {
        margin-left: 0;
        padding: 10px;
    }
    table {
        font-size: 10px; /* Diminui ainda mais o tamanho da fonte */
    }

    table th,
    table td {
        padding: 6px 8px; /* Diminui ainda mais o padding */
    }

    /* Para esconder colunas que podem ser menos importantes */
    table th:nth-child(n+3), /* Altera o n conforme necessário */
    table td:nth-child(n+3) {
        display: none; /* Esconde colunas a partir da quarta */
    }

    .btn_foto {
        font-size: 12px; /* Diminui o tamanho do botão */
        padding: 6px; /* Ajusta o padding do botão */
    }
}
</style>
