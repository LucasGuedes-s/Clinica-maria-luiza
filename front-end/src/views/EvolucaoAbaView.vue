<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_evolucao">
        <div v-if="!loading && consulta.length === 0" class="div_consultanaoregistrada">
            <ConsultaNaoRegistrada />
        </div>
        <div v-if="consulta.length != 0">
            <GraficoEvolucao :dado="cpf" />
        </div>
        <div v-if="estimulos.length != 0">
            <div class="titulo_evolucao" v-if="estimulos.length != 0">
                <h1>Estímulos Aba</h1>
            </div>
            <div class="titulo_evolucao" v-for="estimulo in estimulos" :key="estimulo.estimuloId">
                <div class="estimulos">
                    <p>{{ estimulo.estimulo.nome_estimulo }} - {{ estimulo.estimulo.descricao }}</p>
                    <button @click="finalizarestimulo(estimulo.pacienteCpf, estimulo.estimuloId)" v-if="permissao_user">Finalizar</button>
                </div>
            </div>
        </div>
        <div class="titulo_evolucao" v-if="consulta.length != 0">
            <h1>Histórico de consultas Aba</h1>
        </div>
        <table class="tabela" v-if="consulta.length != 0">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Atividade</th>
                    <th>Aplicador</th>
                    <th>Aplicação 01</th>
                    <th>Aplicação 02</th>
                    <th>Aplicação 03</th>
                    <th>Aplicação 04</th>
                    <th>Aplicação 05</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(consult, index) in consulta.slice(0, 20)" :key="consult.pacientes">
                    <td>{{ formatDate(consult.data) }}</td>
                    <td>{{ consult.descricao_atividade }}</td>
                    <td>{{ consult.profissional.nome }}</td>
                    <td>{{ consult.Aplicacao1 }}</td>
                    <td>{{ consult.Aplicacao2 }}</td>
                    <td>{{ consult.Aplicacao3 }}</td>
                    <td>{{ consult.Aplicacao4 }}</td>
                    <td>{{ consult.Aplicacao5 }}</td>
                    <button class="btn_editar" @click="abrirModal(consult)">Editar</button>
                    <button v-if="permissao_user" class="btn_exluir"
                        @click="exluirConsulta(consult.pacientes)">Exluir</button>
                    <button class="btn_foto" @click="abrirFoto(consult.foto)">Ver foto</button>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
            <div class="organizacao_inputs">
                <div class="form-group horainicio">
                    <label for="inicio">Data da consulta:</label>
                    <input type="date" v-model="consultaEdit.data" />
                </div>
                <div class="form-group horainicio">
                    <label for="inicio">Hora de Início:</label>
                    <input type="time" v-model="consultaEdit.inicio" />
                </div>
                <div class="form-group descricao">
                    <label>Descrição de atividade:</label>
                    <input id="descricao_atividade" v-model="consultaEdit.descricao_atividade" />
                </div>
                <div class="form-group pequenos-inputs">
                    <label>Aplicações:</label>
                    <div class="inputs-row">
                        <select v-model="consultaEdit.Aplicacao1">
                            <option value="" disabled selected>01:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>


                        <select v-model="consultaEdit.Aplicacao2">
                            <option value="" disabled selected>02:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>


                        <select v-model="consultaEdit.Aplicacao3">
                            <option value="" disabled selected>03:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>


                        <select v-model="consultaEdit.Aplicacao4">
                            <option value="" disabled selected>04:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>


                        <select v-model="consultaEdit.Aplicacao5">
                            <option value="" disabled selected>05:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>
                    </div>
                </div>


                <div class="form-group observacao">
                    <label for="observacao_aba">Observação:</label>
                    <textarea id="observacao_aba" v-model="consultaEdit.observacoes"></textarea>
                </div>


                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" accept="image/*" @change="handleFileUpload">
                </div>


                <div class="form-group horafinal">
                    <label for="fim">Hora de Fim:</label>
                    <input type="time" v-model="consultaEdit.fim" id="fim" />
                </div>


                <div class="modal-buttons">
                    <button @click="salvarEdicao">Salvar</button>
                    <button @click="fecharModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { formatDate } from '../utils/formatarData';
import router from '@/router';
import GraficoEvolucaoBarras from '@/components/GraficoEvolucaoBarras.vue';
import ConsultaNaoRegistrada from '@/components/ConsultaNaoRegistrada.vue';

export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        this.getEstimulos()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            consulta: [],
            formatDate,
            estimulos: [],
            consultaEdit: {}, // Dados da consulta sendo editada
            showModal: false,  // Controle do modal de edição
            loading: true, // <-- nova flag
        }
    },
    setup() {
        const store = useAuthStore()
        const authStore = useAuthStore();
        const userPermissions = authStore.getUser.usuario.permissao; // Obtém as permissões do usuário
        const requiredPermission = 1;

        const permissao_user = userPermissions === requiredPermission;

        return {
            permissao_user,
            store,
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        Sidebar,
        GraficoEvolucao,
        GraficoEvolucaoBarras,
        ConsultaNaoRegistrada,
    },
    methods: {
        async abrirFoto(link) {
            try {
                if (link.length === 0) {
                    Swal.fire("Nenhuma imagem foi anexada nessa consulta");
                }
                else if (link) {
                    window.open(link, '_blank');
                }
            }
            catch {
            }
        },
        async getConsultas() {
            const token = this.store.token;

            this.loading = true;
            try {
                const response = await Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/consultasAba/paciente/${this.cpf}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.consulta = response.data.consultas;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async getEstimulos() {
            const token = this.store.token;

            try {
                console.log(this.cpf);
                const response = await Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/estimulos/paciente/${this.cpf}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.estimulos = response.data.estimulo;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async exluirConsulta(id) {
            const authStore = useAuthStore();
            const userPermissions = authStore.getUser.usuario.permissao; // Obtém as permissões do usuário
            const requiredPermission = 1;

            if (userPermissions != requiredPermission) {
                router.push('/unauthorized'); // Redireciona para uma página de acesso negado
            }
            else {
                const token = this.store.token
                Swal.fire({
                    title: 'Você tem certeza?',
                    text: "Essa ação não pode ser desfeita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, deletar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // O usuário confirmou, envia a requisição
                        Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/apagar/consulta/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deletado com sucesso',
                                timer: 4000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                didOpen: () => {
                                    Swal.showLoading();
                                }
                            });
                            this.getConsultas(); // Atualiza a lista de consultas
                        }).catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Não deletado! Algo de errado',
                                timer: 4000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                didOpen: () => {
                                    Swal.showLoading();
                                }
                            });
                            console.error(error);
                        });
                    }
                });
            }
        },
        abrirModal(consult) {
            const formattedDate = new Date(consult.data).toISOString().split('T')[0]; // Ex: "2025-03-29"
            this.consultaEdit = {
                ...consult,
                data: formattedDate,
                consultaAba: consult.consultaAba || {}  // Definir 'consultaAba' como um objeto vazio caso esteja ausente
            };

            this.showModal = true;
        },

        fecharModal() {
            this.showModal = false;
        },
        async salvarEdicao() {
            try {
                const dadosEdicao = {
                    consultaAba: {
                        id: this.consultaEdit.pacientes,  // Mantendo 'pacientes' como id
                        data: this.consultaEdit.data,
                        inicio: this.consultaEdit.inicio,
                        fim: this.consultaEdit.fim,
                        descricao: this.consultaEdit.descricao_atividade,
                        aplicacao1: this.consultaEdit.Aplicacao1,
                        aplicacao2: this.consultaEdit.Aplicacao2,
                        aplicacao3: this.consultaEdit.Aplicacao3,
                        aplicacao4: this.consultaEdit.Aplicacao4,
                        aplicacao5: this.consultaEdit.Aplicacao5,
                        observacoes: this.consultaEdit.observacoes,
                        foto: this.consultaEdit.foto,
                    }
                };

                let response = await Axios.put(
                    'https://clinica-maria-luiza-bjdd.onrender.com/update/consultaAba',
                    dadosEdicao,
                    {
                        headers: { 'Authorization': `Bearer ${this.store.token}` }
                    }
                );

                if (response.status === 200) {
                    Swal.fire('Sucesso!', 'Consulta atualizada com sucesso.', 'success');

                    const updatedConsulta = response.data.consulta;

                    // Verificando se a API retornou os dados corretamente
                    if (!updatedConsulta || !updatedConsulta.pacientes) {
                        throw new Error("Dados inválidos recebidos da API");
                    }

                    // Atualizando os dados no array consulta
                    this.consulta = this.consulta.map(item =>
                        item.pacientes === updatedConsulta.pacientes
                            ? { ...item, ...updatedConsulta } // Atualiza apenas os campos necessários
                            : item
                    );

                    this.showModal = false;
                } else {
                    throw new Error('Erro ao atualizar consulta');
                }
            } catch (error) {
                Swal.fire('Erro!', 'Não foi possível salvar as edições. Tente novamente.', 'error');
            }
        },
        async finalizarestimulo(pacienteCpf, estimuloId) {
            const token = this.store.token;

            try {
                await Axios.put(`http://localhost:3000/alterar/estimulo`, {
                    pacienteCpf: pacienteCpf,
                    estimuloId: estimuloId
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Estímulo finalizado com sucesso',
                        timer: 4000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    this.getEstimulos(); // Atualiza a lista de estímulos
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao finalizar o estímulo',
                    text: error.response?.data?.message || 'Tente novamente mais tarde.',
                    timer: 4000,
                });
            }
        }

    }
}
</script>

<style>
.titulo_evolucao {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #84E7FF;
}

.titulo_evolucao h1 {
    color: #D9D9D9;
}

.main-content_evolucao {
    margin-left: 250px;
    padding: 10px;
}

.estimulos {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    background-color: white;
    text-align: center;
    border-radius: 8px;
}

.estimulos button {
    background-color: #84E7FF;
    width: 20%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
}

/* Cabeçalho da tabela */
table thead {
    background-color: #84E7FF;
    color: #fff;
}

