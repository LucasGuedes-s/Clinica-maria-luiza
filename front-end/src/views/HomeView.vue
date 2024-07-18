<template>
  <nav class="nav-bar">
    <div class="logo"><img src="../assets/nome.png" alt="Logo"></div>
    <ul class="nav-links">
      <li><a href="#quem-somos">Quem somos</a></li>
      <li><a href="#profissionais">Serviços</a></li>
      <li><a href="#servicos">Contato</a></li>
      <RouterLink to="/login"><button class="button1">Login</button></RouterLink>
    </ul>
  </nav>
  <div class="container">
    <div class="element1">
      <img src="../assets/girafas.png" alt="Descrição da imagem">
      <p>Seja bem-vindo(a)!</p>
    </div>
    <div class="element2">
      <div class="element2">
        <div class="slider-container">
          <div class="slider">
            <img src="../assets/Frame1.png" alt="Image 1">
            <img src="../assets/Frame2.png" alt="Image 2">
            <img src="../assets/Frame3.png" alt="Image 3">
            <img src="../assets/Frame4.png" alt="Image 4">
            <img src="../assets/Frame5.png" alt="Image 5">
            <img src="../assets/Frame6.png" alt="Image 6">
          </div>
          <button class="slider-btn prev-btn">&lt;</button>
          <button class="slider-btn next-btn">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';


export default {

}
</script>
<style>

.nav-bar {
    background-color: white;
    color: #ffffff;
    width: 100%;
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.logo img {
    width: 250px;
    margin-left: 25px;
}

.nav-links {
    list-style: none;
    display: flex;
    margin-right: 60px;
    align-items: center; /* Centraliza verticalmente os itens */
}

.nav-links li {
    margin: 15px;
    padding: 5px 25px;
    display: flex; /* Para centralizar horizontalmente */
    align-items: center; /* Para centralizar horizontalmente */
    border-radius: 20px;
    border: 1px solid #84E7FF;
}

.nav-links a {
    text-decoration: none;
    color: #7E7E7E;
    font-size: 18px;
    display: flex;
    align-items: center;
}

.nav-links a:hover {
    color: #84E7FF;
}


.button1{
    padding: 5px 40px;
    font-size: 17px;
    margin-left: 20px;
    background-color: #F5F5F5; /* Cor de fundo */
    border: none; /* Remover bordas */
    border-radius: 20px; /* Bordas arredondadas */
    font-family: 'Montserrat', sans-serif;
    border: 2px solid #D9D9D9;
}


.container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 55px;
}

.element1 {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.element1 img {
    max-width: 370px;
    height: auto;
    margin-top: 5px;
}

.element1 p {
    margin-top: 20px;
    padding: 10px 85px;
    font-size: 16px;
    background-color: #FBE9EB; /* Cor de fundo */
    border: none; /* Remover bordas */
    border-radius: 5px; /* Bordas arredondadas */
    font-family: 'Montserrat', sans-serif;
    border: 2px solid #FAC6CA;
}


.element2 {
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
}

.imggirafa{
    width: 50px;
    height: 50px;
}

.slider-container {
    position: relative;
}

.slider {
    display: flex;
    width: 4800px; /* Total width of all images */
    transition: transform 0.5s ease;
}

.slider img {
    width: 800px;
    height: 500px;
    object-fit: cover;
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #FBE9EB;
    border: none;
    color: #333;
    font-size: 24px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%; /* torna o botão circular */
    display: flex;
    justify-content: center;
    align-items: center;
}

.prev-btn {
    left: 10px;
}

.next-btn {
    right: 10px;
}

section{
    background-color: red;
}
</style>