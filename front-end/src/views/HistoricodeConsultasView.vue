<template>
    <Sidebar />
    <div class="main-content">
        <h1>Histórico de Consultas</h1>
        <div class="container_historico" v-for="consulta in consultas" :key="consulta.id">
            <h1 v-if="consultas.length == 0">Nenhuma consulta registrada</h1>

            <div class="infos_historico">
                <div class="info_item">
                    <label for="resposta-data">Data:</label>
                    <input type="text" id="resposta-data" :value="formatDate(consulta.data)" readonly>
                </div>
                <div class="info_item">
                    <label for="especialista-nome">Especialista:</label>
                    <input type="text" id="especialista-nome" :value="consulta.consulta" readonly>
                </div>
                <div class="info_item descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4" :value="consulta.descricao" readonly></textarea>
                </div>
                <div class="botoes">
                    <button class="btn_detalhar_hist" @click="laudo(consulta.laudos)">Fotos</button>
                    <button class="btn_arquivopdf_hist" @click="arquivoPdf(consulta.id)">Arquivo em PDF</button>
                    <button class="btn_editar_consul" @click="abrirModal(consulta)">Editar Consulta</button>
                </div>
            </div>
        </div>

        <!-- Modal de Edição -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Editar Consulta</h2>
                <label>Data:</label>
                <input type="date" v-model="consultaEdit.data">

                <label for="imagem">Laudos:</label>
                <input type="file" @change="handleFileUpload" multiple>

                <label>Descrição:</label>
                <textarea v-model="consultaEdit.descricao" rows="8"></textarea>

                <div class="modal-buttons">
                    <button @click="salvarEdicao">Salvar</button>
                    <button @click="fecharModal">Cancelar</button>
                </div>
            </div>
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
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.container_historico {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
}

.infos_historico {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    box-sizing: border-box;
}

.info_item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.descricao {
    grid-column: 1 / -1;
}

.botoes {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.info_item label {
    margin-bottom: 5px;
    color: #7E7E7E;
}

.info_item input,
.info_item textarea {
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    color: #7E7E7E;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
}

.info_item textarea {
    resize: none;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    text-align: justify;
}

.btn_detalhar_hist,
.btn_arquivopdf_hist,
.btn_editar_consul {
    flex: 1;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content h2 {
    color: #84E7FF;
    margin-bottom: 2px;
    font-size: 30px;
    margin-top: 2px;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 2px solid #84E7FF;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}
.modal-content input,
.modal-content textarea {
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    color: #7E7E7E;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    text-align: justify;
    resize: none;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;
}

.modal-buttons button {
    flex: 1;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
}
@media (max-width: 768px) {
    .main-content {
        margin-left: 0;
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import { useAuthStore } from '@/store.js'
import { formatDate } from '../utils/formatarData';
import Swal from 'sweetalert2';

export default {
    name: 'historicodeconsulta',

    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    components: {
        Sidebar
    },
    data() {
        return {
            formatDate,
            consultas: null,
            cpf: sessionStorage.getItem('cpf') || '',
            showModal: false,
            consultaEdit: {
                id: null,
                data: '',
                consulta: '',
                descricao: ''
            },
        };
    },
    mounted() {
        //Limpar o CPF do sessionStorage após uso
        //sessionStorage.removeItem('cpf');
        this.getConsultas()
    },
    methods: {
        async laudo(link) {
            try {
                if (link.length === 0) {
                    Swal.fire("Nenhum laudo anexado nesta consulta");
                }
                else if (link) {
                    for (let i = 0; i < link.length; i++) {
                        window.open(link[i], '_blank');
                    }
                }

            }
            catch {

            }

        },
        async arquivoPdf(id) {
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 3000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await Axios({
                url: `https://clinica-maria-luiza-bjdd.onrender.com/pdf/consulta/${id}`,  // Altere a URL conforme necessário
                method: 'GET',
                responseType: 'blob',  // Importante para tratar a resposta como um blob
            }).then(response => {
                // Crie um URL para o blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `consulta.pdf`); // Nome do arquivo
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao gerar PDF',
                    timer: 4000,
                })
                console.error('Erro ao baixar o PDF:', error)
            });
        },
        async getConsultas() {
            const token = this.store.token
            const cpf = this.cpf

            Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/consulta/paciente/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.consultas = response.data.consultas.consultas.slice().reverse()
                sessionStorage.removeItem('cpf');
            }).catch(error => {
                console.error(error)
            })
        },
        abrirModal(consulta) {
            this.consultaEdit = { ...consulta }; // Copia os dados da consulta selecionada
            this.showModal = true;
        },
        fecharModal() {
            this.showModal = false;
        },
        async salvarEdicao() {
            try {
                await Axios.put(`https://clinica-maria-luiza-bjdd.onrender.com/consulta/${this.consultaEdit.id}`, this.consultaEdit);
                Swal.fire('Sucesso!', 'Consulta editada com sucesso!', 'success');
                this.getConsultas(); // Atualiza a lista de consultas
                this.fecharModal();
            } catch (error) {
                Swal.fire('Erro!', 'Não foi possível salvar as alterações.', 'error');
            }
        }
    }
}
</script>