<template>
    <div class="container">
        <div class="div_esquerda"> </div>
        <div class="div_direita">
            <div class="content">
                <h1>Nenhuma consulta foi registrada!</h1>
                <button class="btn" @click="voltar">Voltar</button>
            </div>
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
}


.container {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E7FAFF;

}


.div_esquerda {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/img.girafas.png);
    background-size: cover;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
}


.div_direita {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
}


.content {
    background-color: white;
    padding: 90px 50px;
    border-radius: 8px;
    text-align: center;
    max-width: 500px;
    width: 100%;
    border: 1px solid #D9D9D9;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
    display: flex;
    flex-direction: column; /* Organiza os elementos em coluna */
    gap: 15px;
}


h1 {
    font-size: 50px;
    color: #84E7FF;
    margin-top: 0;
}


button {
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    color: inherit;
    padding: 12px 24px;
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}


@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }


    .div_esquerda,
    .div_direita {
        width: 100%;
        height: auto;
    }


    .div_esquerda {
        height: 200px;
        background-size: contain;
    }


    .div_direita {
        padding: 30px 20px;
    }


    .content {
        padding: 30px 20px;
        max-width: 60%;
    }


    h1 {
        font-size: 24px;
    }


    button {
        font-size: 14px;
        padding: 10px 20px;
    }
}
</style>


<script>
import router from '@/router';


export default {
    methods: {
        voltar() {
            router.push('/dashboard')
        },
    }
}
</script>
