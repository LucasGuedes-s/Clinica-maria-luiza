<template>
    <div class="calendar-container">
      <VCalendar 
        is-expanded
        :columns="2" 
        :attributes="eventos"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/store';
  import { parseISO } from 'date-fns';
  
  export default {
    setup() {
      const eventos = ref([]);
      const store = useAuthStore()
  
      // Função para buscar os agendamentos do backend
      const buscarAgendamentos = async () => {
        try {
            const token = store.token
            const user = this.store.usuario.usuario
            const email = user.email

          const response = await axios.get(`https://clinica-maria-luiza-bjdd.onrender.com/profissionais/agendamentos/${email}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
          });
          eventos.value = response.data.agenda.map((agendamento) => {
            const [day, month, year] = agendamento.dataFormatada.split('/'); // Divide a data pelo "/"
  
            return {
              key: agendamento.id,
              dates: new Date(Number(year), Number(month) - 1, Number(day)), // Cria a data corretamente
              highlight: { color: 'blue', fillMode: 'light' },
              popover: {
                label: `Consulta com ${agendamento.profissional?.nome || 'Profissional'}`
              }
            };
          });
  
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
        }
      };
  
      onMounted(buscarAgendamentos);
  
      return { eventos };
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    width: 100%;  /* Faz o calendário ocupar toda a largura */
    max-width: 900px; /* Define um limite para não ficar muito grande */
    margin: auto; /* Centraliza o calendário */
  }
  </style>
  