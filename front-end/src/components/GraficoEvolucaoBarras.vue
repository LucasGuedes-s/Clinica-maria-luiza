<template>
    <div class="titulo">
        <h1>Gráfico de barras</h1>
    </div>
    <div>
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
import Axios from 'axios';
import { formatDate } from '@/utils/formatarData';

export default {
    props: {
        dado: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const consultas = ref([]);
        const chart = ref(null);

        const fetchConsultas = async () => {
            const cpf = props.dado;
            try {
                const response = await Axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/consultasAba/paciente/${cpf}`);
                consultas.value = response.data.consultas.slice(0, 15);
                updateChart();
            } catch (error) {
                console.error(error);
            }
        };

        const processData = () => {
            const labels = consultas.value.map(consulta => formatDate(consulta.data));
            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Aplicacao1',
                        backgroundColor: 'rgba(247, 121, 121, 0.5)',
                        borderColor: 'rgba(247, 121, 121, 1)',
                        borderWidth: 1,
                        data: consultas.value.map(consulta => mapResultToNumber(consulta.Aplicacao1)),
                    },
                    {
                        label: 'Aplicacao2',
                        backgroundColor: 'rgba(121, 247, 121, 0.5)',
                        borderColor: 'rgba(121, 247, 121, 1)',
                        borderWidth: 1,
                        data: consultas.value.map(consulta => mapResultToNumber(consulta.Aplicacao2)),
                    },
                    {
                        label: 'Aplicacao3',
                        backgroundColor: 'rgba(121, 121, 247, 0.5)',
                        borderColor: 'rgba(121, 121, 247, 1)',
                        borderWidth: 1,
                        data: consultas.value.map(consulta => mapResultToNumber(consulta.Aplicacao3)),
                    },
                    {
                        label: 'Aplicacao4',
                        backgroundColor: 'rgba(247, 247, 121, 0.5)',
                        borderColor: 'rgba(247, 247, 121, 1)',
                        borderWidth: 1,
                        data: consultas.value.map(consulta => mapResultToNumber(consulta.Aplicacao4)),
                    },
                    {
                        label: 'Aplicacao5',
                        backgroundColor: 'rgba(121, 247, 247, 0.5)',
                        borderColor: 'rgba(121, 247, 247, 1)',
                        borderWidth: 1,
                        data: consultas.value.map(consulta => mapResultToNumber(consulta.Aplicacao5)),
                    },
                ],
            };
        };

        const mapResultToNumber = (result) => {
            switch (result) {
                case 'AT +': return 3;
                case 'AT -': return 1;
                case 'AT + /': return 4;
                case 'AP +': return 6;
                case 'AP -': return 5;
                case 'AP + /': return 7;
                case 'SA +': return 9;
                case 'SA -': return 8;
                case 'SA + /': return 10;
                default: return 0;
            }
        };

        const updateChart = () => {
            const ctx = document.getElementById('barChart').getContext('2d');
            if (chart.value) {
                chart.value.destroy();
            }
            chart.value = new Chart(ctx, {
                type: 'bar',
                data: processData(),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Datas',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Avaliação',
                            },
                            beginAtZero: true,
                            suggestedMax: 10,
                        },
                    },
                },
            });
        };

        onMounted(() => {
            fetchConsultas();
        });

        return {
            consultas,
            updateChart,
        };
    },
};
</script>

<style>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
    display: block;
}
.titulo {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}
.titulo h1 {
    color: #D9D9D9;
}
#barChart {
    background-color: white;
}
</style>