<template>
    <Sidebar />
    <div class="main-content">
        <h1>Pacientes</h1>
        <div class="search-cadastrar">
            <input type="text" id="search-input" placeholder="Nome do paciente...">
            <RouterLink to="/cadastrarpaciente"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container-paciente" v-for="usuario in paciente" :key="usuario.cpf">
            <img :src="usuario.foto">
            <div class="info">
                <p>Nome: {{ usuario.nome }}</p>
                <p>Telefone: {{ usuario.telefone }}</p>
            </div>
            <div class="botoes-div">
                <button class="detalhar-btn" @click="teste(usuario.nome)">Evolução</button>
                <button class="histconsultas-btn">Hist. consultas</button>
                <button class="registrar-btn">Registrar consultas</button>
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

h1 {
    color: #84E7FF;
}

.main-content {
    margin-left: 260px;
    padding: 20px;
}

.search-cadastrar {
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
    /* Adiciona bordas arredondadas */
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    /* Sombra mais sutil na parte inferior */
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}


.search-cadastrar button {
    padding: 10px 50px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 10px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    /* Sombra mais sutil na parte inferior */
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.container-paciente {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container-paciente img {
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

.botoes-div {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 20px;
}

.detalhar-btn,
.histconsultas-btn,
.registrar-btn {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    margin-right: 10px;
}

.histconsultas-btn {
    background-color: #E7FAFF;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
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
    methods: {
        async pacientes() {
            const token = this.store.token
            console.log(token)
            Axios.get("http://localhost:3000/pacientes", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.paciente = response.data.pacientes
                console.log(response.data.pacientes)
            }).catch(Error => {
                console.error(Error)
            })
        },
        async teste(nome) {
            Axios({
                url: 'http://localhost:3000/historico/consultas', // Altere a URL conforme necessário
                method: 'GET',
                responseType: 'blob' // Importante para tratar a resposta como um blob
            })
                .then(response => {
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
    data() {
        return {
            paciente: null
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