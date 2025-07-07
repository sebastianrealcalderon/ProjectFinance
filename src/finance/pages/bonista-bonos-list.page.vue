<script>
import { BonoApiService } from "@/finance/services/bono-api.service.js";

export default {
  name: "bonista-bonos-list",
  data() {
    return {
      bonos: []
    };
  },
  mounted() {
    this.getBonos();
  },
  methods: {
    getBonos() {
      const bonoService = new BonoApiService();
      bonoService.getAllBonos()
          .then(bonos => {
            console.log("Bonos cargados para bonista:", bonos);
            this.bonos = bonos;
          })
          .catch(error => {
            console.error("Error cargando los bonos:", error);
          });
    },
    verDetalle(bono) {
      this.$router.push({name: 'bonista-bono-detalle', params: {id: bono.id}});
    }
  },
}
</script>

<template>
  <div class="container">
    <h2>Bonos Emitidos</h2>
    <table class="bonos-table" v-if="bonos.length > 0">
      <thead>
      <tr>
        <th>Nombre del Bono</th>
        <th>Moneda</th>
        <th>Valor Nominal</th>
        <th>Valor Comercial</th>
        <th>Fecha Emisión</th>
        <th>TCEA</th>
        <th>Ver Detalle</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="bono in bonos" :key="bono.id">
        <td>{{ bono.inputData.nombreBono }}</td>
        <td>{{ bono.inputData.moneda }}</td>
        <td>{{ bono.inputData.valorNominal }}</td>
        <td>{{ bono.inputData.valorComercial }}</td>
        <td>{{ bono.inputData.fechaEmision }}</td>
        <td>{{ bono.outputData?.tcea ? (bono.outputData.tcea * 100).toFixed(2) + '%' : 'N/A' }}</td>
        <td><button @click="$router.push({ name: 'bonista-bono-detalle', params: { id: bono.id } })">
          Ver Detalle
        </button></td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No hay bonos disponibles actualmente.</p>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 20px;
}
.bonos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.bonos-table th, .bonos-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.bonos-table th {
  background-color: #0C24A1;
  color: white;
}
button {
  background-color: #0C24A1;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0a1e8f;
}
</style>