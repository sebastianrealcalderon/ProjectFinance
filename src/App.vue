<script>
import Navbar from "@/public/components/toolbar.vue";

export default {
  name: "App",
  components: {
    Navbar,  // Componente del navbar
  },
  computed: {
    // Puedes utilizar vuex o localStorage para verificar si el usuario está logueado
    user() {
      return JSON.parse(localStorage.getItem("user")) || null;
    },
  },
};

</script>

<template>
  <div id="app">
    <!-- Verifica si hay un usuario logueado, si es así muestra el navbar -->
    <Navbar v-if="user" />

    <!-- Aquí van las vistas dinámicas -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
