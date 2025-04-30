<template>
    <Sidebar />
    <div class="main-content_profissionais">
        <h1>Profissionais</h1>
        <div class="search-cadastrar">
            <input type="text" id="search-input" placeholder="Nome do profissional..." v-model="pesquisa">
            <RouterLink to="/cadastrarprofissional"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container-profissional" v-for="usuario in filteredProfissional" :key="usuario.email">
            <img :src="usuario.foto">
            <div class="info_prof">
                <p>Nome: {{ usuario.nome }}</p>
                <p>Especialide: {{ usuario.especialidade }}</p>
                <p>E-mail: {{ usuario.email }}</p>
                <p>Telefone: {{ usuario.telefone }}</p>
                <p>Pix: {{ usuario.pix }}</p>
                <p>Total de Consultas: {{ consultasPorProfissional[usuario.email] || 0 }}</p> 
            </div>
            <div class="detalhar-div">
                <button class="detalhar-btn" @click="consultas(usuario.email, usuario.nome)">Consultas</button>
                <button class="detalhar-btn" @click="abrirModal(usuario)">Editar Dados</button>
            </div>
        </div>

        <!-- Modal de Edição -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Editar Profissional</h2>

                <label for="nome">Nome:</label>
                <input type="text" id="nome_funcionario" name="nome" v-model="consultaEdit.nome">


                <label for="email">Email:</label>
                <input type="email" id="email_prof" name="email" v-model="consultaEdit.email">

                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone_prof" name="telefone" v-model="consultaEdit.telefone">

                <label for="pix">PIX:</label>
                <input type="text" id="pix" name="pix" v-model="consultaEdit.pix">

                <label for="imagem">Adicionar Imagem:</label>
                <input type="file" id="imagem_prof" name="imagem" @change="handleFileUpload">

                <div class="modal-buttons">
                    <button @click="salvarEdicao">Salvar</button>
                    <button @click="fecharModal">Cancelar</button>
                </div>
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

h1 {
    color: #84E7FF;
}

