<script>
  import BonoMetricsComponent from "@/finance/components/bono-metrics.component.vue";
  import BonoForm from "@/finance/components/bono-form.component.vue";
  import BonoMetrics from "@/finance/components/bono-metrics.component.vue";

  export default {
    name: "analisis-bono",
    components:{
      BonoMetrics,
      BonoForm,
      BonoMetricsComponent,
    },
    data() {
      return {
        bonoGuardado: {},  // Define bonoGuardado en el data
      };
    },
    methods: {
      // Método que maneja el evento bonoGuardado
      handleBonoGuardado(bono) {
        this.bonoGuardado = bono;  // Asigna el bono guardado a bonoGuardado
      }
    }
  };

</script>
<template>
  <div class="container">
    <div class="row">
      <!-- Formulario del Bono -->
      <div class="col-6">
        <BonoForm @bonoGuardado="handleBonoGuardado" />
      </div>

      <!-- Métricas del Bono -->
      <div class="col-6">
        <!-- Verificar si bonoGuardado es null y mostrar un mensaje en su lugar -->
        <div v-if="!bonoGuardado">
          <p>No se ha guardado ningún bono. Por favor, complete el formulario primero.</p>
        </div>
        <!-- Si bonoGuardado no es null, mostrar el componente de métricas -->
        <bono-metrics v-else :bono="bonoGuardado" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
}
.col-6 {
  width: 48%;
}
</style>