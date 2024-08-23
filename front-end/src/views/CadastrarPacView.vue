<template>
    <Sidebar />
    <div class="main-content">
        <div class="container_cadastrarpac">
            <h1>Cadastrar Paciente</h1>
            <form>
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" required>
                </div>
            
                <div class="form-group">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required>
                </div>
                <div class="form-group">
                    <label for="responsavel">Nome do Responsável:</label>
                    <input type="text" id="responsavel" name="responsavel" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" required>
                </div>
                <div class="form-group">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" required>
                </div>
                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem" name="imagem" accept="image/*">
                </div>
            
                <button type="submit" class="cadastrar-btn">Cadastrar</button>
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
    margin-left: 260px;
    padding: 20px;
    justify-content: center;
}

.container_cadastrarpac {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #D9D9D9;
    margin-bottom: 20px;
}

.form-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #84E7FF;
    width: 600px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px; 
    align-items: start;
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

.cadastrar-btn {
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

.cadastrar-btn:hover {
    background-color: #E7FAFF;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'cadastrar_profissional',
    components:{
        Sidebar
    }
}
</script>