.main-content_profissionais {
    margin-left: 250px;
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
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
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

.info_prof {
    flex-grow: 1;
    color: #7E7E7E;
    margin-left: 10px;
}

.detalhar-div {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 15px;
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
.modal-content textarea,
.modal-content select {
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
    .container-profissional {
        align-items: flex-start;
        justify-content: center;
        flex-direction: row;
    }

    .container-profissional img {
        width: 110px;
        margin-right: 0px;
    }

    .info_prof {
        font-size: 11px;
    }

    .main-content_profissionais {
        margin-left: 0;
        padding: 10px;
    }

    .search-cadastrar {
        flex-direction: row;
        align-items: center;
    }

    input {
        padding: 8px;
        font-size: 14px;
    }

    .search-cadastrar button {
        padding: 8px 16px;
        font-size: 14px;
        width: 100px;
    }

    .detalhar-div {
        position: absolute;
        margin-top: 10px;
    }
}
</style>
<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';

export default {
    name: 'profissionais',
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
            hora: '',
            pesquisa: '',
            profissional: [],
            consultasPorProfissional: {},
            showModal: false,
            consultaEdit: {},
        }
    },
    methods: {
        async carregarConsultasPorProfissional() {
            try {
                const requests = this.profissional.map(async (prof) => {
                    const response = await Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/consultas/profissional/${prof.email}`);
                    return { email: prof.email, total: response.data.consultas };
                });

                // Aguarda todas as requisições finalizarem
                const resultados = await Promise.all(requests);

                // Atualiza o estado com os valores retornados
                this.consultasPorProfissional = resultados.reduce((acc, item) => {
                    acc[item.email] = item.total;
                    return acc;
                }, {});

            } catch (error) {
                console.error("Erro ao carregar consultas por profissional:", error);
            }
        },
        abrirModal(usuario) {
            this.consultaEdit = { ...usuario };
            this.showModal = true;
        },
        fecharModal() {
            this.showModal = false; // Fecha o modal
            this.consultaEdit = null; // Limpa os dados do profissional
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Crie um objeto FileReader para ler a imagem
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Atualiza a URL da imagem localmente para visualização
                    this.consultaEdit.foto = e.target.result;
                };
                reader.readAsDataURL(file); // Lê a imagem e converte em base64
                this.consultaEdit.imagemArquivo = file; // Salva o arquivo para enviar depois
            }
        },
        async salvarEdicao() {
            try {
                const token = this.store.token;

                const payload = {
                    email: this.consultaEdit.email,
                    nome: this.consultaEdit.nome,
                    telefone: this.consultaEdit.telefone,
                    pix: this.consultaEdit.pix,
                    email_novo: this.consultaEdit.email, // mantém o mesmo se não for alterado
                    especialidade: this.consultaEdit.especialidade,
                    foto: this.consultaEdit.foto,
                };

                const response = await Axios.put(
                    "https://clinica-maria-luiza-bjdd.onrender.com/editar/profissional",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const index = this.profissional.findIndex(p => p.email === this.consultaEdit.email);
                if (index !== -1) {
                    this.profissional[index] = { ...this.consultaEdit };
                }

                this.fecharModal();

                Swal.fire({
                    icon: 'success',
                    title: 'Dados atualizados com sucesso!',
                    timer: 2000,
                });

            } catch (error) {
                console.error("Erro ao salvar edição:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar alterações!',
                    timer: 3000,
                });
            }
        },

        async consultas(email, nome) {
            try {
                localStorage.setItem('profissional', email);
                router.push('/visualizarconsultas');
                /* Pergunta se o usuário quer ver consultas com ou sem hora
                const horaResult = await Swal.fire({
                    title: 'Deseja',
                    text: 'Deseja visualizar consultas com hora ou sem?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Com hora das consultas',
                    cancelButtonText: 'Cancelar',
                    showDenyButton: true,
                    denyButtonText: 'Sem hora das consultas',
                });

                if (horaResult.isDismissed) {
                    return; // Se o usuário cancelar, interrompe o fluxo
                }

                const hora = horaResult.isConfirmed;

                // Pergunta se o usuário quer ver o mês atual ou anterior
                const periodoResult = await Swal.fire({
                    title: 'Escolha o período',
                    text: 'Deseja visualizar consultas do mês atual ou do mês anterior?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Mês atual',
                    cancelButtonText: 'Cancelar',
                    showDenyButton: true,
                    denyButtonText: 'Mês anterior',
                });

                if (periodoResult.isDismissed) {
                    return; // Se o usuário cancelar, interrompe o fluxo
                }

                const mesDesejado = periodoResult.isConfirmed ? 'atual' : 'anterior';
                Swal.fire({
                    title: 'Aguarde...',
                    text: 'Estamos gerando o PDF.',
                    timer: 3000,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                // Faz a requisição para gerar o PDF
                const response = await Axios({
                    url: 'https://clinica-maria-luiza-bjdd.onrender.com/historico/consultas',
                    method: 'POST',
                    responseType: 'blob', // Para tratar a resposta como arquivo
                    data: {
                        email: email,
                        mesDesejado: mesDesejado,
                        hora: hora
                    }
                });

                // Cria e baixa o arquivo PDF
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Relatório de atendimentos - ${nome}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();*/

            } catch (error) {
                // Exibe erro em caso de falha
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao gerar PDF',
                    timer: 4000,
                });
            }

        },
        async profissionais() {
            const token = this.store.token
            Axios.get("https://clinica-maria-luiza-bjdd.onrender.com/profissionais", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.profissional = response.data.profissionais;
                this.carregarConsultasPorProfissional();
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
    mounted() {
        this.profissionais()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            try {
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
            catch {
                console.log("Erro")
            }

        })
    }
}

</script>