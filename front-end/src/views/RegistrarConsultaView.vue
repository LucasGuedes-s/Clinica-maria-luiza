<template>
     <Sidebar />
     <div class="main-content">
        <div class="container_registrarconsulta">
            <h1>Registrar Consulta</h1>
            <form>
                <div class="form-group">
                    <label for="nome">Nome do Paciente:</label>
                    <input type="text" id="nome_paciente" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="data-consulta">Data:</label>
                    <input type="date" id="data_consulta" name="data-consulta" required>
                </div>
                <div class="form-group selecionar">
                    <label for="imagem">Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" accept="image/*">
                </div>
                <div class="form-group descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4"></textarea>
                </div>
                <button type="submit" class="registrarconsulta_btn">Cadastrar</button>
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

.container_registrarconsulta {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #84E7FF;
}

form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px;
}

.form-group input,.form-group textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%; 
}

.selecionar, .descricao {
    grid-column: 1 / -1; 
}

.form-group textarea {
    resize: vertical;
}

.registrarconsulta_btn {
    grid-column: 1 / -1; 
    padding: 10px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: #7E7E7E;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    font-family: 'Montserrat', sans-serif;
}

@media (max-width: 768px) {
    .sidebar{
        display: none
    }
    form {
        grid-template-columns: 1fr; /* Apenas uma coluna em telas menores */
    }
    .registrarconsulta_btn {
        width: 100%;
    }
    .main-content {
        margin-left: 0; /* Remover margem para telas menores */
        padding: 10px;
    }
    .container_registrarconsulta {
        padding: 15px; /* Reduz o padding para telas menores */
    }
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