<template>
  <div class="calendar-container">
    <VCalendar is-expanded :columns="2" :attributes="eventosTratados" />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    agendamentos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // Função para tratar a data e zerar a hora
    const processarData = (dataStr) => {
      const date = new Date(dataStr);
      date.setHours(0, 0, 0, 0);
      return date;
    };

    // Converte os agendamentos recebidos para o formato do calendário
    const eventosTratados = computed(() => {
      if (!props.agendamentos || !Array.isArray(props.agendamentos)) {
        return [];
      }

      return props.agendamentos.map((agendamento) => {
        const data = processarData(agendamento.data);
        
        // Define a cor com base no status do agendamento
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

    return { eventosTratados };
  },
};
</script>

<style scoped>
.calendar-container {
  width: 100%;
  max-width: 900px;
  margin: auto;
}
</style>
