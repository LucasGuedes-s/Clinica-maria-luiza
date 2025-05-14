<template>
    <Sidebar />
    <div class="main_content_laudos">
      <h1>Laudos e Anexos</h1>
      <div class="galeria">
        <div class="item_laudo" v-for="laudo in laudos" :key="laudo" @click="abrirLaudo(laudo)">
          <iframe
            :src="laudo"
            class="thumb_iframe"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
    <Chat />
  </template>
  

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main_content_laudos {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.item_laudo {
  border: 1px solid #84E7FF;
  border-radius: 8px;
  background-color: white;
  padding: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.item_laudo:hover {
  transform: scale(1.02);
}
.thumb_iframe {
  width: 100%;
  height: 180px;
  border-radius: 6px;
  pointer-events: none;
  overflow: hidden;
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE 10+ */
}

.thumb_iframe::-webkit-scrollbar {
  display: none;               /* Chrome, Safari */
}


</style>
<script>
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import { useAuthStore } from '@/store.js'
import { formatDate } from '../utils/formatarData';
import Swal from 'sweetalert2';
import Chat from '@/components/Chat.vue';

export default {
    name: 'historicodeconsulta',

    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    components: {
        Sidebar,
        Chat
    },
    data() {
        return {
            formatDate,
            laudos: null,
            cpf: sessionStorage.getItem('cpf') || ''
        };
    },
    mounted() {
        //Limpar o CPF do sessionStorage após uso
        //sessionStorage.removeItem('cpf');
        this.getLaudos()
    },
    methods: {        
        async getLaudos() {
            const token = this.store.token
            const cpf = this.cpf

            Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/paciente/dados/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.laudos = response.data.paciente[0].laudos
                console.log(response.data.paciente[0].laudos)
            }).catch(error => {
                console.error(error)
            })
        },
        abrirLaudo(laudo) {
  window.open(laudo, '_blank');
}

    }
}
</script>