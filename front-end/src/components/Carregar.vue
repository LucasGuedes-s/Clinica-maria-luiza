<template>
    <div class="carregar-container">
        <div class="spinner"></div>
        <p class="legenda">Carregando Informações...</p>
    </div>
</template>

<style scoped>
.carregar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
}

.spinner {
    border: 8px solid white;
    border-top: 8px solid #84E7FF;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.legenda {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    margin-top: 12px;
    font-weight: bold;
    text-align: center;
    color: #84E7FF;
    /* Cor que combina com o spinner */
    animation: fadeIn 2s ease-in-out infinite;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>