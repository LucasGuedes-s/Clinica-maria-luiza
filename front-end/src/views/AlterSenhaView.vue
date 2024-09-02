<template>
    <div class="container_senha">
        <div class="esquerda-senha">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita-senha">
            <form class="senha-form" @submit.prevent="senha">
                <h1>Alterar Senha</h1>
                <label for="senha">Antiga senha</label>
                <input type="password" v-model="senhaAntiga" placeholder="Digite a sua antiga senha">
                <label for="senha">Nova senha</label>
                <input type="password" v-model="senha" placeholder="Digite a sua nova senha">
                <label for="senha">Repita a senha</label>
                <input type="password" v-model="senha_2" placeholder="Digite a sua nova senha novamente">

                <div class="button-container">
                    <router-link to="/senhapaciente"><button type="submit" class="btn-paciente">Alterar
                            Senha</button></router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: white !important;
}

.container_senha {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    color: #D9D9D9;
}

.esquerda-senha {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.direita-senha {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.senha-form {
    width: 80%;
}

.senha-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.senha-form label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.senha-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
}

.senha-form input::placeholder {
    color: #D9D9D9;
    font-family: 'Montserrat', sans-serif;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.senha-form button {
    width: 48%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

.btn-entrar {
    background-color: #E7FAFF;
    border: 1px solid #86E7FF;
    /* Define a borda do botão */
}

.btn-entrar:hover {
    background-color: #86E7FF;
}

.btn-paciente {
    background-color: #FBE9EB;
    border: 1px solid #FAC6CA;
}

.btn-paciente:hover {
    background-color: #FAC6CA;
}
</style>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store.js'
import router from '@/router';

export default {
    name: 'senhaView',
    //O gancho setup() serve como ponto de entrada para usar a API de Composição em componentes. 
    setup() {
        const store = useAuthStore() //Importação da função do Store.js
        return {
            store
        }
    },
    data() {
        return {
            senhaAntiga: '',
            senha: '',
            senha_2: ''
        }
    },
    methods: {
        async senha() {
            if (this.senha != this.senha_2) {
                Swal.fire({
                    icon: 'error',
                    title: 'As senhas não condizem',
                    timer: 4000,
                })
            }
            else {
                await Axios.post("https://clinica-maria-luiza.onrender.com/user/senha", {
                    usuario: {
                        email: this.email,
                        senha: this.senhaAntiga,
                        nova_senha: this.nova_senha,
                        senha_2: null,
                    }
                }).then(response => {
                    const token = response.headers.authorization.split(' ')[1];
                    const user = response.data;
                    this.store.senha(user, token);
                    router.push('/dashboard')
                }).catch(Error => {
                    console.error(Error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuário ou senhas incorretos',
                        timer: 4000,
                    })
                })
            }
        }
    }
}

</script>