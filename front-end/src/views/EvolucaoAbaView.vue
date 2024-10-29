<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_evolucao">
        <div>
            <GraficoEvolucao :dado="cpf" />
        </div>
        <div class="titulo_evolucao">
            <h1>Histórico de consultas Aba</h1>
        </div>
        <table class="tabela">
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
                    <button v-if="permissao_user" class="btn_exluir"
                        @click="exluirConsulta(consult.pacientes)">Exluir</button>
                    <button class="btn_foto" @click="abrirFoto(consult.foto)">Ver foto</button>
                </tr>
            </tbody>
        </table>
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
export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            consulta: [],
            formatDate
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
        GraficoEvolucao
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
            await Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/consultasAba/paciente/${this.cpf}`
            ).then(response => {
                this.consulta = response.data.consultas
            }).catch(error => {
                console.error(error)
            })
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
}
</style>