table {
    background-color: white;
    width: 100%;
}

table th,
table td {
    padding: 12px 15px;
    text-align: left;
}

table th {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
}

/* Linhas da tabela */
table tbody tr {
    border-bottom: 1px solid #ddd;
}

/* Cor alternada nas linhas da tabela */
table tbody tr:nth-of-type(even) {
    background-color: #f2f2f2;
}

table tbody tr:hover {
    background-color: #f1f1f1;
}

/* Estilo das células */
table td {
    font-size: 14px;
    line-height: 1.5;
    text-align: justify;
}

.btn_foto {
    background-color: #84E7FF;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
}

.btn_exluir {
    background-color: #E7FAFF;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
}

.btn_editar {
    background-color: #c8e0f4;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
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

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 70%;
    display: flex;
    flex-direction: column;
    border: 2px solid #84E7FF;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
    grid-template-columns: 1fr 1fr;
}


.form-group {
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr 1fr;
}


.form-group label {
    margin-bottom: 10px;
}


.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    resize: none;


}


.inputs-row {
    display: flex;
    gap: 15px;
    /* Espaço entre os inputs */
    grid-column: 1 / -1;
}


.inputs-row input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;
    grid-column: 1 / -1;
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

.organizacao_inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    align-items: start;
}

.form-group.horafinal,
.form-group.observacao,
.form-group.selecionar,
.form-group.descricao,
.form-group.pequenos-inputs {
    grid-column: 1 / -1;
    /* Faz esses campos ocuparem toda a largura */
}

@media (max-width: 768px) {
    .main-content_evolucao {
        margin-left: 0;
        padding: 10px;
    }


    table {
        font-size: 10px;
        /* Diminui ainda mais o tamanho da fonte */
    }


    table th,
    table td {
        padding: 6px 8px;
        /* Diminui ainda mais o padding */
    }


    /* Para esconder colunas que podem ser menos importantes */
    table th:nth-child(n+3),
    /* Altera o n conforme necessário */
    table td:nth-child(n+3) {
        display: none;
        /* Esconde colunas a partir da quarta */
    }


    .btn_exluir {
        display: none
    }


    .btn_foto {
        font-size: 12px;
        /* Diminui o tamanho do botão */
        padding: 6px;
        /* Ajusta o padding do botão */
    }

    .btn_editar {
        font-size: 12px;
        /* Diminui o tamanho do botão */
        padding: 6px;
        /* Ajusta o padding do botão */
    }
}
</style>
