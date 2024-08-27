<template>
     <div class="container_loginpaciente">
        <div class="esquerda_login">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita_login">
            <form class="login_paciente">
                <h1>Histórico de consulta</h1>
                <label for="email">E-mail ou CPF:</label>
                <input type="text" name="email" placeholder="Digite o seu e-mail ou CPF">
                <div class="button-container">
                <button type="submit" class="btn-consultar">Consultar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.container_loginpaciente {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    color: #D9D9D9;
}

.esquerda_login {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.direita_login {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login_paciente {
    width: 80%;
}

.login_paciente h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login_paciente label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.login_paciente input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.login_paciente button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

.btn-consultar {
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9; 
}

.btn-consultar:hover {
    background-color: #E7FAFF;
}
</style>