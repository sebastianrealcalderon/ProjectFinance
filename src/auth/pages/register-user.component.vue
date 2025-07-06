

<script>
import {AuthApiService} from "@/auth/services/api-auth.service.js";
import {User} from "@/auth/model/user.entity.js";

export default {
  name: 'LoginComponent',
  data() {
    return {
      firstName:'',
      lastName:'',
      role: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      const newUser = new User({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: this.role
      });

      console.log("Nuevo usuario:", newUser);

      if (!this.firstName,!this.lastName,!this.email || !this.password || !this.role) {
        console.error("Por favor, complete todos los campos.");
        this.errorMessage = "Por favor, complete todos los campos.";
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        console.error("El email no es válido.");
        this.errorMessage = "El email no es válido.";
        return;
      }

      if (this.password.length < 6) {
        console.error("La contraseña debe tener al menos 6 caracteres.");
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      try {

        const response  = await AuthApiService.register(newUser);

        if (response ) {
          this.$router.push({ name: 'login' });
        } else {
          this.errorMessage = "Hubo un error al intentar registrarse.";
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        this.errorMessage = error.message || "Hubo un error al intentar registrarse";
      }
    }
  }
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
              <option value="emisor">Emisor</option>
              <option value="bonista">Bonista</option>
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

.login-container {
  background-image: url("../../assets/fondo-login.png");
  background-size:cover ;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;


}

.login-card {
  display: flex;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 50%;
  max-width: 800px;
}

.login-card-image {
  flex: 1;
  background-color:#0C24A1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
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
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-field label {
  font-weight: bold;
}

.p-field input,
.p-field select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.p-field input:focus,
.p-field select:focus {
  outline: none;
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #0C24A1;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0C24A1;
}


.forgot-password a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
