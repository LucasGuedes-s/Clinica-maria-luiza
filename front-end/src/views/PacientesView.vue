<template>
    <Sidebar />
    <div class="main_content_paciente">
        <h1>Pacientes</h1>
        <div class="search_cadastrar">
            <input type="text" id="search-input" placeholder="Nome do paciente..." v-model="pesquisa" >
            <RouterLink to="/cadastrarpaciente"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container_paciente" v-for="usuario in filteredPacientes" :key="usuario.cpf">
            <div class="info">
                <img :src="usuario.foto" @click="editarDados(usuario.cpf, usuario.email)">
                <div class="textos"> 
                    <p>Nome: {{ usuario.nome }}</p>
                    <p>Telefone: {{ usuario.telefone }}</p>
                    <p v-if="usuario.paciente_dados && usuario.paciente_dados.length > 0">Alergico a: {{ usuario.paciente_dados[0].alergicos }}</p>
            </div>

            </div>
            <div class="botoes_div">
                <RouterLink to="/cadastrarinformacoes"><button  class="evolucao_btn" v-if="usuario.paciente_dados.length === 0">Registrar dados</button></RouterLink>

                <button class="evolucao_btn" v-if="usuario.paciente_dados.length > 0" @click="evolucao(usuario.cpf)">Evolução</button>
                <button class="registroaba_btn" v-if="usuario.paciente_dados.length > 0" @click="aba(usuario.cpf, usuario.nome,)">Registro Aba</button>
                <RouterLink to="/registrarconsulta"><button class="registrar_btn" @click="consulta(usuario.cpf, usuario.nome)">Registrar consultas</button></RouterLink>
                <button class="histconsultas_btn" @click="historico(usuario.cpf)">Hist. consultas</button>
            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
}

.main_content_paciente {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.search_cadastrar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
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
    padding: 10px 50px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 8px;
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
    flex-direction: row; /* Organiza itens em linha */
    align-items: flex-start; /* Alinha itens ao topo */
    position: relative;
    gap: 20px; /* Espaçamento entre a imagem e a info */
}

.container_paciente img {
    width: 165px;
    height: 170px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.info {
    flex-grow: 1;
    display: inline-flex;
    color: #7E7E7E;
}
.textos{
        margin: 10px;
    }
.botoes_div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto; /* Move os botões para a parte inferior */
    justify-content: flex-end; /* Alinha os botões à direita */
}

.evolucao_btn,
.registroaba_btn,
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
    min-width: 120px;
}

.histconsultas_btn {
    background-color: #E7FAFF;
}

@media (max-width: 768px) {
    .evolucao_btn,
    .registroaba_btn,
    .histconsultas_btn,
    .registrar_btn {
        padding: 8px 8px;
        min-width: auto;
    }
    .main_content_paciente {
        margin-left: 0;
        padding: 10px;
    }
    .search_cadastrar {
        flex-direction: row; /* Alinha lado a lado */
        align-items: center;
    }
    .textos{
        margin: 10px;
    }

    input {
        padding: 8px;
        font-size: 14px;
    }

    .search_cadastrar button {
        padding: 8px 16px;
        font-size: 14px;
        width: 100px; /* Largura fixa do botão */
    }
    .container_paciente {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .container_paciente img {
        width: 150px;
        height: 150px;
        margin-bottom: 10px; 
        display: block; 
    }

    .info {
        font-size: 12px;
        display: flex;
        text-align: left;
    }

    .botoes_div {
        gap: 5px;
        flex-wrap: inherit;
        justify-content: inherit;
    }
    .botoes_div button {
        padding: 5px; /* Ajuste o padding conforme a necessidade */
        font-size: 13px; /* Diminua o tamanho da fonte */
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { RouterLink } from 'vue-router';

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
        async editarDados(cpf, email){
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('email', email);

            this.$router.push({ name: 'editarDados' });    
        },
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
        async aba(cpf, nome){
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('nome', nome);

            this.$router.push({ name: 'registroaba' });
        },
        async evolucao(cpf){
            sessionStorage.setItem('cpf', cpf);
            
            this.$router.push({ name: 'evolucao' });
        },
        async consulta(cpf, nome){
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('nome', nome);

            this.$router.push({ name: 'registrarconsulta' });
        },
        async teste(nome, cpf) {
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 6000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            Axios({
                url: `https://clinica-maria-luiza.onrender.com/historico/consultas/${cpf}`,  // Altere a URL conforme necessário
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