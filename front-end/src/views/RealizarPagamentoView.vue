<template>
    <Sidebar />
    <div class="main-content">
        <div class="container_registrarpagamento">
            <h1>Realizar Pagamento</h1>
            <form>
                <div class="form-group">
                    <label for="tipodepagamento">Tipo de Pagamento:</label>
                    <select id="tipodepagamento" name="tipodepagamento" required>
                        <option value="Pagamento de entrada">Pagamento de Entrada</option>
                        <option value="Pagamento de saida">Pagamento de Saida</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nome">Nome do Paciente:</label>
                    <input type="text" id="nome_paciente" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="valorpagamento">Valor do Pagamento (R$):</label>
                    <input type="number" id="valor_pagamento" name="valorpagamento" required>
                </div>
            
                <div class="form-group">
                    <label for="metodo_de_pagamento">Método de Pagamento:</label>
                    <select id="metododepagamento" name="metodo_de_pagamento" required>
                        <option value="metododepagamento1">Dinheiro</option>
                        <option value="metododepagamento2">PIX</option>
                        <option value="metododepagamento3">Cartão de Crédito | Débito</option>

                    </select>
                </div>
            
                <button type="submit" class="btn_realizarpagamento">Finalizar Pagamento</button>
            </form>            
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
    justify-content: center;
}

.container_registrarpagamento {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_registrarpagamento h1 {
    color: #D9D9D9;
    margin-bottom: 20px;
}

form {
    display: grid;
    gap: 30px; 
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px; 
}

.form-group input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

#data_pagamento, #metododepagamento, #tipodepagamento {
    font-family: 'Montserrat', sans-serif;
}

.btn_realizarpagamento {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px; 
    margin-bottom: 15px;
}

.btn_realizarpagamento:hover {
    background-color: #E7FAFF;
}

</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
export default {
    name: 'registrarconsulta',
    components: {
        Sidebar
    },
}
</script>