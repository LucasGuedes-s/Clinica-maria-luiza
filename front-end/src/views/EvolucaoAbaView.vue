<template>
    <div><Sidebar /></div>
    <div>
        <GraficoEvolucao :dado="cpf"/>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';

export default {
    name: 'historicodeconsulta',
    mounted() {
        // Limpar o CPF do sessionStorage após uso
        sessionStorage.removeItem('cpf');
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        Sidebar,
        GraficoEvolucao
    }
}
</script>

<style>
</style>
