<script>

export default {
  name: "bono-metrics",
  props: {
    bono: {
      type: Object,
      required: true
    }// Recibe los datos del bono como prop
  },
  data() {
    return {
      view: 'flujoCaja'
    };
  },

  methods: {
    selectView(view) {
      this.view = view;
    },
  }
};
</script>

<template>
  <div class="metrics-container">
    <h2 class="metrics-title">Métricas del Bono</h2>

    <!-- Barra de navegación para seleccionar entre flujo de caja o métricas -->
    <div class="navbar">
      <button @click="selectView('flujoCaja')">Flujo de Caja</button>
      <button @click="selectView('metrics')">Métricas del Bono</button>
    </div>

    <!-- Mostrar flujo de caja solo si bono.outputData y bono.outputData.flujoCaja están disponibles -->
    <div v-if="view === 'flujoCaja' && bono.outputData && bono.outputData.flujoCaja && bono.outputData.flujoCaja.length > 0">
      <h3>Flujo de Caja</h3>
      <table class="table">
        <thead>
        <tr>
          <th>Periodo</th>
          <th>Amortización</th>
          <th>Interés</th>
          <th>Flujo</th>
          <th>Saldo</th>
          <th>Valor Presente</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(flujo, index) in bono.outputData.flujoCaja" :key="index">
          <td>{{ flujo.periodo }}</td>
          <td>{{ flujo.amortizacion.toFixed(2) }}</td>
          <td>{{ flujo.interes.toFixed(2) }}</td>
          <td>{{ flujo.flujo.toFixed(2) }}</td>
          <td>{{ flujo.saldo.toFixed(2) }}</td>
          <td>{{ flujo.valorPresente.toFixed(2) }}</td>
        </tr>
        </tbody>
      </table>

      <!-- Mostrar el Precio del Bono (Valor Presente Total) -->
      <div v-if="bono.outputData.precioTeorico !== undefined">
        <h3>Precio del Bono (Valor Presente Total): {{ bono.outputData.precioTeorico.toFixed(2) }}</h3>
      </div>
    </div>

    <!-- Mostrar métricas del bono solo si bono.outputData está definido -->
    <div v-if="view === 'metrics' && bono.outputData">
      <h3>Métricas del Bono</h3>
      <div class="metric">
        <strong>Cuota Constante:</strong> {{ bono.outputData.cuotaConstante.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>Precio del Bono:</strong> {{ bono.outputData.precioTeorico.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>VAN (Valor Actual Neto):</strong> {{ bono.outputData.van.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>Duración Macaulay:</strong> {{ bono.outputData.duracionMacaulay.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>Duración Modificada:</strong> {{ bono.outputData.duracionModificada ? bono.outputData.duracionModificada.toFixed(2) : "N/A" }}
      </div>
      <div class="metric">
        <strong>Convexidad:</strong> {{ bono.outputData.convexidad.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>TCEA:</strong> {{ bono.outputData.tcea.toFixed(2) }}
      </div>
      <div class="metric">
        <strong>TREA:</strong> {{ bono.outputData.trea.toFixed(2) }}
      </div>
    </div>

    <!-- Mostrar un mensaje si no hay datos disponibles -->
    <div v-else>
      <p>No hay datos disponibles. Por favor, ingrese todos los datos en el formulario.</p>
    </div>

  </div>
</template>


<style scoped>
.metrics-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.metrics-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.navbar button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #0c24a1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #0a1e8f;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: right;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.metric {
  margin-bottom: 15px;
  font-size: 1rem;
}

.metric strong {
  font-weight: bold;
}

.metrics {
  margin-top: 20px;
}

.metrics-container p {
  text-align: center;
  color: #555;
}
</style>