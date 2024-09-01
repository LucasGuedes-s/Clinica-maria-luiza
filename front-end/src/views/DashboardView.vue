<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content">
        <div class="titulo_dashboard">
            <h1>Bem-vindo(a)!</h1>
        </div>
        <div class="container_dashboard">
            <img :src="imageUrl" alt="Foto do Usuário" @error="onImageError" />
            <div class="info">
                <p>Nome: {{ nome }}</p>
                <p>E-mail: {{ email }}</p>
                <p>Telefone: {{ telefone }}</p>
            </div>
            <div class="senha_div">
                <button class="alterar_senha_btn" click="teste">Alterar Senha</button>
            </div>
        </div>
        <h2>Agendamentos Solicitados:</h2>
        <div class="container_agendamentos" v-for="agenda in agendamentos" :key="agenda.id">
            <div class="resposta-info">
                <label for="paciente-nome">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" :value="agenda.paciente.nome" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" :value="agenda.dataFormatada" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" :value="agenda.horaFormatada" readonly>
                <button class="btn-concluido" @click="updateAgendamento(agenda.id)">Marcar como Concluído</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
    display: block;
}

.main-content {
    margin-left: 260px;
    padding: 20px;
}

.titulo_dashboard {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.titulo_dashboard h1 {
    color: #D9D9D9;
}

.container_dashboard {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container_dashboard img {
    width: 165px;
    height: 170px;
    margin-right: 20px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.info {
    flex-grow: 1;
}

.senha_div {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.alterar_senha_btn {
    padding: 10px 20px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.alterar_senha_btn:hover {
    background-color: #F5F5F5;
}

.info {
    color: #7E7E7E;
}

h2 {
    color: #84E7FF;
}

.container_agendamentos {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
    /* Ajuste para se adaptar ao layout */
}

.resposta-info {
    display: flex;
    flex-direction: column;
}

.resposta-info label {
    margin-top: 10px;
    color: #7E7E7E;
}

.resposta-info input {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
}

.btn-concluido {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;

}

.btn-concluido:hover {
    background-color: #E7FAFF;
}
</style>
<script>
import { useAuthStore } from '@/store';
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'dashboard',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data() {
        return {
            agendamentos: [],
            user: null,
            nome: null,
            email: null,
            telefone: null,
            imageUrl: null
        }
    },
    methods: {
        async dados() {
            try {
                this.user = this.store.usuario.usuario
                this.nome = this.user.nome
                this.email = this.user.email
                this.telefone = this.user.telefone
                this.imageUrl = this.user.foto
            }
            catch {
                console.log('Erro ao obter usuários')
            }
        },
        
        async getAgendamentos(){
            const token = this.store.token
            Axios.get(`https://clinica-maria-luiza.onrender.com/profissionais/agendamentos/${this.email}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response =>{
                this.agendamentos = response.data.agenda
            }).catch(error =>{
                console.log(error)
            })
        },
        async updateAgendamento(id){
            const token = this.store.token
            Axios.get(`https://clinica-maria-luiza.onrender.com/profissional/agendamento/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response =>{
                Swal.fire({
                    icon: 'success',
                    title: 'Tarefa concluída com sucesso!',
                    text: 'O status da tarefa foi atualizado com sucesso',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
                this.getAgendamentos()
            }).catch(error =>{
                console.log(error)
            })
        }
        },
    mounted() {
        this.dados();
        this.getAgendamentos()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.store.isAuthenticated) {
                vm.$router.push('/login')
            }
        })
    }
}
</script>