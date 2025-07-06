<script>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import {BonoApiService} from "@/finance/services/bono-api.service.js";

export default {
  name: 'bono-form',
  data() {
    return {
      monedas: [
        { label: 'USD - Dólar', value: 'USD' },
        { label: 'PEN - Sol', value: 'PEN' },
        { label: 'EUR - Euro', value: 'EUR' }
      ],
      frecuenciasPago: ['DIARIA', 'MENSUAL', 'TRIMESTRAL', 'ANUAL'],
      tiposTasa: ['EFECTIVA', 'NOMINAL'],
      capitalizacionOpciones: ['Anual', 'Semestral', 'Trimestral'],
      newBono:{
        userId: null,  // userId se obtendrá dinámicamente
        inputData: {
          nombreBono: "",
          valorNominal: 0,
          valorComercial: 0,
          moneda: "PEN",
          nroPeriodos: 0,
          frecuenciaPago: "ANUAL",
          tipoTasa: "EFECTIVA",
          tasaInteres: 0,
          capitalizacion: "Anual",
          plazoGraciaTotal: 0,
          plazoGraciaParcial: 0,
          fechaEmision: new Date(),
          gastosIniciales: 0,
          gastosFinales: 0,
          impuestoRenta: 0
        },
        middleData:{
          n:0,
          i:0.0,
          iAnual:false,
          iNominal:false,
          k:0,
          cuota:0.0,
          iAcumulado:0.0,
          amortAcumulado:0.0,
          flujoEmisorTotal:0.0,
          flujoBonistaTotal:0.0,
          gastosIniciales:0.0,
          gastosFinales:0.0,
          valorNetoEmisor:0.0,
          valorNetoBonista:0.0,
          inpuestoTotalBonista:0.0,
          tiempoPonderado:0.0,
          convexidadParcial:0.0,
        },
        outputData:{
          cuotaConstante:0.0,
          tablaAmortizacion:0.0,
          tcea:0.0,
          trea:0.0,
          duracionMacaulay:0.0,
          duracionModificada: null,
          convexidad:0.0,
          precioTeorico:0.0,
          van:0.0,
          flujoCaja: []
        }
      },
    }
  },
  created() {
    // Obtener el usuario logueado desde localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      this.newBono.userId = user.id; // Asignar el userId dinámicamente
    } else {
      console.warn("No hay usuario logueado, redireccionando al login...");
      this.$router.push({ name: 'login' });  // Redirige si no hay usuario logueado
    }
  },
  methods: {
    // Método para calcular la tasa efectiva mensual
    calcularTasaEfectivaMensual(tasaNominal, capitalizacion) {
      const iNominal = tasaNominal / 100;
      const n = this.obtenerNumeroDePeriodosPorAno(capitalizacion);
      return Math.pow(1 + iNominal / n, 1 / 12) - 1;
    },

    obtenerNumeroDePeriodosPorAno(capitalizacion) {
      if (capitalizacion === 'Anual') return 1;
      if (capitalizacion === 'Semestral') return 2;
      if (capitalizacion === 'Trimestral') return 4;
      if (capitalizacion === 'Mensual') return 12;
      return 1;
    },

    // Método para calcular la cuota
    calcularCuota() {
      const tasaMensual = this.calcularTasaEfectivaMensual(this.newBono.inputData.tasaInteres, this.newBono.inputData.capitalizacion);
      const n = this.newBono.inputData.nroPeriodos;
      const valorNominal = this.newBono.inputData.valorNominal;
      return (valorNominal * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
    },

    // Método para calcular la duración Macaulay
    calcularDuracionMacaulay() {
      const cuota = this.newBono.middleData.cuota;
      const tasaMensual = this.newBono.middleData.i;
      const n = this.newBono.inputData.nroPeriodos;
      let duracionMacaulay = 0;
      let flujoDescontado;

      for (let t = 1; t <= n; t++) {
        flujoDescontado = cuota / Math.pow(1 + tasaMensual, t);
        duracionMacaulay += (t * flujoDescontado) / (cuota * n);
      }

      return duracionMacaulay;
    },

    // Método para calcular los flujos
    calcularFlujos() {
      const cuota = this.calcularCuota();
      let saldoDeuda = this.newBono.inputData.valorNominal;
      let flujos = [];

      // Generar los flujos de caja para cada periodo
      for (let t = 1; t <= this.newBono.inputData.nroPeriodos; t++) {
        const intereses = saldoDeuda * this.calcularTasaEfectivaMensual(this.newBono.inputData.tasaInteres, this.newBono.inputData.capitalizacion);
        const amortizacion = cuota - intereses;
        saldoDeuda -= amortizacion;

        const flujoEmisor = cuota;
        const flujoBonista = cuota;

        flujos.push({
          periodo: t,
          amortizacion,
          interes: intereses,
          flujo: cuota,
          saldo: saldoDeuda,
          valorPresente: cuota / Math.pow(1 + this.calcularTasaEfectivaMensual(this.newBono.inputData.tasaInteres, this.newBono.inputData.capitalizacion), t)
        });
      }

      // Guardamos los flujos de caja en los datos intermedios
      this.newBono.middleData.flujoEmisorTotal = flujos.reduce((acc, flujo) => acc + flujo.flujo, 0);
      this.newBono.middleData.flujoBonistaTotal = flujos.reduce((acc, flujo) => acc + flujo.flujo, 0);

      // Guardamos los flujos de caja en outputData
      this.newBono.outputData.flujoCaja = flujos;

      return flujos;
    },

    // Método para calcular el VAN
    calcularVAN() {
      const flujos = this.calcularFlujos();  // Asegúrate de que 'calcularFlujos' devuelva flujos válidos
      const tasaMensual = this.calcularTasaEfectivaMensual(this.newBono.inputData.tasaInteres, this.newBono.inputData.capitalizacion);
      let van = 0;

      // Calcular el VAN usando los flujos de caja
      for (let t = 0; t < flujos.length; t++) {
        van += flujos[t].valorPresente;
      }

      this.newBono.outputData.van = van;
      return van;
    },

    // Método para calcular el precio teórico
    calcularPrecio() {
      const van = this.calcularVAN();
      this.newBono.outputData.precioTeorico = van;
      return van;
    },
    calcularConvexidad() {
      const cuota = this.newBono.middleData.cuota;  // Cuota constante
      const tasaMensual = this.newBono.middleData.i;  // Tasa efectiva mensual
      const n = this.newBono.inputData.nroPeriodos;  // Número de periodos
      let convexidad = 0;

      // Iterar sobre todos los periodos para calcular la convexidad
      for (let t = 1; t <= n; t++) {
        const flujoDescontado = cuota / Math.pow(1 + tasaMensual, t);  // Flujo descontado en el periodo t
        convexidad += (flujoDescontado * Math.pow(t, 2));  // Sumar la parte de la fórmula
      }

      // Dividir entre el valor de (1 + tasaMensual) elevado a n, para normalizar la convexidad
      convexidad /= (Math.pow(1 + tasaMensual, n) * n);

      return convexidad;
    },

    // Guardar bono con todos los cálculos
    guardarBono() {
      // Calcular los datos intermedios (middleData)
      this.newBono.middleData.n = this.newBono.inputData.nroPeriodos;
      this.newBono.middleData.i = this.calcularTasaEfectivaMensual(this.newBono.inputData.tasaInteres, this.newBono.inputData.capitalizacion);
      this.newBono.middleData.iAnual = this.newBono.inputData.tasaInteres;
      this.newBono.middleData.iNominal = this.newBono.inputData.tipoTasa === "NOMINAL" ? this.newBono.inputData.tasaInteres * 12 : 0;
      this.newBono.middleData.k = this.obtenerNumeroDePeriodosPorAno(this.newBono.inputData.capitalizacion);
      this.newBono.middleData.cuota = this.calcularCuota();

      // Asignar los gastos iniciales y finales en middleData
      this.newBono.middleData.gastosIniciales = this.newBono.inputData.gastosIniciales;
      this.newBono.middleData.gastosFinales = this.newBono.inputData.gastosFinales;

      // Realizar los cálculos de flujos y valores finales
      this.calcularFlujos();  // Esta función calcula los flujos de caja
      this.calcularVAN();     // Calcular el VAN (Valor Actual Neto)
      this.calcularPrecio();  // Calcular el precio del bono (Valor Teórico)

      // Cálculos adicionales para outputData
      this.newBono.outputData.cuotaConstante = this.newBono.middleData.cuota;

      // 1. TCEA (Tasa de Costo Efectivo Anual)
      const tcea = Math.pow(1 + this.newBono.middleData.i, 12) - 1;
      this.newBono.outputData.tcea = tcea;

      // 2. TREA (Tasa de Rendimiento Efectivo Anual)
      this.newBono.outputData.trea = this.newBono.middleData.i * 12;

      // 3. Duración Macaulay
      const duracionMacaulay = this.calcularDuracionMacaulay();
      this.newBono.outputData.duracionMacaulay = duracionMacaulay;

      // 4. Duración Modificada
      this.newBono.outputData.duracionModificada = duracionMacaulay / (1 + this.newBono.middleData.i);

      // 5. Convexidad
      const convexidad = this.calcularConvexidad();
      this.newBono.outputData.convexidad = convexidad;

      // 6. Precio Teórico
      this.newBono.outputData.precioTeorico = this.calcularPrecio();

      // 7. VAN (Valor Actual Neto)
      this.newBono.outputData.van = this.calcularVAN();

      // 8. Flujo de Caja (Emisor y Bonista)
      const flujos = this.calcularFlujos();
      this.newBono.outputData.flujoCaja = flujos;  // Guardamos todos los flujos de caja en outputData

      // Calcular valor neto emisor y bonista
      this.newBono.middleData.valorNetoEmisor = this.newBono.inputData.valorComercial - this.newBono.inputData.gastosIniciales;
      this.newBono.middleData.valorNetoBonista = this.newBono.inputData.valorNominal - this.newBono.inputData.gastosFinales;

      // Mostrar los detalles en consola
      console.log("Bono creado:", JSON.stringify(this.newBono, null, 2));

      // Emitir el evento con los resultados
      this.$emit("bonoGuardado", this.newBono);
    }
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
            v-model="newBono.inputData.nombreBono"
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
            v-model="newBono.inputData.valorNominal"
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
            v-model="newBono.inputData.valorComercial"
            class="p-inputText p-component"
            placeholder="Valor Comercial"
            required
        />
      </div>

      <!-- Moneda -->
      <div class="p-field">
        <label for="moneda">Moneda</label>
        <select v-model="newBono.inputData.moneda" class="p-inputText p-component">
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
            v-model="newBono.inputData.nroPeriodos"
            class="p-inputText p-component"
            placeholder="Número de Periodos"
            required
        />
      </div>

      <!-- Frecuencia de Pago -->
      <div class="p-field">
        <label for="frecuenciaPago">Frecuencia de Pago</label>
        <select v-model="newBono.inputData.frecuenciaPago" class="p-inputText p-component">
          <option v-for="frecuencia in frecuenciasPago" :key="frecuencia" :value="frecuencia">
            {{ frecuencia }}
          </option>
        </select>
      </div>

      <!-- Tipo de Tasa -->
      <div class="p-field">
        <label for="tipoTasa">Tipo de Tasa</label>
        <select v-model="newBono.inputData.tipoTasa" class="p-inputText p-component">
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
            v-model="newBono.inputData.tasaInteres"
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
            v-model="newBono.inputData.plazoGraciaTotal"
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
            v-model="newBono.inputData.plazoGraciaParcial"
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
            v-model="newBono.inputData.gastosIniciales"
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
            v-model="newBono.inputData.gastosFinales"
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
            v-model="newBono.inputData.impuestoRenta"
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