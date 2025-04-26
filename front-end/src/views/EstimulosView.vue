<template>
    <Sidebar />
    <div class="main-content-paciente">
        <div class="container_cadastrarpac">
            <h1>Cadastrar Estimulo</h1>
            <form @submit.prevent="cadastrarestimulo">
                <div class="form-group">
                    <label for="nome">Nome do estimulo:</label>
                    <input type="text" id="nome" name="nome" v-model="nome_estimulo" required>
                </div>
                <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" v-model="descricao">
                </div>
                <div class="form-group select_paciente">
                    <label for="paciente">Paciente:</label>
                    <select id="paciente" name="paciente" v-model="pacienteId" required>
                        <option value="" disabled selected>Selecione um paciente</option>
                        <option value="Não informado">Não informado</option>
                        <option v-for="paciente in pacientes.pacientes" :key="paciente.cpf" :value="paciente.cpf">
                            {{ paciente.nome }} - {{ paciente.tipo_paciente }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="cadastrar-btn" click="cadastrarestimulo">Cadastrar</button>
            </form>
        </div>
        <div class="container_cadastrarpac">
            <h1>Adicionar Estimulo a paciente</h1>
            <form @submit.prevent="vincularestimulo">
                <div class="form-group">
                    <label for="tipo_paciente">Paciente:</label>
                    <select id="paciente" name="paciente" v-model="pacienteId" required>
                        <option v-for="paciente in pacientes.pacientes" :key="paciente.cpf" :value="paciente.cpf">
                            {{ paciente.nome }} - {{ paciente.tipo_paciente }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tipo_paciente">Estimulo:</label>
                    <select id="paciente" name="paciente" v-model="estimuloId" required>
                        <option v-for="estimulo in estimulos.estimulos" :key="estimulo.id" :value="estimulo.id">
                            {{ estimulo.nome_estimulo }} - {{ estimulo.descricao }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="cadastrar-btn" click="vincularestimulo">Vincular estimulo</button>
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

.main-content-paciente {
    margin-left: 250px;
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
    gap: 30px;
    align-items: start;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px;
}

.form-group input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
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

.select_paciente {
    grid-column: 1 / -1;
}



@media (max-width: 768px) {
    .main-content-paciente {
        margin-left: 0;
    }
    form {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store.js'
import Axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'cadastrar_paciente',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore() //Importação da função do Store.js
        return {
            store
        }
    },
    data() {
        return {
            nome_estimulo: '',
            descricao: '',
            pacienteId: '',
            estimuloId: '',
            pacientes: [],
            estimulos: [],
        }
    },
    methods: {
        async cadastrarestimulo() {
            const token = this.store.token
            if(this.pacienteId == '') {
                this.pacienteId = 'Não informado'
            }
            try {
                // Envia os dados do paciente para o backend
                await Axios.post(`http://localhost:3000/adicionar/estimulo`, {
                        nome_estimulo: this.nome_estimulo,
                        descricao: this.descricao,
                        pacienteId: this.pacienteId
                }, {            
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Estimulo cadastrado com sucesso',
                        timer: 4000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    this.getEstimulos();
                    this.nome_estimulo = '';
                    this.descricao = '';
                    this.pacienteId = '';
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o cadastro do estimulo',
                    text: error.response.data.message,
                    timer: 4000,
                });
            }
        },
        async vincularestimulo() {
            const token = this.store.token

            if(this.pacienteId == '' || this.pacienteId == null || this.estimuloId == '' || this.estimuloId == null) {  
                Swal.fire({
                    icon: 'error',
                    title: 'Selecione um paciente e um estimulo',
                    timer: 4000,
                });
            }
            try {
                await Axios.post(`http://localhost:3000/vincular/estimulo`, {
                        estimuloId: this.estimuloId,
                        pacienteId: this.pacienteId
                }, {            
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Estimulo adicionado ao paciente com sucesso',
                        timer: 4000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    this.nome_estimulo = '';
                    this.descricao = '';
                    this.pacienteId = '';
                    this.estimuloId = '';
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o cadastro do estimulo',
                    text: error.response.data.message,
                    timer: 4000,
                });
            }
        },
        async getPacientes(){
            const token = this.store.token
            try {
                // Envia os dados do paciente para o backend
                await Axios.get(`http://localhost:3000/pacientes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    this.pacientes = response.data
                    console.log(this.pacientes)
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
            }
        },
        async getEstimulos(){
            const token = this.store.token
            try {
                // Envia os dados do paciente para o backend
                await Axios.get(`http://localhost:3000/estimulos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    this.estimulos = response.data
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
            }
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            try {
                if (!vm.store.isAuthenticated) {
                    vm.$router.push('/login')
                }
            }
            catch {
                console.log("Erro")
            }
        })
    },
    mounted() {
        this.getPacientes(),
        this.getEstimulos()
    }
}
</script>