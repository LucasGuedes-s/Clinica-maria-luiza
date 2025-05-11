<template>
    <div>
        <div v-if="chatAberto" class="chatbox">
            <div class="chat-profissionais">
                <h4>Profissionais:</h4>
                <ul>
                    <li v-for="profissional in profissionais" :key="profissional.identificador"
                        @click="selecionarDestinatario(profissional)"
                        :class="{ ativo: destinatarioSelecionado?.identificador === profissional.identificador }">
                        <img :src="profissional.foto" class="avatar" />
                        <div class="info">
                            <span class="nome">{{ profissional.nome }}</span>
                            <span class="especialidade">{{ profissional.especialidade }}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="chat-main">
                <div class="chat-header">
                    <span>Chat</span>
                    <button class="fechar-chat" @click="chatAberto = false">✕</button>
                </div>

                <div class="chat-body" id="chatBody">
                    <div class="chat-messages" id="chatMessages">
                        <div v-for="(msg, index) in mensagens" :key="index"
                            :class="['message-row', msg.remetenteId === usuarioAtualEmail ? 'sent' : 'received']">

                            <img :src="getAvatar(msg.remetenteId)" class="avatar" />

                            <div class="message-container">
                                <div class="sender-name">
                                    {{ msg.remetenteId === usuarioAtualEmail ? 'Você' : msg.remetente.nome }}
                                </div>
                                <div class="message">{{ msg.texto }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="chat-input-container">
                        <input type="text" class="chat-input" placeholder="Digite sua mensagem..."
                            v-model="mensagemInput" @keyup.enter="enviarMensagem" />
                        <button class="chat-send" @click="enviarMensagem">Enviar</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="chat-header" @click="chatAberto = true"
            style="cursor: pointer; width: 240px; border-radius: 12px; position: fixed; bottom: 20px; right: 20px;">
            <span>Chat</span>
        </div>
    </div>
     <div v-if="notificacao.visivel" class="chat-notificacao">
            📩 Você recebeu uma nova mensagem de <strong>{{ notificacao.remetente?.nome }}</strong>
    </div>
</template>

<script>
import { io } from "socket.io-client";
import { useAuthStore } from "@/store";
import Axios from "axios";

export default {
    name: "Chat",
    setup() {
        const store = useAuthStore();
        return { store };
    },
    data() {
        return {
            socket: null,
            profissionais: [],
            destinatarioSelecionado: null,
            usuarioAtualEmail: this.store.usuario.usuario.email,
            mensagemInput: "",
            mensagens: [],
            chatAberto: false,
            notificacao: {
                visivel: false,
                remetente: null,
                timeoutId: null,
            },
        };
    },
    mounted() {
        this.socket = io("https://clinica-maria-luiza-bjdd.onrender.com/");

        this.socket.on("connect", () => {
        });

        this.socket.on("nova-mensagem", async (data) => {
            const { destinatarioEmail, remetenteEmail } = data;

            // Se não for o usuário atual, ignore
            if (destinatarioEmail !== this.usuarioAtualEmail) return;

            // Se o usuário já está com o chat aberto com o remetente, não exibe notificação
            if (
                this.chatAberto &&
                this.destinatarioSelecionado &&
                this.destinatarioSelecionado.email === remetenteEmail
            ) {
                await this.carregarMensagens();
                return; // Não exibe notificação
            }

            // Busca o profissional remetente
            const remetente = this.profissionais.find(p => p.email === remetenteEmail);
            if (!remetente) return;

            this.notificacao.remetente = remetente;
            this.notificacao.visivel = true;

            // Sempre carrega mensagens se for o remetente da conversa atual
            if (
                this.destinatarioSelecionado &&
                remetenteEmail === this.destinatarioSelecionado.email
            ) {
                await this.carregarMensagens();
            }
        });



        this.carregarProfissionais();
    },
    unmounted() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },
    methods: {
        async carregarProfissionais() {
            const token = this.store.token;
            try {
                const response = await Axios.get("https://clinica-maria-luiza-bjdd.onrender.com/profissionais", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const todosProfissionais = response.data.profissionais || response.data;

                this.profissionais = [
                    {
                        identificador: "todos",
                        nome: "Todos os profissionais",
                        especialidade: "Mensagem geral",
                        email: "Todos",
                        foto: require('../assets/emailprofissionais.png')
                    },
                    ...todosProfissionais
                        .filter(prof => prof.email !== this.usuarioAtualEmail)
                        .sort((a, b) => a.nome.localeCompare(b.nome))
                ];
            } catch (error) {
                console.error("Erro ao buscar profissionais:", error);
            }
        },

        async selecionarDestinatario(profissional) {
            this.destinatarioSelecionado = profissional;

            // Fecha a notificação se ela era do mesmo remetente
            if (
                this.notificacao.visivel &&
                this.notificacao.remetente &&
                profissional.email === this.notificacao.remetente.email
            ) {
                this.notificacao.visivel = false;
                clearTimeout(this.notificacao.timeoutId);
            }

            await this.carregarMensagens();
        },
        async carregarMensagens() {
            const remetenteEmail = this.usuarioAtualEmail;

            if (!this.destinatarioSelecionado) {
                console.warn("Nenhum destinatário selecionado.");
                return;
            }

            const destinatarioEmail = this.destinatarioSelecionado.email;

            // Para "Todos", não há histórico a carregar
            if (destinatarioEmail === "Todos") {
                this.mensagens = [];
                return;
            }

            try {
                const response = await Axios.post(
                    'https://clinica-maria-luiza-bjdd.onrender.com/mensagem/get',
                    { remetenteEmail, destinatarioEmail },
                    {
                        headers: {
                            Authorization: `Bearer ${this.store.token}`,
                        },
                    }
                );

                this.mensagens = response.data.reverse();
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            } catch (error) {
                console.error("Erro ao carregar mensagens:", error);
            }
        },

        getAvatar(remetenteId) {
            if (remetenteId === this.usuarioAtualEmail) {
                return this.store.usuario.usuario.foto;
            }

            const profissional = this.profissionais.find(prof => prof.email === remetenteId);
            return profissional ? profissional.foto : '';
        },

        async enviarMensagem() {
            if (!this.mensagemInput.trim()) return;

            const remetenteEmail = this.usuarioAtualEmail;
            const destinatarioEmail = this.destinatarioSelecionado?.email;
            const texto = this.mensagemInput.trim();

            if (!destinatarioEmail) {
                console.warn("Destinatário não selecionado");
                return;
            }

            try {
                await Axios.post(
                    "https://clinica-maria-luiza-bjdd.onrender.com//mensagem",
                    { remetenteEmail, destinatarioEmail, texto },
                    {
                        headers: {
                            Authorization: `Bearer ${this.store.token}`,
                        },
                    }
                );

                this.mensagemInput = "";

                if (destinatarioEmail === "Todos") {
                    this.mensagens = [{
                        remetenteId: remetenteEmail,
                        remetente: { nome: "Você" },
                        texto: "Mensagem geral enviada para todos os profissionais.",
                    }];
                } else {
                    await this.carregarMensagens();
                }
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        },

        scrollToBottom() {
            const container = document.getElementById("chatMessages");
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },
    },
};
</script>

<style scoped>
.chatbox {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 720px;
    height: 500px;
    display: flex;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    z-index: 2;
}

.chat-profissionais {
    width: 220px;
    background: #ffffff;
    padding: 16px 12px;
    overflow-y: auto;
    border-right: 1px solid #eee;
}

.chat-profissionais h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #84E7FF;
}

.chat-profissionais ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.chat-profissionais li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
}

