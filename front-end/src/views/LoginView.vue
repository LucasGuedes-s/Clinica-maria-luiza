<template>
   <div class="container_login">
        <div class="esquerda-login">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita-login">
            <form class="login-form" @submit.prevent="login">
                <h1>Realizar login</h1>
                <label for="email">E-mail</label>
                <input type="text" v-model="email" placeholder="Digite o seu e-mail">
                <label for="senha">Senha</label>
                <input type="password" v-model="senha" placeholder="Digite a sua senha">
                <div class="button-container">
                    <button type="submit" class="btn-entrar" click="login">Entrar como profissional</button>
                    <button type="submit" class="btn-paciente">Entrar como paciente</button>
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
    background-color: white;
}

.container_login {
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

.esquerda-login {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.direita-login {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    width: 80%;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login-form label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.login-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
}

.login-form input::placeholder {
    color: #D9D9D9; 
    font-family: 'Montserrat', sans-serif;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.login-form button {
    width: 48%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

.btn-entrar {
    background-color: #E7FAFF;
    border: 1px solid #86E7FF; /* Define a borda do botão */
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
    name:'LoginView',
    //O gancho setup() serve como ponto de entrada para usar a API de Composição em componentes. 
    setup(){
        const store = useAuthStore() //Importação da função do Store.js
        return{
            store
        }
    },
    data(){
        return{
            email:'',
            senha:'',
            token: []
        }
    },
methods:{
    async login(){
        await Axios.post("http://localhost:3000/user/login", {
            usuario:{
                email:this.email,
                senha:this.senha
            }
        }).then(response =>{
            console.log(response.status)
            console.log(response.data)
            console.log(response.headers.authorization); //Mostra o token que está chegando
            this.store.token = response.headers.authorization.split(' ')[1]; //Adiciona o token ao Store
            this.store.usuario = response.data
            router.push('/dashboard')
        }).catch(Error =>{
            console.error(Error);
            Swal.fire({
                icon: 'erro',
                title: 'Usuário ou senhas incorretos',
                timer: 4000,
            })
        })
    }
}
    }

</script>