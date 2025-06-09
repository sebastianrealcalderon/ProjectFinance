<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import {DatosDeEntradaEntity} from "@/finance/model/datos-de-entrada.entity.js";

const form = ref(new DatosDeEntradaEntity({
  valorNominal: 1000,
  moneda: 'USD',
  tasaCupon: 5,
  plazo: 5,
  frecuenciaAnual: 'Semestral',
  tipoTasa: 'Efectiva',
  periodoGracia: 0,
  tipoGracia: 'Parcial',
  tasaMercado: 5.5
}))

const monedas = [
  { label: 'USD - Dólar', value: 'USD' },
  { label: 'PEN - Sol', value: 'PEN' },
]

const frecuencias = ['Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual']

const tiposTasa = ['Efectiva', 'Nominal']

const tiposGracia = ['Parcial', 'Total', 'Ninguna']

const calcular = () => {

}
</script>

<template>
  <div class="card p-4 shadow-2 border-round surface-card w-full sm:w-30rem">
    <h3 class="mb-4 text-center">Parámetros de Bono</h3>

    <div class="formgrid grid">

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Valor Nominal</label>
        <InputText v-model="form.valorNominal" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Moneda</label>
        <Dropdown v-model="form.moneda" :options="monedas" optionLabel="label" optionValue="value" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Tasa Cupón (%)</label>
        <InputText v-model="form.tasaCupon" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Plazo (años)</label>
        <InputText v-model="form.plazo" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Frecuencia Anual</label>
        <Dropdown v-model="form.frecuenciaAnual" :options="frecuencias" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Tipo de Tasa de Interés</label>
        <Dropdown v-model="form.tipoTasa" :options="tiposTasa" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Periodo de Gracia</label>
        <InputText v-model="form.periodoGracia" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-3">
        <label class="block mb-2 font-medium">Tipo de Gracia</label>
        <Dropdown v-model="form.tipoGracia" :options="tiposGracia" class="w-full input-bordered" />
      </div>

      <div class="field col-12 mb-4">
        <label class="block mb-2 font-medium">Tasa de mercado (%)</label>
        <InputText v-model="form.tasaMercado" class="w-full input-bordered" />
      </div>

      <div class="field col-12">
        <Button label="CALCULAR" class="w-full p-button-blue" @click="calcular" />
      </div>

    </div>
  </div>
</template>

<style scoped>

.card {
  border-radius: 1rem;
}

.input-bordered {
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.p-button-blue {
  background-color: #007bff; /* Azul */
  border: none;
  color: white;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.p-button-blue:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el mouse */
  box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
}



</style>