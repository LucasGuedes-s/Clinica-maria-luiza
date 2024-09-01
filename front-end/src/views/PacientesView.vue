<template>
    <Sidebar />
    <div class="main_content">
        <h1>Pacientes</h1>
        <div class="search_cadastrar">
            <input type="text" id="search-input" placeholder="Nome do paciente..." v-model="pesquisa" >
            <RouterLink to="/cadastrarpaciente"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container_paciente" v-for="usuario in filteredPacientes" :key="usuario.cpf">
            <img :src="usuario.foto">
            <div class="info">
                <p>Nome: {{ usuario.nome }}</p>
                <p>Telefone: {{ usuario.telefone }}</p>
                <p v-if="usuario.paciente_dados && usuario.paciente_dados.length > 0">Alergico a: {{ usuario.paciente_dados[0].alergicos }}</p>
            </div>
            <div class="botoes_div">
                <button class="detalhar_btn" @click="teste(usuario.nome, usuario.cpf)">Evolução</button>
                <button class="histconsultas_btn" @click="historico(usuario.cpf)">Hist. consultas</button>
                <RouterLink to="/registrarconsulta"><button class="registrar_btn">Registrar consultas</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
}

.main_content {
    margin-left: 250px; /* Alinha o conteúdo principal ao lado do sidebar */
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.search_cadastrar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

input {
    width: 90%;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.search_cadastrar button {
    padding: 10px 20px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 10px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.container_paciente {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container_paciente img {
    width: 165px;
    height: 170px;
    margin-right: 20px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.info {
    flex-grow: 1;
    color: #7E7E7E;
    margin-left: 10px;
}

.botoes_div {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 20px;
}

.detalhar_btn,
.histconsultas_btn,
.registrar_btn {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.histconsultas_btn {
    background-color: #E7FAFF;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'pacientes',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data() {
        return {
            pesquisa: '',
            paciente: []
        }
    },
    methods: {
        async pacientes() {
            const token = this.store.token
            Axios.get("https://clinica-maria-luiza.onrender.com/pacientes", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.paciente = response.data.pacientes
            }).catch(Error => {
                console.error(Error)
            })
        },
        async historico(cpf){
            sessionStorage.setItem('cpf', cpf);
            this.$router.push({ name: 'historicodeconsulta' });
        },
        async teste(nome, cpf) {
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 4000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            Axios({
                url: `http://localhost:3000/historico/consultas/${cpf}`,  // Altere a URL conforme necessário
                method: 'GET',
                responseType: 'blob',  // Importante para tratar a resposta como um blob
            }).then(response => {
                    // Crie um URL para o blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `consultas de ${nome} .pdf`); // Nome do arquivo
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch(error => console.error('Erro ao baixar o PDF:', error));
        }
    },
    mounted() {
        this.pacientes()
    },
    computed: {
        filteredPacientes() {
            return this.paciente.filter(paciente => 
            paciente.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
        );
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
    }
}
</script>