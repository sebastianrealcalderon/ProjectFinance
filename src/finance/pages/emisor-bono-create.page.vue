<script>
  import BonoMetricsComponent from "@/finance/components/bono-metrics.component.vue";
  import BonoForm from "@/finance/components/bono-form.component.vue";
  import BonoMetrics from "@/finance/components/bono-metrics.component.vue";
  import {BonoApiService} from "@/finance/services/bono-api.service.js";

  export default {
    name: "analisis-bono",
    components:{
      BonoMetrics,
      BonoForm,
      BonoMetricsComponent,
    },
    data() {
      return {
        bonoGuardado: {},
        isBonoReady:false,
      };
    },
    methods: {
      // Método que maneja el evento bonoGuardado
      handleBonoGuardado(bono) {
        console.log("Bono recibido en el componente padre:", bono);
        this.bonoGuardado = bono;  // Asigna el bono guardado a bonoGuardado
        this.isBonoReady = true;
        console.log("Bono guardado:", this.bonoGuardado); // Verifica el valor de bonoGuardado
      },
      // Método para regresar a la vista anterior
      regresar() {
        this.$router.push('/emisor-bono-list');  // Regresa a la página anterior
      },
    }
  };

</script>
<template>
  <div class="container">
    <!-- Título con flecha y botón de emitir bono -->
    <div class="title-container">
      <button @click="regresar" class="back-button">&#8592;</button>
      <!-- Título dinámico entre Crear Bono y Actualizar Bono -->
      <h2 class="title">{{ bonoGuardado.id ? 'Actualizar Bono' : 'Crear Bono' }}</h2>
      <!-- Mostrar el botón de emitir bono solo si el bono está listo -->
    </div>

    <div class="row">
      <!-- Formulario del Bono -->
      <div class="col-6">
        <bono-form @guardarBono="handleBonoGuardado" />
      </div>

      <!-- Métricas del Bono -->
      <div class="col-6">
        <!-- Verificar si bonoGuardado es null y mostrar un mensaje en su lugar -->
        <div v-if="!bonoGuardado || !bonoGuardado.outputData">
          <p>No se ha guardado ningún bono. Por favor, complete el formulario primero.</p>
        </div>
        <!-- Si bonoGuardado no es null, mostrar el componente de métricas -->
        <bono-metrics v-if="bonoGuardado" :bono="bonoGuardado" />
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  padding: 20px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.back-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #0c24a1;
}

.emit-button {
  padding: 10px 20px;
  background-color: #0c24a1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.emit-button:hover {
  background-color: #0a1e8f;
}

.row {
  display: flex;
  justify-content: space-between;
}

.col-6 {
  width: 48%;
}
</style>