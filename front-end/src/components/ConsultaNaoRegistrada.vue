<template>
    <div class="sem_consulta">
        <div class="content">
            <h1>Nenhuma consulta foi registrada!</h1>
            <button class="btn" @click="voltar">Voltar</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        voltar() {
            this.$router.push('/pacientes'); // Redireciona para a página inicial
        }
    }
};
</script>

<style scoped>
.sem_consulta {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/img.girafas.png");
    background-position: center;
    background-attachment: fixed;
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
    .content {
        padding: 30px 20px;
        max-width: 90%;
    }

    h1 {
        font-size: 30px;
    }

    p {
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        font-size: 14px;
    }
}
</style>