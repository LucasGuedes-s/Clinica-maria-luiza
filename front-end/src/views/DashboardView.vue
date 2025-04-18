<template>
    <div>
        <Sidebar />
    </div>
    <div class="main_content_dashboard">
        <div class="titulo_dashboard">
            <h1>Bem-vindo(a)!</h1>
        </div>
        <div class="contagem_dashboard" v-if="permissao === 1">
            <p>Total de consultas: <strong> <span class="value_totalconsultas"> {{ total.totalConsultasAba +
                        total.totalConsultas}} </span></strong> </p>
            <p>Total de consultas de rotina: <strong> <span class="value_totalconsultasrotina">{{ total.totalConsultas
                        }} </span></strong> </p>
            <p>Total de consultas ABA: <strong> <span class="value_totalconsultasaba"> {{ total.totalConsultasAba }}
                    </span></strong> </p>
        </div>
        <div class="container_dashboard">
            <img :src="imageUrl" alt="Foto do Usuário" @error="onImageError" />
            <div class="informacao">
                <p>Nome: {{ nome }}</p>
                <p>E-mail: {{ email }}</p>
                <p>Telefone: {{ telefone }}</p>
                <!-- <router-link to="/alterarsenha"><button class="alterar_senha_btn" click="teste">Alterar
                            Senha</button></router-link>-->
                <router-link to="/realizarpagamento"><button class="realizarpagamento_btn" click="">Realizar
                        Pagamento</button></router-link>
            </div>
            <div class="calendario">
                <CalendarAgendamentos :agendamentos="agendamentos" />
            </div>
        </div>


        <h2>Agendamentos Solicitados:</h2>
        <div class="container_agendamentos_dashboard" v-for="agenda in agenda" :key="agenda.id">
            <div class="resposta-informacao">
                <label for="paciente-nome">Agendamento:</label>
                <input type="text" id="paciente-nome" :value="agenda.agendamento" readonly>
                <div v-if="permissao === 1">
                    <label for="paciente-nome">Profissional:</label>
                    <input type="text" id="paciente-nome" :value="agenda.profissional.nome" readonly>
                </div>
                <label for="paciente-nome" v-if="agenda.paciente != null">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" v-if="agenda.paciente != null" :value="agenda.paciente.nome"
                    readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" :value="agenda.dataFormatada" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" :value="agenda.horaFormatada" readonly>
                <div class="botoes">
                    <button class="btn-concluido" @click="updateAgendamento(agenda.id)">Alterar status</button>
                    <button class="btn-concluido"
                        @click="enviarNotificacao(agenda.paciente.telefone, agenda.paciente.nome, agenda.dataFormatada, agenda.horaFormatada)">Enviar
                        notificação</button>
                    <button class="btn_editaragendamento" @click="abrirModal(agenda)">Editar Consulta</button>
                </div>

            </div>
        </div>

        <!-- Modal de Edição -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Editar Agendamento</h2>
                <label for="agendamento_especialidade">Agendamento:</label>
                <input type="text" id="agendamento_especialidade" v-model="agendaEditada.agendamento">


                <label for="paciente-nome">Profissional:</label>
                <input type="text" id="paciente-nome" v-model="agendaEditada.profissional.nome" readonly>


                <label for="paciente-nome">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" v-model="agendaEditada.paciente.nome" readonly>

                <label for="editar-data">Data:</label>
                <input type="date" id="editar-data" v-model="agendaEditada.data" />

                <label for="editar-hora">Hora:</label>
                <input type="time" id="editar-hora" v-model="agendaEditada.hora" />

                <div class="modal-buttons">
                    <button @click="salvarEdicao">Salvar</button>
                    <button @click="deletarAgendamento">Deletar</button>
                    <button @click="fecharModal">Cancelar</button>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
body {
    margin: 0px;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
    display: block;
}

.main_content_dashboard {
    margin-left: 250px;
    padding: 20px;
}

