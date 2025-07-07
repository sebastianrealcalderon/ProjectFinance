<script>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import {BonoApiService} from "@/finance/services/bono-api.service.js";
import {Bono} from  "@/finance/model/bono.entity.js"
import {BonoComplete} from "@/finance/model/bonoComplete.entity.js";

export default {
  name: 'bono-form',
  data() {
    return {
      monedas: [
        { label: 'PEN - Sol', value: 'PEN' },
        { label: 'USD - Dólar', value: 'USD' },
        { label: 'EUR - Euro', value: 'EUR' }
      ],
      frecuenciasPago: ['DIARIA', 'MENSUAL', 'BIMESTRAL','TRIMESTRAL','CUATRIMESTRAL', 'ANUAL'],
      tiposTasa: ['NOMINAL','EFECTIVA',],
      capitalizacionOpciones: ['DIARIA', 'MENSUAL', 'BIMESTRAL','TRIMESTRAL','CUATRIMESTRAL', 'ANUAL'],
      bonoApiService: new BonoApiService(),
      newBono:{
        nombreBono: "",
        userId: null,  // userId se obtendrá dinámicamente
        inputData: {
          valorNominal: 0,
          valorComercial: 0,
          tipoDeMoneda: "PEN",
          periodos: 1,
          frecuenciaDePago: "ANUAL",
          tipoDeTasa: "EFECTIVA",
          tasaInteres: 0,
          capitalizacion: "Anual",
          plazoGraciaTotal: 0,
          plazoGraciaParcial: 0,
          fechaEmision: new Date(),
          gastosFinales: 0,
          gastosIniciales: 0,
          impuestoRenta: 0
        }
      },
    }
  },
  methods: {
    // Guardar bono con todos los cálculos
    guardarBono() {
      // Asegúrate de que el emisorId esté disponible en el componente
      const userStr = localStorage.getItem("user");

      if (userStr) {
        const user = JSON.parse(userStr);
        this.newBono.userId = user.id; // Asignar el userId desde localStorage
        this.newBono.nombreBono = "Prueba 3";  // Asignar el nombre del bono
      } else {
        console.warn("No hay usuario logueado, redireccionando al login...");
        this.$router.push({ name: 'login' });  // Redirige si no hay usuario logueado
      }

      // Verifica los valores de emisorId y nombreBono
      console.log("EmisorId:", this.newBono.userId);  // Deberías ver el ID del usuario aquí
      console.log("Nombre del Bono:", this.newBono.nombreBono);

      if (!this.newBono.inputData.frecuenciaDePago) {
        console.error("Frecuencia de pago no seleccionada.");
        return;  // Salir si no está definida
      }

      const bono = new Bono({
        nombreBono: this.newBono.nombreBono, // Asignar el nombre del bono
        emisorId: this.newBono.userId,  // Asignar el emisorId al bono
        inputData: this.newBono.inputData, // Otros datos necesarios
      });

      console.log("Datos que se enviarán al backend:", bono.toBackendFormat());

      // Llamar al servicio para guardar el bono
      this.bonoApiService.guardarBono(this.newBono.userId, bono)  // Paso emisorId y bono al servicio
          .then(response => {
            console.log("Bono guardado exitosamente:", response);
            this.$emit("guardarBono",response );// Redirigir a la lista de bonos
            console.log("Datos de entrada enviados:", response);
          })
          .catch(error => {
            console.error("Error al guardar el bono:", error);
            this.errorMessage = "Hubo un error al guardar el bono";
          });
    },

  }
};
</script>
<template>
  <div class="form-container">
    <h2 class="form-title">Crear un Nuevo Bono</h2>
    <form @submit.prevent="guardarBono" class="form-content">

      <!-- Nombre del Bono -->
      <div class="p-field">
        <label for="nombreBono">Nombre del Bono</label>
        <input
            id="nombreBono"
            type="text"
            v-model="newBono.nombreBono"
            class="p-inputText p-component"
            placeholder="Nombre del Bono"
            required
        />
      </div>

      <!-- Valor Nominal -->
      <div class="p-field">
        <label for="valorNominal">Valor Nominal</label>
        <input
            id="valorNominal"
            type="number"
            v-model.number="newBono.inputData.valorNominal"
            class="p-inputText p-component"
            placeholder="Valor Nominal"
            required
        />
      </div>

      <!-- Valor Comercial -->
      <div class="p-field">
        <label for="valorComercial">Valor Comercial</label>
        <input
            id="valorComercial"
            type="number"
            v-model.number="newBono.inputData.valorComercial"
            class="p-inputText p-component"
            placeholder="Valor Comercial"
            required
        />
      </div>

      <!-- Moneda -->
      <div class="p-field">
        <label for="moneda">Moneda</label>
        <select v-model="newBono.inputData.tipoDeMoneda" class="p-inputText p-component">
          <option v-for="moneda in monedas" :key="moneda.value" :value="moneda.value">
            {{ moneda.label }}
          </option>
        </select>
      </div>

      <!-- Número de Periodos -->
      <div class="p-field">
        <label for="nroPeriodos">Número de Periodos</label>
        <input
            id="nroPeriodos"
            type="number"
            v-model="newBono.inputData.periodos"
            class="p-inputText p-component"
            placeholder="Número de Periodos"
            required
        />
      </div>

      <!-- Frecuencia de Pago -->
      <div class="p-field">
        <label for="frecuenciaPago">Frecuencia de Pago</label>
        <select v-model="newBono.inputData.frecuenciaDePago" class="p-inputText p-component">
          <option v-for="item in frecuenciasPago" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <!-- Tipo de Tasa -->
      <div class="p-field">
        <label for="tipoTasa">Tipo de Tasa</label>
        <select v-model="newBono.inputData.tipoDeTasa" class="p-inputText p-component">
          <option v-for="tipo in tiposTasa" :key="tipo" :value="tipo">
            {{ tipo }}
          </option>
        </select>
      </div>

      <!-- Capitalización -->
      <div class="p-field">
        <label for="capitalizacion">Capitalización</label>
        <select v-model="newBono.inputData.capitalizacion" class="p-inputText p-component">
          <option v-for="capitalizacion in capitalizacionOpciones" :key="capitalizacion" :value="capitalizacion">
            {{ capitalizacion }}
          </option>
        </select>
      </div>

      <!-- Tasa de Interés -->
      <div class="p-field">
        <label for="tasaInteres">Tasa de Interés</label>
        <input
            id="tasaInteres"
            type="number"
            v-model.number="newBono.inputData.tasaInteres"
            class="p-inputText p-component"
            placeholder="Tasa de Interés"
            required
        />
      </div>

      <!-- Fecha de Emisión -->
      <div class="p-field">
        <label for="fechaEmision">Fecha de Emisión</label>
        <input
            id="fechaEmision"
            type="date"
            v-model="newBono.inputData.fechaEmision"
            class="p-inputText p-component"
            required
        />
      </div>

      <!-- Plazo de Gracia Total -->
      <div class="p-field">
        <label for="plazoGraciaTotal">Plazo de Gracia Total</label>
        <input
            id="plazoGraciaTotal"
            type="number"
            v-model.number="newBono.inputData.plazoGraciaTotal"
            class="p-inputText p-component"
            placeholder="Plazo de gracia total"
        />
      </div>

      <!-- Plazo de Gracia Parcial -->
      <div class="p-field">
        <label for="plazoGraciaParcial">Plazo de Gracia Parcial</label>
        <input
            id="plazoGraciaParcial"
            type="number"
            v-model.number="newBono.inputData.plazoGraciaParcial"
            class="p-inputText p-component"
            placeholder="Plazo de gracia parcial"
        />
      </div>

      <!-- Gastos Iniciales -->
      <div class="p-field">
        <label for="gastosIniciales">Gastos Iniciales</label>
        <input
            id="gastosIniciales"
            type="number"
            v-model.number="newBono.inputData.gastosIniciales"
            class="p-inputText p-component"
            placeholder="Gastos Iniciales"
        />
      </div>

      <!-- Gastos Finales -->
      <div class="p-field">
        <label for="gastosFinales">Gastos Finales</label>
        <input
            id="gastosFinales"
            type="number"
            v-model.number="newBono.inputData.gastosFinales"
            class="p-inputText p-component"
            placeholder="Gastos Finales"
        />
      </div>

      <!-- Impuesto a la Renta -->
      <div class="p-field">
        <label for="impuestoRenta">Impuesto a la Renta</label>
        <input
            id="impuestoRenta"
            type="number"
            v-model.number="newBono.inputData.impuestoRenta"
            class="p-inputText p-component"
            placeholder="Impuesto a la Renta"
        />
      </div>

      <!-- Botón para Guardar -->
      <div class="form-footer">
        <button type="submit" class="p-button p-button-primary">Guardar Bono</button>
      </div>
    </form>
  </div>
</template>



<style scoped>
.form-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.p-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.p-field label {
  font-weight: bold;
  margin-bottom: 0.5rem;
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
  border-color: #0C24A1;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #0C24A1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0a1e8f;
}

.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>