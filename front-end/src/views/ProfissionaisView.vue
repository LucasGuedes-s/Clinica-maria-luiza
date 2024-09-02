<template>
    <Sidebar />
    <div class="main-content">
        <h1>Profissionais</h1>
        <div class="search-cadastrar">
            <input type="text" id="search-input" placeholder="Nome do profissional..." v-model="pesquisa">
            <RouterLink to="/cadastrarprofissional"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container-profissional" v-for="usuario in filteredProfissional" :key="usuario.email">
            <img :src="usuario.foto">
            <div class="info">
                <p>Nome: {{ usuario.nome }}</p>
                <p>Especialide: {{ usuario.especialidade }}</p>
                <p>E-mail: {{ usuario.email }}</p>
                <p>Telefone: {{ usuario.telefone }}</p>
                <p>Pix: {{ usuario.pix }}</p>
            </div>
            <div class="detalhar-div">
                <button class="detalhar-btn">Consultas</button>
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

.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    padding-top: 20px;
    text-align: center;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.sidebar img {
    width: 150px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.sidebar a {
    padding: 20px 15px;
    text-decoration: none;
    font-size: 16px;
    text-align: left;
    color: #7E7E7E;
    display: block;
    margin-left: 30px;
}

.sidebar a:hover {
    color: #84E7FF;
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

.container-profissional {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container-profissional img {
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

.detalhar-div {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.detalhar-btn {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.detalhar-btn:hover {
    background-color: #E7FAFF;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
export default {
    name: 'profissionais',
    components:{
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data(){
        return{
            pesquisa: '',
            profissional: []
        }
    },
    methods: {
        async profissionais() {
            const token = this.store.token
            console.log(token)
            Axios.get("https://clinica-maria-luiza.onrender.com/profissionais", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.profissional = response.data.profissionais
            }).catch(Error => {
                console.error(Error)
            })
        }
    },
    computed: {
        filteredProfissional() {
            return this.profissional.filter(profissional => 
            profissional.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
        );
        }
    },
    mounted (){
        this.profissionais()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            try{
                const authStore = useAuthStore();
                const userPermissions = authStore.getUser.usuario.permissao; // Obtém as permissões do usuário
                
                const requiredPermission = 1;
                
                if (!vm.store.isAuthenticated) {
                    vm.$router.push('/login')
                }
                else if (userPermissions != requiredPermission) {
                    vm.$router.push('/unauthorized'); // Redireciona para uma página de acesso negado
                }
            }
            catch{
                console.log("Erro")
            }

        })
    }
}

</script>