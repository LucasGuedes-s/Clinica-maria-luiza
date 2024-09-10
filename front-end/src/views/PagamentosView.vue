<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content">
        <h1>Pagamentos</h1>
        <div class="container_pagamentos">
            <h2>Agosto</h2>
            <table class="tabela">
                <thead>
                    <tr>
                        <th>Nome do Paciente:</th>
                        <th>Valor:</th>
                        <th>Data:</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>João Silva</td>
                        <td>50,00</td>
                        <td>12.09.2024</td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" class="btn-pdf">Gerar PDF</button>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

h2 {
    color: #D9D9D9;
    margin-top: 0;
}

.container_pagamentos {
    background-color: white;
    padding: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    flex-direction: column; /* Empilha os elementos verticalmente */
    position: relative;
}

.tabela, th, td{
    border-collapse: collapse; /*define a separação entre as bordar*/
    padding: 10px;
    text-align: left;
    border: 1px solid #D9D9D9;
    color: #7E7E7E
}

.btn-pdf {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
}
@media (max-width: 768px) {
    .main-content {
        margin-left: 0; /* Remove o espaço da sidebar em telas pequenas */
    }

    .tabela, th, td {
        font-size: 14px; /* Reduz o tamanho da fonte em telas menores */
    }

    .btn-pdf {
        font-size: 14px; /* Ajusta o botão para telas menores */
    }
}

</style>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
    name: 'pagamentos',
    components: {
        Sidebar
    }
}
</script>