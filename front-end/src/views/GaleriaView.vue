<template>
    <div class="main-content">
        <Sidebar />
        <h1>Galeria</h1>

        <div class="galeria-grid">
            <div v-for="(imagem, index) in laudos" :key="index" class="imagem-card" @click="abrirModal(imagem)">
                <img :src="imagem" alt="Anexo" />
            </div>
        </div>

        <div v-if="imagemSelecionada" class="modal" @click.self="fecharModal">
            <span class="fechar" @click="fecharModal">&times;</span>
            <img class="modal-conteudo" :src="imagemSelecionada" />
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

h1 {
    color: #84E7FF;
}

.galeria-container {
    max-width: 1000px;
    margin: auto;
}

.galeria-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
}

.imagem-card {
    background: white;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.imagem-card:hover {
    transform: scale(1.03);
}

.imagem-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
}

.modal-conteudo {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.fechar {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10000;
}

</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.js';

export default {
    name: 'galeria',
    components: {
        Sidebar
    },
    data() {
        return {
            laudos: [],
            imagemSelecionada: null // nova propriedade
        };
    },
    async mounted() {
        await this.carregarLaudosDoFirebase();
    },
    methods: {
        async carregarLaudosDoFirebase() {
            try {
                const pastaLaudosRef = ref(storage, 'laudos/');
                const resultado = await listAll(pastaLaudosRef);

                const extensoesPermitidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

                const urls = await Promise.all(
                    resultado.items.map(async (itemRef) => {
                        const caminho = itemRef.name.toLowerCase();

                        // Verifica se o nome do arquivo tem uma extensão permitida
                        const extensaoValida = extensoesPermitidas.some(ext => caminho.endsWith(ext));
                        if (!extensaoValida) return null;

                        try {
                            const url = await getDownloadURL(itemRef);
                            return url || null;
                        } catch (err) {
                            console.warn("Erro ao obter URL da imagem:", itemRef.fullPath, err);
                            return null;
                        }
                    })
                );

                this.laudos = urls.filter(url => url);
            } catch (error) {
                console.error("Erro ao carregar imagens do Firebase:", error);
            }
        },
        abrirModal(imagemUrl) {
            this.imagemSelecionada = imagemUrl;
        },
        fecharModal() {
            this.imagemSelecionada = null;
        }
    }
};
</script>