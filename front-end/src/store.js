import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    usuario: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.usuario,
    getToken: (state) => state.token,
  },
  actions: {
    setAuthData(user, token) {
      this.usuario = user;
      this.token = token;
      // Salvar no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(user));
    },
    clearAuthData() {
      this.usuario = null;
      this.token = null;
      // Remover do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    },
    login(user, token) {
      this.setAuthData(user, token);
    },
    logout() {
      this.clearAuthData();
    },
    loadFromLocalStorage() {
      // Carregar dados do localStorage
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('usuario'));
      if (token && user) {
        this.setAuthData(user, token);
      }
    },
  },
});
