<script>
import {BonoApiService} from "@/finance/services/bono-api.service.js";
import {BonoComplete} from "@/finance/model/bonoComplete.entity.js";

export default {
  name: "emisor-bono-list",
  data(){
    return {
      bonos:[],
      user:null
    }
  },

  mounted() {
    this.getLoginUser();  // Asegúrate de que el usuario se obtenga al montar el componente
  },

  methods:{
    getLoginUser() {
      const userStr = localStorage.getItem('user');
      console.log("User del localStorage:", userStr);

      if (userStr) {
        this.user = JSON.parse(userStr); // Guardamos el usuario en 'user'
        console.log("Usuario logueado:", this.user);  // Verifica que user tenga el ID correctamente
        console.log("Emisor ID:", this.user.id); // Verifica el emisorId
        this.getBonos(this.user.id); // Llamamos a la función para obtener los bonos del usuario
      } else {
        console.log("No hay usuario logueado, redireccionando al login ..");
        this.$router.push('/login');  // Redirige si no hay usuario logueado
      }
    },

    getBonos(emisorId) {
      const bonoService = new BonoApiService();
      bonoService.getBonosByEmisorId(emisorId)  // Llamamos al servicio pasando el emisorId
          .then(bonos => {
            console.log("Bonos Cargados:", bonos);  // Verifica que bonos sea un array y tenga datos
            if (bonos && bonos.length > 0) {
              this.bonos = bonos.map(bono => new BonoComplete(bono));  // Asignamos los bonos al array 'bonos'
            } else {
              console.warn("No se encontraron bonos para este emisor");
              this.bonos = [];  // Si no hay bonos, vaciamos la lista
            }
          })
          .catch(error => {
            console.error("Error cargando los bonos", error);  // Mostramos el error si no se obtienen los bonos
          });
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
            const emisorId = this.user.id; // Obtienes el emisorId del usuario logueado
            this.getBonos(emisorId);  // Llamas a getBonos pasando el emisorId
            alert("Bono eliminado correctamente.");
          })
          .catch(error => {
            console.log("Error al eliminar el bono", error);
            alert("Hubo un error al eliminar el bono.");
          });
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
        <td>{{ bono.nombreBono }}</td>
        <td>{{ bono.inputData.tipoDeMoneda }}</td>
        <td>{{ bono.inputData.valorNominal }}</td>
        <td>{{ bono.inputData.valorComercial }}</td>
        <td>{{ bono.inputData.fechaEmision }}</td>
        <td>{{ bono.outputData?.tcea }}</td>
        <td>
          <!-- Aquí puedes agregar botones para editar y eliminar -->
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