<script>
import {BonoApiService} from "@/finance/services/bono-api.service.js";

export default {
  name: "emisor-bono-list",
  data(){
    return {
      bonos:[],
      user:null
    }
  },
  mounted(){
    this.getLoginUser();
  },
  methods:{
    getLoginUser(){
      const userStr = localStorage.getItem('user');
      if(userStr){
        this.user=JSON.parse(userStr);
        console.log("Usuario Logueado",this.user);
        this.getBonos();
      }else {
        console.log("No hay usuario Logueado, redireccionando al login ..")
        this.$router.push('/login');
      }
    },
    getBonos(){
      console.log("UserId del usuario logueado:", this.user.id);
      if(this.user && this.user.id){
        const bonoService= new BonoApiService();
        bonoService.getBonosByUserId(this.user.id)
        .then(bonos=>{
          console.log("Bonos Cargados:",bonos);
          if (bonos.length === 0) {
            console.warn("No se encontraron bonos para este usuario");
          }
          this.bonos = bonos;
        })
        .catch(error=>{
          console.log("Error cargando los bonos",error);
        })
      }else {
        console.log("No se pudo obtener bonos...")
      }
    },
    newBonoButton(){
      this.$router.push('/analisis-bono');
    },
    eliminarBono(id){
      const bonoService = new BonoApiService();
      bonoService.deleteBono(id)
          .then(response => {
            console.log("Bono eliminado correctamente:", response);
            // Después de eliminar, actualizamos la lista de bonos
            this.getBonos();
            alert("Bono eliminado correctamente.");
          })
          .catch(error => {
            console.log("Error al eliminar el bono", error);
            alert("Hubo un error al eliminar el bono.");
          });
    },
    actualizarBono(bono) {
      // Esta función se llama cuando se desea editar el bono
      // Debes mostrar el formulario de edición con los datos del bono
      this.$router.push({ name: 'analisis-bono', params: { bono: bono } });
    },
  }
}
</script>

<template>
  <div class="container">
    <h2>Mis Bonos Emitidos</h2>
    <!-- Botón para crear un nuevo bono -->
    <button @click="newBonoButton" class="nuevo-bono-button">+ Nuevo Bono</button>

    <!-- Si no hay bonos, muestra un mensaje -->
    <div v-if="bonos.length === 0">
      <p>No tienes bonos registrados. ¡Crea uno nuevo!</p>
    </div>

    <!-- Tabla de bonos -->
    <table class="bonos-table" v-else>
      <thead>
      <tr>
        <th>Nombre del Bono</th>
        <th>Moneda</th>
        <th>Valor Nominal</th>
        <th>Valor Comercial</th>
        <th>Fecha Emisión</th>
        <th>TCEA</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <!-- Iterar sobre los bonos y mostrarlos -->
      <tr v-for="bono in bonos" :key="bono.id">
        <td>{{ bono.inputData.nombreBono }}</td>
        <td>{{ bono.inputData.moneda }}</td>
        <td>{{ bono.inputData.valorNominal }}</td>
        <td>{{ bono.inputData.valorComercial }}</td>
        <td>{{ bono.inputData.fechaEmision }}</td>
        <td>{{ bono.outputData?.tcea }}</td>
        <td>
          <!-- Aquí puedes agregar botones para editar y eliminar -->
          <button @click="actualizarBono(bono)">Editar</button>
          <button @click="eliminarBono(bono.id)">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
.nuevo-bono-button {
  margin-bottom: 20px;
  background-color: #0C24A1;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.nuevo-bono-button:hover {
  background-color: #0a1e8f;
}
.bonos-table {
  width: 100%;
  border-collapse: collapse;
}
.bonos-table th, .bonos-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.bonos-table th {
  background-color: #f2f2f2;
}
button {
  margin: 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>