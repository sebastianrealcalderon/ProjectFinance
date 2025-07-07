<script>
import { BonoApiService } from "@/finance/services/bono-api.service.js";
import {BonoComplete} from "@/finance/model/bonoComplete.entity.js";

export default {
  name: "bonista-bono-detalle",
  data() {
    return {
      bono: null,
      isLoading: true,
    };
  },
  mounted() {
    const bonoId = this.$route.params.id;
    this.getBonoById(bonoId);
  },
  methods: {
    getBonoById(id) {
      const bonoService = new BonoApiService();
      bonoService.getBonoById(id)
          .then((bono) => {
            this.isLoading = false;
            this.bono = new BonoComplete(bono);
            console.log("Bono cargado:", this.bono);
          })
          .catch((error) => {
            console.error("Error al cargar bono:", error);
            this.isLoading = false;
          });
    },
    regresar() {
      this.$router.push('/bonista-bonos-list');
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="title-container">
      <button @click="regresar" class="back-button">&#8592;</button>
      <h2 class="title">Detalle del Bono</h2>
    </div>

    <div v-if="isLoading" class="loading">
      <p>Cargando bono...</p>
    </div>

    <div v-else-if="bono">
      <!-- Mostrar el valor del bono en el título -->
      <section class="section">
        <h3>📊 Valor del Bono: {{ bono.outputData.precioTeorico ? bono.outputData.precioTeorico.toFixed(2) : 'N/A' }}</h3>
      </section>

      <section class="section">
        <h3>📊 Flujo de Caja</h3>
        <table class="table">
          <thead>
          <tr>
            <th>Fecha de Pago</th>
            <th>Amortización</th>
            <th>Interés</th>
            <th>Flujo</th>
            <th>Saldo</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(flujo, index) in bono.outputData.tablaAmortizacion" :key="index">
            <td>{{ flujo.fechaPago || 'N/A' }}</td>
            <td>{{ flujo.amortizacion !== undefined ? flujo.amortizacion.toFixed(2) : 'N/A' }}</td>
            <td>{{ flujo.interes !== undefined ? flujo.interes.toFixed(2) : 'N/A' }}</td>
            <td>{{ flujo.cuotaPeriodo !== undefined ? (-flujo.cuotaPeriodo).toFixed(2) : 'N/A' }}</td>
            <!-- Mostrar saldo o 'N/A' si está vacío -->
            <td>{{ flujo.saldo !== undefined ? flujo.saldo.toFixed(2) : 'N/A' }}</td>

          </tr>

          </tbody>
        </table>
      </section>

      <section class="section metrics">
        <h3>📈 Métricas del Bono</h3>
        <div class="metrics-grid">
          <div class="card"><strong>Precio:</strong> {{ bono.outputData.precioTeorico.toFixed(2) }}</div>
          <div class="card"><strong>Dur. Macaulay:</strong> {{ bono.outputData.duracionMacualay.toFixed(2) }}</div>
          <div class="card"><strong>Convexidad:</strong> {{ bono.outputData.convexidad.toFixed(2) }}</div>
          <div class="card"><strong>TCEA:</strong> {{ bono.outputData.tcea.toFixed(4) }}</div>
          <div class="card"><strong>TREA:</strong> {{ bono.outputData.trea.toFixed(4) }}</div>
        </div>
      </section>
    </div>

    <div v-else>
      <p>No se encontró información del bono.</p>
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
  color: #0c24a1;
}
.back-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #0c24a1;
}
.section {
  margin-top: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: right;
}
.table th {
  background-color: #f2f2f2;
}
.metrics {
  margin-top: 30px;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
}
.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.card strong {
  display: block;
  margin-bottom: 5px;
  color: #0c24a1;
}
.loading p {
  font-size: 1.2rem;
  text-align: center;
}
h3 {
  color: #0c24a1;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
}
</style>
