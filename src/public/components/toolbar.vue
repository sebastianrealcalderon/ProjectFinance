<script>

export default {
  name: "navbar",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null  // Obtener el usuario desde localStorage
    };
  },
  methods: {
    logout() {
      // Eliminar el usuario de localStorage y redirigir al login
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
}

</script>

<template>
  <nav class="navbar">
    <!-- Logo a la izquierda (texto BondAnalytics) -->
    <div class="navbar-left">
      <span class="logo">BondAnalytics</span>
    </div>

    <!-- Usuario y botón de cerrar sesión a la derecha -->
    <div class="navbar-right">
      <span class="username">{{ user ? user.lastName : 'Invitado' }}</span> <!-- Mostrar nombre de usuario o "Invitado" -->
      <button @click="logout" class="logout-button">Cerrar sesión</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1e2a4d; /* Azul oscuro */
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white; /* Logo en blanco */
}

.navbar-right {
  display: flex;
  align-items: center;
}

.username {
  margin-right: 20px;
  font-size: 1.2rem;
}

.logout-button {
  background-color: #f44336; /* Rojo para el botón de cerrar sesión */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>