<template>
     <div class="container">
        <img src="girafas.png" alt="Imagem de girafas">
        <h1>Acesso não autorizado!</h1>
        <h2>Você não tem permissão para acessar a página solicitada.</h2>
        <div class="button-container">
            <button class="btn">Voltar</button>
            <button class="btn">Login</button>
        </div>
    </div>
</template>

<style>
    body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    align-items: center;
    background-color: #E7FAFF;
}

.container {
    width: 90vw; /* 80% da largura da viewport */
    height: 90vh; /* 80% da altura da viewport */
    background-color: #ffffff; /* Cor de fundo da div */
    border: 1px solid #84E7FF;
    border-radius: 5px;
    display: flex;
    flex-direction: column; /* Alinha os itens verticalmente */
    justify-content: center;
    align-items: center;
    text-align: center; /* Alinha o texto ao centro */
    box-sizing: border-box; /* Inclui padding e border no tamanho total */
    padding: 20px; /* Adiciona espaçamento interno */
    overflow: hidden; /* Garante que os elementos não saiam do container */
}

img {
    max-width: 320px;
    height: auto;
    margin-bottom: 20px; /* Espaço abaixo da imagem */
}

h1 {
    color: #D9D9D9;
    width: 40%;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    margin: 10px 0; /* Margem acima e abaixo do h1 */
}

h2 {
    color: #D9D9D9;
    margin: 10px 0; /* Margem acima e abaixo do h2 */
}

.button-container {
    display: flex;
    gap: 20px; /* Espaço entre os botões */
    width: 40%;
    margin-top: 10px; /* Margem superior para os botões */
}

.btn {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #F5F5F5;
}

</style>