import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
      usuario: null
    }
  },
  getters: {
    naoautenticado: (state) => {
      if(state.token === null){
        return true;
      }
      return false;
    },
    pegar_token: (state) =>{
      return state.token;
    }
  }
})