.chat-profissionais li:hover,
.chat-profissionais li.ativo {
    background: #e6f7ff;
}

.chat-profissionais img.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.chat-profissionais .info {
    display: flex;
    flex-direction: column;
}

.chat-profissionais .nome {
    font-size: 13px;
    color: #333;
}

.chat-profissionais .especialidade {
    font-size: 11px;
    color: #888;
}

.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.chat-header {
    background-color: #84E7FF;
    padding: 14px 20px;
    font-weight: bolder;
    font-size: 16px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.chat-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    overflow: hidden;
}

.chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-color: white;
}

.sender-name {
    font-size: 12px;
    font-weight: 600;
    color: #7E7E7E;
    margin-bottom: 4px;
}

.message-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.chat-input-container {
    display: flex;
    border-top: 1px solid #eee;
    background: white;
    padding: 12px;
}

.chat-input {
    flex: 1;
    border: none;
    font-size: 14px;
    outline: none;
    padding: 10px 12px;
    border-radius: 10px;
    background: #F5F5F5;
    font-family: 'Montserrat', sans-serif;
}

.chat-send {
    margin-left: 10px;
    background-color: #84E7FF;
    color: white;
    border: none;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Montserrat', sans-serif;
}

.fechar-chat {
    background: transparent;
    border: none;
    font-size: 18px;
    color: white;
    cursor: pointer;
}

.message-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
}

.message-row.received {
    justify-content: flex-start;
}

.message-row.sent {
    justify-content: flex-end;
}

.message-container {
    display: flex;
    flex-direction: column;
    max-width: 75%;
}

.message {
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    word-wrap: break-word;
}

.message-row.sent .message {
    background-color: #e6f7ff;
    color: #7E7E7E;
    border-bottom-right-radius: 0;
    align-self: flex-end;
}

.message-row.received .message {
    background-color: #F5F5F5;
    color: #333;
    border-bottom-left-radius: 0;
    align-self: flex-start;
}

.sender-name {
    font-size: 12px;
    font-weight: 600;
    color: #7E7E7E;
    margin-bottom: 4px;
}

.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 2px #e6f7ff;
}

.chat-notificacao {
    position: fixed;
    bottom: 90px; 
    right: 20px;
    background-color: #e6f7ff;
    border: 1px solid #84E7FF;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 14px;
    color: #7E7E7E;
    z-index: 999;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
