<script>
import Navbar from "@/public/components/toolbar.vue";

export default {
  components: {
    Navbar,
  },
  computed: {
    showToolbar() {
      // Mostrar el Toolbar solo si la ruta activa no es "login" ni "register"
      return this.$route.name !== "login" && this.$route.name !== "register";
    }
  }
};

</script>

<template>
  <div>
    <!-- Mostrar el Toolbar solo si la ruta no es Login ni Register -->
    <navbar v-if="showToolbar" />

    <!-- Renderizar las rutas hijas -->
    <router-view />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
