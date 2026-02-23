<template>
  
  <div class="graph-layout">
    <GraphCanvas
      :nodes="nodes"
      :edges="edges"
      :mode="mode"
      :directed="directed"
      :selectedColor="selectedColor"
      @updateNodes="nodes = $event"
      @updateEdges="edges = $event"

    />

    <ControlPanel
      :mode="mode"
      :directed="directed"
      :selectedColor="selectedColor"
      @changeMode="mode = $event"
      @toggleDirected="directed = $event"
      @changeColor="selectedColor = $event"
      @generateMatrix="generarMatriz"
      @updateMode="mode = $event"
      
    />

  </div>
  
<div v-if="showMatrix && matrixData" class="modal-overlay" @click="showMatrix = false">
  <div class="modal" @click.stop>

    <h3>Matriz de Adyacencia</h3>

    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(label,i) in matrixData.labels" :key="i">
            {{ label }}
          </th>
          <th>Σ Fila</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row,i) in matrixData.matrix" :key="i">
          <th>{{ matrixData.labels[i] }}</th>

          <td v-for="(value,j) in row" :key="j">
            {{ value }}
          </td>

          <td class="sum">
            {{ matrixData.rowSums[i] }}
          </td>
        </tr>

        <!-- Suma columnas -->
        <tr class="col-sum">
          <th>Σ Col</th>
          <td v-for="(value,i) in matrixData.colSums" :key="i">
            {{ value }}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div class="max-values">
      <p>Máx Filas: {{ matrixData.maxRow }}</p>
      <p>Máx Columnas: {{ matrixData.maxCol }}</p>
    </div>

    <button class="close-btn" @click="showMatrix = false">
      Cerrar
    </button>

  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GraphCanvas from './GrafosComp/GraphCanvas.vue'
import ControlPanel from './GrafosComp/ControlPanel.vue'
import { Grafo } from '../models/Grafo'


const nodes = ref([])
const edges = ref([])
const mode = ref('draw') 
const directed = ref(false)
const selectedColor = ref('#3b82f6')


const showMatrix = ref(false)
const matrixData = ref(null)

/* ======= FUNCIÓN ======= */

function generarMatriz() {
  console.log("LLEGA AL PADRE")

  const grafo = new Grafo(
    nodes.value,
    edges.value,
    directed.value
  )

  matrixData.value = grafo.generarAnalisisAdyacencia()
  showMatrix.value = true
}
</script>

<style scoped>

.graph-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  
}

.panel {
  order: -1; 
}


.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.modal {
  background: #111827;
  padding: 25px;
  border-radius: 14px;
  color: white;
  min-width: 500px;
  max-width: 90%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

table {
  border-collapse: collapse;
  margin-top: 15px;
  width: 100%;
  text-align: center;
}

th, td {
  border: 1px solid #374151;
  padding: 8px;
}

th {
  background: #1f2937;
}

.sum {
  background: #0f172a;
  font-weight: bold;
}

.col-sum td {
  background: #0f172a;
  font-weight: bold;
}

.max-values {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.close-btn {
  margin-top: 15px;
  width: 100%;
  padding: 8px;
  background: #374151;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
