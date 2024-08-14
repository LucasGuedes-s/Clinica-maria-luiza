<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content">
        <div class="container1">
            <h1>Bem-vindo(a)!</h1>
        </div>
        <div class="container2">
            <img :src="imageUrl" alt="Foto do Usuário" @error="onImageError" />
            <div class="info">
                <p>Nome: {{ nome }}</p>
                <p>E-mail: {{ email }}</p>
                <p>Telefone: {{ telefone }}</p>
            </div>
            <div class="senha-div">
                <button class="alterar-senha-btn">Alterar Senha</button>
            </div>
        </div>
        <h2>Agendamentos Solicitados:</h2>
        <div class="container3">
            <div class="resposta-info">
                <label for="paciente-nome">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" value="Nome do Paciente" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" value="2024-07-28" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" value="10:00" readonly>
                <button class="btn-concluido">Marcar como Concluído</button>
            </div>
        </div>
        <div class="container3">
            <div class="resposta-info">
                <label for="paciente-nome">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" value="Nome do Paciente" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" value="2024-07-28" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" value="10:00" readonly>
                <button class="btn-concluido">Marcar como Concluído</button>
            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
}

.main-content {
    margin-left: 260px;
    padding: 20px;
}

.container1 {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.container1 h1 {
    color: #D9D9D9;
}

.container2 {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container2 img {
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

.senha-div {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.alterar-senha-btn {
    padding: 10px 20px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.alterar-senha-btn:hover {
    background-color: #F5F5F5;
}

.info {
    color: #7E7E7E;
}

h2 {
    color: #84E7FF;
}

.container3 {
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
        }
    },

    mounted() {
        this.dados();
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