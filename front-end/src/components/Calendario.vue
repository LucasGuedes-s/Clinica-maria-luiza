<template>
  <div class="calendar-container">
    <VCalendar 
      is-expanded 
      :columns="colunas"
      :attributes="eventosComFeriados" 
    />
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    agendamentos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const colunas = ref(window.innerWidth <= 768 ? 1 : 2);
    const feriados = ref([]);

    // Mantém a lógica original dos agendamentos
    const processarData = (dataStr) => {
      const date = new Date(dataStr);
      date.setHours(0, 0, 0, 0); // Garante que a data fique fixa no dia correto
      return date;
    };
    
    const processarDataFeriado = (dataStr) => {
      const [year, month, day] = dataStr.split('-').map(Number);
      return new Date(year, month - 1, day); // Criação direta no fuso local
    };

    // Feriados locais adicionados manualmente
    const feriadosLocais = [
      { date: "2025-04-11", name: "Emancipação política - feriado municipal em Acari" },
      { date: "2025-08-15", name: "Feriado municipal" },
      { date: "2025-10-03", name: "Mártires de Cunhaú e Uruaçu - feriado estadual" }

    ];

    const carregarFeriadosLocais = () => {
      feriadosLocais.forEach(feriado => {
        feriados.value.push({
          date: processarDataFeriado(feriado.date),
          name: feriado.name,
        });
      });
    };

    // Buscar feriados da Brasil API e corrigir as datas sem mudança de fuso
    const fetchFeriados = async () => {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/2025`);
        if (!response.ok) {
          throw new Error('Erro ao buscar feriados');
        }
        const data = await response.json();
        feriados.value = data.map(feriado => ({
          date: processarDataFeriado(feriado.date), // Mantém o dia correto
          name: feriado.name,
        }));
        carregarFeriadosLocais(); // Carregar feriados locais após os nacionais
      } catch (error) {
        console.error(error);
      }
    };

    // Processamento dos agendamentos mantendo a lógica original
    const eventosTratados = computed(() => {
      return props.agendamentos.map((agendamento) => {
        const data = processarData(agendamento.data);
        const color = agendamento.status === 'Concluida' ? 'green' : 'blue';
        return {
          key: agendamento.id,
          dates: data,
          highlight: { color, fillMode: 'light' },
          popover: {
            label: `Agendamento com ${agendamento.profissional?.nome || 'Profissional'}`,
          },
        };
      });
    });

    // Adiciona os feriados sem modificar os agendamentos
    const eventosComFeriados = computed(() => {
      return [
        ...eventosTratados.value,
        ...feriados.value.map((feriado, index) => ({
          key: `feriado-${index}`,
          dates: feriado.date,
          highlight: { color: 'red', fillMode: 'solid' },
          popover: { label: feriado.name },
        })),
      ];
    });

    // Atualizar colunas para exibição responsiva
    const atualizarColunas = () => {
      colunas.value = window.innerWidth <= 768 ? 1 : 2;
    };

    onMounted(() => {
      fetchFeriados();
      window.addEventListener('resize', atualizarColunas);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', atualizarColunas);
    });

    return { eventosComFeriados, colunas };
  },
};
</script>

<style scoped>
.calendar-container {
  width: 50%;
  max-width: 500px;
  margin: 5px;
}
</style>