.titulo_dashboard {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.titulo_dashboard h1 {
    color: #D9D9D9;
}

.contagem_dashboard {
    display: flex;
    justify-content: space-around;
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.contagem_dashboard h1 {
    color: #D9D9D9;
    font-size: 18px;
}
.container_dashboard {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container_dashboard img {
    width: 250px;
    height: 250px;
    margin-right: 20px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.informacao {
    flex-grow: 1;
}

.botoes_div {
    bottom: 20px;
    right: 20px;
}
.calendario{
    display: flex;
}
.alterar_senha_btn,
.realizarpagamento_btn {
    padding: 10px 20px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    margin-right: 20px;
}

.informacao {
    color: #7E7E7E;
}

h2 {
    color: #84E7FF;
}

.container_agendamentos_dashboard {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
    /* Ajuste para se adaptar ao layout */
}

.resposta-informacao {
    display: flex;
    flex-direction: column;
}

.resposta-informacao label {
    margin-top: 10px;
    color: #7E7E7E;
}

.resposta-informacao input {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
    width: 100%;
    /* Certifica que o input ocupe 100% da largura */
    box-shadow: none;
    box-sizing: border-box;
    /* Inclui o padding e borda na largura total */
}

.btn-concluido,
.btn_editaragendamento{
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    font-family: 'Montserrat', sans-serif;

}

.btn-concluido:hover {
    background-color: #E7FAFF;
}

.botoes {
    display: flex;
    width: 100%;
    gap: 20px;
}
.value_totalconsultas,
.value_totalconsultasrotina,
.value_totalconsultasaba {
    color: #84E7FF;
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
    .main_content_dashboard {
        margin-left: 0; /* Retira o margin-left nas telas menores */
    }

    .container_dashboard {
        flex-direction: column; 
        align-items: center;
        justify-content: center; 
        text-align: center; 
    }

    .container_dashboard img {
        width: 200px; 
        height: auto; 
    }

    .calendario {
        margin-top: 20px; 
    }

    .botoes_div {
        position: static; 
    }

    .alterar_senha_btn,
    .realizarpagamento_btn {
        width: 100%; 
        margin-bottom: 10px; 
    }
}
@media (max-width: 820px) {
    .main_content_dashboard {
        margin-left: 0; 
    }

    .container_dashboard {
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        gap: 20px; 
        z-index: -1;
    }

    .container_dashboard img {
        width: 200px;
        height: auto; 
    }

    .informacao {
        text-align: center; 
    }

    .botoes_div {
        text-align: center; 
    }

    .alterar_senha_btn,
    .realizarpagamento_btn {
        width: 100%; 
        margin-bottom: 10px; 
        margin-left: auto;
        margin-right: auto;
    }
}
@media (max-width: 1247px) {
    .main_content_dashboard {
        margin-left: 0; 
    }

    .container_dashboard {
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        gap: 20px; 
        z-index: -1;
    }

    .container_dashboard img {
        width: 200px;
        height: auto; 
    }

    .informacao {
        text-align: center; 
    }

    .botoes_div {
        text-align: center; 
    }

    .alterar_senha_btn,
    .realizarpagamento_btn {
        width: 100%; 
        margin-bottom: 10px; 
        margin-left: auto;
        margin-right: auto;
    }
}

</style>

<script>
import { useAuthStore } from '@/store';
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2'
import router from '@/router';
import CalendarAgendamentos from '@/components/Calendario.vue';
// PRECISA AINDA CHAMAR O COMPONENTE CalendarAgendamentos

export default {
    name: 'dashboard',
    components: {
        CalendarAgendamentos,
        Sidebar

    },
    props: {
        agendamentos: {
            type: Array,
            required: true,
        },
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data() {
        return {
            total: 0,
            agendamentos: [],
            agenda: [],
            user: null,
            nome: null,
            email: null,
            permissao: null,
            telefone: null,
            imageUrl: null,        
            agendaEditada: {},
            showModal: false,
        }
    },
    methods: {
        async dados() {
            try {
                this.user = this.store.usuario.usuario
                this.nome = this.user.nome
                this.email = this.user.email
                this.telefone = this.user.telefone
                this.imageUrl = this.user.foto
                this.permissao = this.user.permissao
            }
            catch {
                console.log('Erro ao obter usuários')
            }
        },

        async getAgendamentos() {
            const token = this.store.token
            Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/profissionais/agendamentos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.agendamentos = response.data.agenda
                this.total = response.data.totalConsultas
                this.agenda = response.data.agenda.filter(agendamento => agendamento.status === 'Andamento');
            }).catch(error => {
                console.log(error)
            })
        },
        abrirModal(agenda) {
            this.agendaEditada = {...agenda,
            };
            this.showModal = true;
        },
        fecharModal() {
            this.showModal = false; // Fecha o modal
        },
        async salvarEdicao() {
            try {
                const token = this.store.token;

                // Verifica se data e hora estão preenchidas
                const data = this.agendaEditada.data;
                const hora = this.agendaEditada.hora;

                if (!data || !hora) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos obrigatórios',
                        text: 'Por favor, preencha data e hora corretamente.'
                    });
                    return;
                }

                // Junta data e hora num formato ISO válido
                const dataStr = `${data}T${hora}:00`;
                const dataHora = new Date(dataStr);

                if (isNaN(dataHora.getTime())) {
                    throw new Error('Data e hora inválidas');
                }

                const dataISO = dataHora.toISOString();

                const response = await Axios.put(`http://localhost:3000/atualizar/agendamento`, {
                    agenda: {
                        id: this.agendaEditada.id,
                        dadosAtualizados: {
                            agendamento: this.agendaEditada.agendamento,
                            profissional: this.agendaEditada.profissional.email,
                            paciente: this.agendaEditada.paciente.cpf,
                            data: dataISO,
                        },
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agendamento Atualizado!',
                        text: 'O agendamento foi atualizado com sucesso.',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    this.getAgendamentos();
                    this.fecharModal();
                }

            } catch (error) {
                console.error('Erro ao salvar a edição:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Houve um erro ao atualizar o agendamento. Tente novamente.',
                });
            }
        },
        async deletarAgendamento() {
            try {
                const confirmacao = await Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você deseja deletar este agendamento? Esta ação não pode ser desfeita.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sim, deletar!',
                    cancelButtonText: 'Cancelar'
                });

                if (!confirmacao.isConfirmed) return;

                const token = this.store.token;

                const response = await Axios.put('http://localhost:3000/atualizar/agendamento', {
                    agenda: {
                        id: this.agendaEditada.id,
                        deletar: true
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Deletado!',
                    text: response.data.mensagem || 'Agendamento deletado com sucesso.',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });

                this.getAgendamentos(); // Atualiza lista
                this.fecharModal(); // Fecha o modal

            } catch (error) {
                console.error('Erro ao deletar agendamento:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível deletar o agendamento. Tente novamente.'
                });
            }
        },
        async enviarNotificacao(telefone, paciente, data, hora) {
            Swal.fire({
                title: 'Deseja mesmo enviar notificação?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Enviar notificação',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let numeroPaciente = telefone; // Número recebido

                    // Remove espaços, traços e outros caracteres não numéricos
                    numeroPaciente = numeroPaciente.replace(/\D/g, "");

                    // Adiciona código do país, se necessário (Brasil: 55)
                    if (numeroPaciente.length === 11) {
                        numeroPaciente = "55" + numeroPaciente;
                    } else if (numeroPaciente.length === 10) {
                        // Para casos sem o nono dígito, adicionamos o "9" e o DDD correto
                        numeroPaciente = "5584" + numeroPaciente.substring(2);
                    }
                    const clinica = 'Clínica Maria Luiza'
                    const endereco = 'Rua Tomaz de Araújo 287, centro, Acari'
                    const mensagem = `📌 Olá ${paciente},\n\nLembre-se que você tem horário marcado em ${data} às ${hora}.\n\n*${clinica}*\n\n${endereco}`;
                    const linkWhatsApp = `https://wa.me/${numeroPaciente}?text=${encodeURIComponent(mensagem)}`;

                    window.open(linkWhatsApp, "_blank"); // Abre o WhatsApp em uma nova aba
                }
            });
        },
        async updateAgendamento(id) {
            Swal.fire({
                title: 'O que você deseja fazer?',
                text: "O que você deseja fazer?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Marcar como concluída',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const token = this.store.token
                    Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/profissional/agendamento/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tarefa concluída com sucesso!',
                            text: 'O status da tarefa foi atualizado com sucesso',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false
                        })
                        this.getAgendamentos()
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
        }
    },
    mounted() {
        this.dados();
        this.getAgendamentos()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.store.isAuthenticated) {
                vm.$router.push('/login')
            }
        })
    }
}
</script>