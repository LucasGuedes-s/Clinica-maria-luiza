<template>
    <Sidebar />
    <div class="main-content">
        <h1>Consultas</h1>

        <div class="filtros">
            <input type="text" placeholder="Buscar por nome...">
            <input type="date" id="data_inicio">
            <input type="date" id="data_fim">
            <button>Filtrar</button>
            <button class="btn_arquivopdf">Arquivo em PDF</button>
            
        </div>
        <div class="tipo_consulta">
            <button>Consultas</button>
            <button>Consultas ABA</button>
        </div>
        <div class="container_consultas" v-for="consulta in consultas" :key="consulta.id">
            <div class="infos_historico">
                <div class="info_item nome_paciente">
                    <label for="nome_paciente">Paciente:</label>
                    <input type="text" id="nome_paciente" :value="consulta.paciente.nome" readonly>
                </div>

                <div class="info_item">
                    <label for="resposta-data">Data:</label>
                    <input type="text" id="resposta-data" :value="consulta.data" readonly>
                </div>
                <div class="info_item">
                    <label for="especialista-nome">Hora de inicio e fim:</label>
                    <input type="text" id="especialista-nome" :value="consulta.hora_inicio" readonly>
                </div>

                <div class="info_item descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4" :value="consulta.descricao" readonly></textarea>
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
    gap:20px;
}

.tipo_consulta button {
    width: 50%;
    padding: 10px 50px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1); /* Sombra mais sutil na parte inferior */
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
    width: 100%; /* Agora ocupa 100% da largura */
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

export default {
    name: 'visualizarconsultas',
    components: {
        Sidebar 
    },
    data() {
        return {
            consultas: [],
            email: '',
            tipoConsulta: ''
        }
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    methods: {
        async getConsultas() {
            try {
                const profissional = localStorage.getItem('profissional')
                const token = this.store.token
                await api.post(`/consultas`, 
                {
                    email: profissional,
                    tipoConsulta: "TRADICIONAL"                
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    this.consultas = response.data.consultasProfissional;
                    console.log(this.consultas)

                }).catch(Error => {
                    console.error(Error)
                })
                
            } catch (error) {
                console.error('Error fetching consulta data:', error);
            }
        }
    },
    mounted() {
        this.getConsultas();
    }
}
</script>