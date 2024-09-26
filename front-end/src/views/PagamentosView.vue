<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_pagamentos">
        <h1>Pagamentos</h1>
        <div class="container_pagamentos">
            <!-- Itera sobre os pagamentos por mês e ano -->
            <div v-for="(pagamentos, mesAno) in pagamentos" :key="mesAno">
                <h2>{{ mesAno }}</h2>
                <table class="tabela">
                    <thead>
                        <tr>
                            <th>Nome do Paciente:</th>
                            <th>Valor:</th>
                            <th>Data:</th>
                            <th>Tipo de pagamento:</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pagamento in pagamentos" :key="pagamento.id">
                            <td>{{ pagamento.paciente }}</td>
                            <td>{{ pagamento.pagamento.toFixed(2) }}</td>
                            <td>{{ formatDate(pagamento.Data) }}</td>
                            <td>{{ pagamento.tipo_pagamento }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="submit" class="btn-pdf">Gerar PDF</button>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content_pagamentos {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

h2 {
    color: #D9D9D9;
    margin-top: 0;
}

.container_pagamentos {
    background-color: white;
    padding: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    /* Empilha os elementos verticalmente */
    position: relative;
}

.tabela,
th,
td {
    border-collapse: collapse;
    /*define a separação entre as bordar*/
    padding: 10px;
    text-align: left;
    border: 1px solid #D9D9D9;
    color: #7E7E7E
}

.btn-pdf {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
}

@media (max-width: 768px) {
    .main-content_pagamentos {
        margin-left: 0;
    }

    .tabela,
    th,
    td {
        font-size: 14px;
        /* Reduz o tamanho da fonte em telas menores */
    }

    .btn-pdf {
        font-size: 14px;
        /* Ajusta o botão para telas menores */
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store';
import Axios from 'axios';
import { formatDate } from '../utils/formatarData';

export default {
    name: 'pagamentos',
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
            formatDate,
            pagamentos: [],
            pagamentosPorMes: {} // Armazena os pagamentos agrupados por mês

        }
    },
    methods: {
        async getPagamentos() {
            const token = this.store.token

            await Axios.get(`http://localhost:3000/pagamentos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then(response => {
                this.pagamentos = response.data.pagamento
                console.log(this.pagamentos)
            }).catch(error => {
                console.error(error)
            })
        }
    },
    mounted() {
        this.getPagamentos()
    }

}
</script>