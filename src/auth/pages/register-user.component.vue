

<script>
import {AuthApiService} from "@/auth/services/api-auth.service.js";
import {User} from "@/auth/model/user.entity.js";

export default {
  name: 'LoginComponent',
  data() {
    return {
      firstName:'',
      lastName:'',
      role: 'BONISTA',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      // Verificar que todos los campos estén completos
      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.role) {
        this.errorMessage = "Por favor, complete todos los campos.";
        return;
      }

      // Validación básica de email
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.errorMessage = "El email no es válido.";
        return;
      }

      // Validación de la contraseña (mínimo 6 caracteres)
      if (this.password.length < 6) {
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      // Crear un nuevo objeto de usuario
      const newUser = new User({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: this.role,
      });

      try {
        const response = await AuthApiService.register(newUser);
        if (response) {
          this.$router.push({ name: "login" });  // Redirigir a la página de login después del registro
        }
      } catch (error) {
        this.errorMessage = error.message || "Hubo un error al registrar el usuario";
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-image">
        <h2>BondAnalytics</h2>
        <i class="pi pi-wallet custom-icon"></i>
      </div>
      <div class="form-container">
        <h3>Crear una Cuenta</h3>
        <form @submit.prevent="handleRegister">
          <div class="p-field">
            <label for="firstName">Nombre</label>
            <input
                id="firstName"
                type="text"
                v-model="firstName"
                class="p-inputText p-component"
                placeholder="Nombre"
                required
            />
          </div>
          <div class="p-field">
            <label for="lastName">Apellido</label>
            <input
                id="lastName"
                type="text"
                v-model="lastName"
                class="p-inputText p-component"
                placeholder="Apellido"
                required
            />
          </div>
          <div class="p-field">
            <label for="email">Correo Electrónico</label>
            <input
                id="email"
                type="text"
                v-model="email"
                class="p-inputText p-component"
                placeholder="Email"
                required
            />
          </div>
          <div class="p-field">
            <label for="password">Contraseña</label>
            <input
                id="password"
                type="password"
                v-model="password"
                class="p-inputText p-component"
                placeholder="********"
                required
            />
          </div>
          <div class="p-field">
            <label for="role">Tipo de usuario</label>
            <select v-model="role" class="p-inputText p-component">
              <option value="EMISOR">EMISOR</option>
              <option value="BONISTA">BONISTA</option>
            </select>
          </div>
          <div class="p-d-flex p-jc-between">
            <button type="submit" class="p-button p-button-primary">Registrarse</button>
          </div>
          <div v-if="errorMessage" class="p-error">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Animación de entrada para el formulario */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de la tarjeta de login al cargar */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Animación para resaltar los campos de input */
@keyframes inputFocus {
  0% {
    transform: scale(1);
    border-color: #007bff;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Animación de sacudida para los mensajes de error */
@keyframes shake {
  0% {
    transform: translateX(-5px);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

/* Estilo general de la pantalla de login */
.login-container {
  background-image: url("../../assets/fondo-login.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

/* Estilo de la tarjeta de login */
.login-card {
  display: flex;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 50%;
  max-width: 800px;
  animation: slideIn 0.5s ease-out;
}

.login-card-image {
  flex: 1;
  background-color: #0C24A1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  animation: fadeIn 1s ease-out;
}

.custom-icon {
  font-size: 8rem;
}

h2 {
  margin-top: 15px;
  font-size: 2rem;
}

.form-container {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #0C24A1;
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-field label {
  font-weight: bold;
}

/* Inputs y selectores */
.p-field input,
.p-field select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.p-field input:focus,
.p-field select:focus {
  outline: none;
  border-color: #007bff;
  animation: inputFocus 0.3s ease-out;
}

/* Estilo para el botón */
button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #0C24A1;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0b1a7e;
  transform: scale(1.05);
}

/* Estilo de los enlaces de recuperación de contraseña */
.forgot-password {
  text-align: center;
  margin-top: 10px;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* Estilo del mensaje de error */
.p-error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  animation: shake 0.5s ease-out;
}

</style>
