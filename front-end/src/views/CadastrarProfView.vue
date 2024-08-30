<template>
    <Sidebar />
    <div class="main-content">
        <div class="container_cadastrarprof">
            <h1>Cadastrar Profissional</h1>
            <form>
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome_funcionario" name="nome" v-model="nome" required>
                </div>
                <div class="form-group">
                    <label for="data-nascimento">Data de Nascimento:</label>
                    <input type="date" id="data_nasc_prof" name="data-nascimento" v-model="data_nascimento" required>
                </div>
            
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email_prof" name="email" v-model="email"required>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone_prof" name="telefone" v-model="telefone" required>
                </div>
            
                <div class="form-group">
                    <label for="especialidade">Especialidade:</label>
                    <select id="especialidade" name="especialidade" required>
                        <option value="especialidade1">Especialidade 1</option>
                        <option value="especialidade2">Especialidade 2</option>
                        <option value="especialidade3">Especialidade 3</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="pix">PIX:</label>
                    <input type="text" id="pix" name="pix" v-model="pix" required>
                </div>
            
                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" accept="image/*">
                </div>
                <button type="submit" class="cadastrar-btn">Cadastrar</button>
            </form>            
        </div>
    </div>
</template>

<style scoped>
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

.container_cadastrarprof {
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

.selecionar {
    grid-column: 1 / -1;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store.js'
import Axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';

export default {
    name: 'cadastrar_profissional',
    components:{
        Sidebar
    },
    setup(){
        const store = useAuthStore() //Importação da função do Store.js
        return{
            store
        }
    },
data(){
    return {
        nome: '',
        data_nascimento: '',
        email: '',
        telefone: '',
        pix: '',
        foto: '',
    }
},
methods: {
    async cadastrarprofissional(){
        const token = this.store.token
        console.log("Aqui")
        await Axios.post("https://clinica-maria-luiza.onrender.com/cadastrar/profissional", {
            profissional: {
                nome: this.nome,
                data_nascimento: this.data_nascimento,
                email: this.email,
                telefone: this.telefone,
                pix: this.pix,
                foto: this.foto
            },
            headers: {
                'Authorization': `Bearer ${token}`
                }
        }).then(
            Swal.fire({
                icon: 'success',
                title: 'Cadastrado com sucesso',
                timer: 4000,
            }),
            router.push("/profissionais")
        ).catch( error => {
            Swal.fire({
                icon: 'erro',
                title: 'Não foi possível realizar o cadastro',
                timer: 4000,
            })
        })
    }
}
}
</script>