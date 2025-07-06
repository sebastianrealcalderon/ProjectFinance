

<script>
import {AuthApiService} from "@/auth/services/api-auth.service.js";

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const apiAuthService = new AuthApiService();
        const userData = await apiAuthService.login(this.email, this.password);
        const user = userData ? userData : null;

        if (user) {
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          if (user.role === 'emisor') {
            this.$router.push({ name: 'emisorBonoList' });
          }else {
            this.$router.push({ name: 'analisis-bono' });
          }
        } else {
          this.errorMessage = "Correo o contraseña incorrectos.";
        }
      } catch (error) {
        this.errorMessage = error.message || 'Hubo un error al intentar iniciar sesión';
      }
    },
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
        <h3>Iniciar Sesión</h3>
        <form @submit.prevent="handleLogin">
          <div class="p-field">
            <label for="fullName">Nombre Completo</label>
            <pv-inputText
                id="fullName"
                type="text"
                v-model="email"
                class="p-inputText p-component"
                placeholder="Email"
                required
            />
          </div>
          <div class="p-field">
            <label for="password">Contraseña</label>
            <pv-inputText
                id="password"
                type="password"
                v-model="password"
                class="p-inputText p-component"
                placeholder="********"
                required
            />
          </div>
         <!-- <div class="p-field">
            <label for="userType">Tipo de usuario</label>
            <select v-model="userType" class="p-inputText p-component">
              <option value="bonista">Bonista</option>
              <option value="inversor">Inversor</option>
            </select>
          </div>-->
          <div class="p-d-flex p-jc-between">
            <pv-button type="submit" label="Log In" class="p-button p-button-primary" />
          </div>
          <p class="forgot-password">
            ¿No tienes una Cuenta?
            <router-link to="/register">Regístrate aquí</router-link>
          </p>
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
</style>
