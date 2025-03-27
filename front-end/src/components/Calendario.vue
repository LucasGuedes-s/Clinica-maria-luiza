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
      // Cria um objeto Date a partir da string recebida
      const date = new Date(dataStr);

      // Zera a hora para 00:00:00, mantendo a data intacta
      date.setHours(0, 0, 0, 0);

      return date;
    };

    // Converte os agendamentos recebidos para o formato do calendário
    const eventosTratados = computed(() => {
      if (!props.agendamentos || !Array.isArray(props.agendamentos)) {
        return []; // Se não for um array válido, retorna um array vazio
      }

      return props.agendamentos.map((agendamento) => {
        const data = processarData(agendamento.data); // Processa a data e zera a hora

        return {
          key: agendamento.id,
          dates: data, // Cria a data corretamente
          highlight: { color: 'blue', fillMode: 'light' },
          popover: {
            label: `Consulta com ${agendamento.profissional?.nome || 'Profissional'}`,
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
