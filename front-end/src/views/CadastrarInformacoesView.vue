<template>
    <Sidebar />
    <div class="main_content">
        <div class="container_cadastrarinformacoes">
            <div class="header_container">
                <h1>Cadastrar Informações</h1>
                <div class="paciente_nome">
                    <p>Nome do Paciente:</p>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="comestiveis">Comestíveis:</label>
                    <input type="text" id="comestiveis" name="comestiveis" required>
                </div>
                <div class="form-group">
                    <label for="tangiveis">Tangíveis:</label>
                    <input type="text" id="tangiveis" name="tangiveis" required>
                </div>
                <div class="form-group">
                    <label for="nome">Físico:</label>
                    <input type="text" id="fisico" name="fisico" required>
                </div>
                <div class="form-group">
                    <label for="atividades">Atividades:</label>
                    <input type="text" id="atividades" name="atividades" required>
                </div>

                <div class="formgroup_pequenosinputs">
                    <input type="number" id="altura" name="altura" placeholder="Altura:">
                    <input type="number" id="peso" name="peso" placeholder="Peso:">
                    <input type="data" id="data" name="data_neuro" placeholder="Cons.Neuro">
                    <input type="text" id="alergia" name="alergia" placeholder="Alérgico(a) à:">
                </div>

                <button type="submit" class="btn_cadastrarinformacoes">Cadastrar</button>
            </form>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}
.main_content {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.paciente_nome {
    font-size: 18px;
    color: #7E7E7E; 
    font-weight: bold;
}

.container_cadastrarinformacoes {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_cadastrarinformacoes h1 {
    color: #84E7FF;
    margin-bottom: 20px;
}

form {
    display: grid;
    gap: 30px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.btn_cadastrarinformacoes{
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
}

.formgroup_pequenosinputs {
    display: flex;
    gap: 20px; /* Espaçamento entre os inputs */
    margin-top: 7px;
}

.formgroup_pequenosinputs input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

input::placeholder {
    color: black;
    font-size: 15px;
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Swal from 'sweetalert2';

export default {
    name: 'registrarconsulta',
    components: {
        Sidebar
    },
    data() {
        return {
            email: '',
            imagem: null,
            foto: null,
        }
    },
    methods:{
        async cadastrarInformacoes(){
            try{
                // Gera um identificador único para a imagem
                const uniqueImageName = uuidv4() + '_' + this.imagem.name;
                // Cria uma referência para o armazenamento
                const storageRef = ref(storage, 'laudos/' + uniqueImageName);
                // Faz o upload da imagem
                const snapshot = await uploadBytes(storageRef, this.imagem);
                // Obtém a URL pública da imagem
                this.foto = await getDownloadURL(snapshot.ref);
            }
            catch{
                this.foto = null
            }
            try {
                // Envia os dados do paciente para o backend
                await Axios.post(`https://clinica-maria-luiza.onrender.com/cadastrar/pacientes`, {
                    paciente: {
                        cpf: this.cpf,
                        nome: this.nome,
                        nome_mae: this.nome_mae,
                        data_nascimento: this.data_nascimento,
                        email: this.email,
                        telefone: this.telefone,
                        endereco: this.endereco,
                        foto: this.foto, 
                        tipo_paciente: this.tipo_paciente 
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    console.log(response.status)
                    Swal.fire({
                        icon: 'success',
                        title: 'Cadastrado com sucesso',
                        timer: 8000,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    if (this.tipo_paciente === 'Paciente externo') {
                        this.$router.push('/pacientes');
                    } else if (this.tipo_paciente === 'Paciente ABA') {
                        this.$router.push('/cadastrarinformacoes');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tipo de paciente não especificado',
                            timer: 4000,
                        });
                        console.error('Tipo de paciente desconhecido');
                    }
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o cadastro',
                    text: error.response.data.message,
                    timer: 4000,
                });
            }
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