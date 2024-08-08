<template>
    <div class="sidebar">
        <img src="../assets/img.girafas.png" alt="Logo">
        <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
            </svg>
            Dashboard
        </a>
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
            </svg>
            Pacientes
        </a>
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-calendar-check" viewBox="0 0 16 16">
                <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            Agendamentos
        </a>
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin"
                viewBox="0 0 16 16">
                <path
                    d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            </svg>
            Pagamentos
        </a>
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

.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    padding-top: 20px;
    text-align: center;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.sidebar img {
    width: 150px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.sidebar a {
    padding: 20px 15px;
    text-decoration: none;
    font-size: 16px;
    text-align: left;
    color: #7E7E7E;
    display: block;
    margin-left: 30px;
}

.sidebar a:hover {
    color: #84E7FF;
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

export default {
    name: 'dashboard',
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