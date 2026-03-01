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
      @exportar="exportarJSON"
      @importar="importarJSON"
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
    

        <h3 style="margin-top:20px;">Conexiones por Nodo (Cantidad ≠ 0)</h3>

    <div class="bars-container">

      <!-- Salida -->
      <div 
        v-for="(count, index) in matrixData.rowCounts" 
        :key="'row-' + index"
        class="bar-row"
      >
        <span class="label">
          {{ matrixData.labels[index] }} (Salida)
        </span>

        <div class="bar-wrapper">
          <div 
            class="bar bar-out"
            :style="{ width: (count / maxConnections * 100) + '%' }"
          ></div>
          <span class="value">{{ count }}</span>
        </div>
      </div>

    </div>

    <h3 style="margin-top:20px;">Conexiones Entrantes</h3>

    <div class="bars-container">

      <div 
        v-for="(count, index) in matrixData.colCounts" 
        :key="'col-' + index"
        class="bar-row"
      >
        <span class="label">
          {{ matrixData.labels[index] }} (Entrada)
        </span>

        <div class="bar-wrapper">
          <div 
            class="bar bar-in"
           :style="{ width: (count / maxConnections * 100) + '%' }"
          ></div>
          <span class="value">{{ count }}</span>
        </div>
      </div>

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

const maxConnections = computed(() => {
  if (!matrixData.value) return 1
  return Math.max(
    ...matrixData.value.rowCounts,
    ...matrixData.value.colCounts,
    1
  )
})

/*IMPORTAR - EXPORTAR CON JSON*/ 
function exportarJSON() {
  const data = {
    directed: directed.value,
    nodes: nodes.value,
    edges: edges.value
  }

  const json = JSON.stringify(data, null, 2)

  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "grafo.json"
  a.click()

  URL.revokeObjectURL(url)
}


function importarJSON(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)

      directed.value = data.directed ?? false
      nodes.value = data.nodes ?? []
      edges.value = data.edges ?? []

      console.log("Grafo cargado correctamente")
    } catch (error) {
      alert("Archivo JSON inválido")
    }
  }

  reader.readAsText(file)
}
</script>

<style scoped>

.graph-layout {
  display: flex;
  height: auto;
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
  width: 900px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

table {
  border-collapse: collapse;
  margin-top: 15px;
  width: 100%;
  text-align: center;
  font-size: 14px;
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

.bars-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.bar-row {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.bar {
  height: 16px;
  border-radius: 6px;
  transition: width 0.3s ease;
  min-width: 4px;
}

.bar-out {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.bar-in {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
}

.value {
  font-weight: bold;
  font-size: 13px;
  min-width: 25px;
  text-align: right;
}

</style>
