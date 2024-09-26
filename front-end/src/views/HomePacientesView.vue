<template>
    <div class="titulo_evolucao">
        <h1>Agenda do paciente</h1>
    </div>
    <div class="conteiner_agendar">
        <div class="container_agendamentos" v-for="agenda in agendamentos" :key="agenda.id">
            <div class="resposta-informacao">
                <label for="paciente-nome">Agendamento:</label>
                <input type="text" id="paciente-nome" :value="agenda.agendamento" readonly>
                <label for="paciente-nome">Nome do Profissional:</label>
                <input type="text" id="paciente-nome" :value="agenda.profissional.nome" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" :value="agenda.dataFormatada" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" :value="agenda.horaFormatada" readonly>
            </div>
        </div>
    </div>
    <div class="main-content_consultas">
        <div>
            <GraficoEvolucao :dado="cpf" />
        </div>
        <div class="titulo_evolucao">
            <h1>Histórico de consultas</h1>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Aplicação 01</th>
                    <th>Aplicação 02</th>
                    <th>Aplicação 03</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="consult in consulta" :key="consult.pacientes">
                    <td>{{ formatDate(consult.data) }}</td>
                    <td>{{ consult.Aplicacao1 }}</td>
                    <td>{{ consult.Aplicacao2 }}</td>
                    <td>{{ consult.Aplicacao3 }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';
import Axios from 'axios';

import { formatDate } from '../utils/formatarData';

export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        this.getAgenda()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            agendamentos: [],
            consulta: [],
            formatDate
        }
    },
    setup() {
        return {
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        GraficoEvolucao
    },
    methods: {
        async getAgenda(){
            await Axios.get(`http://localhost:3000/pacientes/agendamentos/${this.cpf}`
            ).then(response => {
                this.agendamentos = response.data.agenda
            }).catch(error => {
                console.error(error)
            })
        },
        async getConsultas() {
            await Axios.get(`https://clinica-maria-luiza.onrender.com/consultasAba/paciente/${this.cpf}`
            ).then(response => {
                this.consulta = response.data.consultas
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
.main-content_consultas{
    margin-left: 10px;
    padding: 10px;
}
.conteiner_agendar {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    flex-wrap: wrap; /* Permite que os itens "quebrem" para a próxima linha */
    gap: 20px; /* Espaçamento entre os itens */
}

.container_agendamentos {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: inline-block;
    /* Ajuste para se adaptar ao layout */
}

.resposta-informacao {
    display: flex;
    flex-direction: column;
}

.resposta-informacao label {
    margin-top: 10px;
    color: #7E7E7E;
}

.resposta-informacao input {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
}

@media (max-width: 768px) {
    .main-content_consultas {
        margin-left: 0;
        padding: 10px;
    }
}
</style>
