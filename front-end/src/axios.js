import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  //baseURL: 'https://clinica-maria-luiza-bjdd.onrender.com',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.error) {
      console.error("Erro da API:", error.response.data.message);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.response.data.message || 'Ocorreu um erro inesperado.'
      });
    } else {
      console.error("Erro inesperado:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Verifique sua internet e tente novamente.'
      });
    }
    return Promise.reject(error);
  }
);

export default api;
