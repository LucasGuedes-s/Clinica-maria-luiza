<template>
   <div class="container">
        <div class="esquerda-login">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita-login">
            <form class="login-form">
                <h1>Realizar login</h1>
                <label for="email">E-mail</label>
                <input type="text" name="email" placeholder="Digite o seu e-mail">
                <label for="senha">Senha</label>
                <input type="password" name="senha" placeholder="Digite a sua senha">
                <div class="button-container">
                    <button type="submit" class="btn-entrar">Entrar</button>
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

.container {
    width: 100vw;
    height: 100vh;
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
import { Axios } from 'axios';
export default {name:'LoginView'}
</script>