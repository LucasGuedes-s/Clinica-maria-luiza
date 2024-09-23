<template>
    <div class="titulo_evolucao">
        <h1>Agenda do paciente</h1>
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
        return {
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        GraficoEvolucao
    },
    methods: {
        async getConsultas() {
            await Axios.get(`https://clinica-maria-luiza.onrender.com/consultasAba/paciente/${this.cpf}`
            ).then(response => {
                this.consulta = response.data.consultas
                console.log(this.consulta)
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
@media (max-width: 768px) {
    .main-content_consultas {
        margin-left: 0;
        padding: 10px;
    }
}
</style>
