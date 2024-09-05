<template>
    <Sidebar />
    <div class="main_content">
        <div class="container_registroaba">
            <div class="header_container">
                <h1>Registro aba</h1>
                <div class="paciente_nome">
                    <p>Nome do Paciente:</p>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="nome">Nome do Aplicador:</label>
                    <input type="text" id="nome_paciente" name="nome" required>
                </div>
                <div class="form-group descricao">
                    <label for="descricao_atividade">Descrição de atividade:</label>
                    <textarea id="descricao_atividade" rows="4"></textarea>
                </div>
                <div class="form-group pequenos-inputs">
                    <label>Aplicações:</label>
                    <div class="inputs-row">
                        <input type="text" placeholder="Aplicação 01:" list="aplicacoes-options">
                        <input type="text" placeholder="Aplicação 02:" list="aplicacoes-options">
                        <input type="text" placeholder="Aplicação 03:" list="aplicacoes-options">
                        <input type="text" placeholder="Aplicação 04:" list="aplicacoes-options">
                        <input type="text" placeholder="Aplicação 05:" list="aplicacoes-options">
                        <input type="text" placeholder="TESTE:" list="aplicacoes-options">
                    </div>
                    <datalist id="aplicacoes-options">
                        <option value="AT +"></option>
                        <option value="AT + /"></option>
                        <option value="AT -"></option>
                        <option value="AP +"></option>
                        <option value="AP + /"></option>
                        <option value="AP -"></option>
                        <option value="SA +"></option>
                        <option value="SA + /"></option>
                        <option value="SA -"></option>
                    </datalist>
                </div>

                <div class="legendas">
                    <div class="legendas_siglas">
                        <p>AT - Ajuda total</p>
                        <p>AP - Ajuda parcial</p>
                        <p>SA - Sem ajuda</p>
                    </div>
                    <div class="legendas_sinais">
                        <p>+ Acerto sem dica</p>
                        <p>+/ Acerto de acordo com o passo</p>
                        <p>- Erro</p>
                    </div>
                </div>

                <div class="form-group observacao">
                    <label for="observacao_aba">Observação:</label>
                    <textarea id="observacao_aba" rows="4"></textarea>
                </div>

                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" accept="image/*">
                </div>

                <button type="submit" class="btn_registrarconsultaaba">Registrar Consulta</button>
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

.main_content {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.paciente_nome {
    font-size: 18px;
    color: #7E7E7E;
    font-weight: bold;
}

.container_registroaba {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_registroaba h1 {
    color: #84E7FF;
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

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;

}

.btn_registrarconsultaaba {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 15px;
}

.btn_registrarconsultaaba:hover {
    background-color: #F5F5F5;
}

.inputs-row {
    display: flex;
    gap: 15px;
    /* Espaço entre os inputs */
}

.inputs-row input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
}

.legendas {
    display: flex;
    gap: 20px;
    /* Espaço entre as duas divs */
}

.legendas p {
    margin: 0;
    font-size: 14px;
    color: #7E7E7E;
    line-height: 30px;
}

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }

    .main_content {
        margin-left: 0;
        padding: 10px;
    }

    .header_container {
        flex-direction: column;
        align-items: flex-start;
    }

    .container_registroaba {
        padding: 15px;
    }

    .inputs-row {
        flex-direction: column;
    }

    .inputs-row input {
        min-width: 100%;
        margin-bottom: 10px;
    }

    .legendas {
        flex-direction: column;
    }
}
</style>

<script>
import { useAuthStore } from '@/store';
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'registroaba',
    components: {
        Sidebar
    }
}
</script>