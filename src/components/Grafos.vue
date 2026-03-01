<template>
  
  <div class="mini-navbar">
  <button
    :class="{ active: algoritmoActivo === 'normal' }"
    @click="algoritmoActivo = 'normal'"
  >
    Grafo Normal
  </button>

  <button
    :class="{ active: algoritmoActivo === 'johnson' }"
    @click="algoritmoActivo = 'johnson'"
  >
    Johnson
  </button>
</div>

  <div class="graph-layout">
    <!-- GRAFO NORMAL -->
    <GraphCanvas
      v-if="algoritmoActivo === 'normal'"
      :nodes="nodesNormal"
      :edges="edgesNormal"
      :mode="mode"
      :directed="directed"
      :selectedColor="selectedColor"
      @updateNodes="nodesNormal = $event"
      @updateEdges="edgesNormal = $event"
    />

    <!-- JOHNSON -->
    <GraphCanvasJohnson
      v-else
      :nodes="nodesJohnson"
      :edges="edgesJohnson"
      :mode="mode"
      :selectedColor="selectedColor"
      @updateNodes="nodesJohnson = $event"
      @updateEdges="edgesJohnson = $event"
      :directed="true"
    />

    <ControlPanel
      :mode="mode"
      :directed="directed"
      :selectedColor="selectedColor"
      :mostrarMatriz="algoritmoActivo === 'normal'"
      :mostrarJohnson="algoritmoActivo === 'johnson'"
      :mostrarDirigido="algoritmoActivo === 'normal'" 
      @changeMode="mode = $event"
      @toggleDirected="directed = $event"
      @changeColor="selectedColor = $event"
      @generateMatrix="generarMatriz"
      @updateMode="mode = $event"
      @exportar="exportarJSON"
      @importar="importarJSON"
      @calcularJohnson="ejecutarJohnson" 
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
import GraphCanvasJohnson from './GrafosComp/GraphCanvasJohnson.vue'


// GRAFO NORMAL
const nodesNormal = ref([])
const edgesNormal = ref([])

// JOHNSON
const nodesJohnson = ref([])
const edgesJohnson = ref([])

const mode = ref('draw') 
const directed = ref(false)
const selectedColor = ref('#3b82f6')


const showMatrix = ref(false)
const matrixData = ref(null)

const algoritmoActivo = ref('normal')

/* ======= FUNCIÓN ======= */

function generarMatriz() {

  if (algoritmoActivo.value !== 'normal') {
    alert("La matriz solo está disponible para el Grafo Normal")
    return
  }

  const grafo = new Grafo(
    nodesNormal.value,
    edgesNormal.value,
    directed.value
  )

  matrixData.value = grafo.generarAnalisisAdyacencia()
  showMatrix.value = true
}

/*Calculo johnson*/

function topologicalSort(nodes, edges) {

  const inDegree = {}
  nodes.forEach(n => inDegree[n.id] = 0)

  edges.forEach(e => {
    inDegree[e.to]++
  })

  const queue = nodes.filter(n => inDegree[n.id] === 0)
  const orden = []

  while (queue.length > 0) {
    const nodo = queue.shift()
    orden.push(nodo)

    edges
      .filter(e => e.from === nodo.id)
      .forEach(e => {
        inDegree[e.to]--
        if (inDegree[e.to] === 0) {
          queue.push(nodes.find(n => n.id === e.to))
        }
      })
  }

  if (orden.length !== nodes.length) {
    alert("El grafo tiene ciclos. Johnson requiere un DAG.")
    return []
  }

  return orden
}
function ejecutarJohnson() {

  if (algoritmoActivo.value !== 'johnson') {
    alert("Cambia al modo Johnson primero")
    return
  }

  const nodos = [...nodesJohnson.value]
  const aristas = [...edgesJohnson.value]

  if (nodos.length === 0) {
    alert("No hay nodos")
    return
  }

  const orden = topologicalSort(nodos, aristas)

  // ===== ADELANTE =====
  orden.forEach(n => n.inicioTemprano = 0)

  orden.forEach(nodo => {
    const entrantes = aristas.filter(a => a.to === nodo.id)

    if (entrantes.length > 0) {
      nodo.inicioTemprano = Math.max(
        ...entrantes.map(a => {
          const anterior = orden.find(n => n.id === a.from)
          return anterior.inicioTemprano + a.duracion
        })
      )
    }
  })

  const nodosFinales = orden.filter(n =>
  !aristas.some(a => a.from === n.id)
)

const duracionTotal = Math.max(
  ...nodosFinales.map(n => n.inicioTemprano)
)

  orden.forEach(n => n.inicioTardio = duracionTotal)

  // ===== ATRÁS =====
  for (let i = orden.length - 1; i >= 0; i--) {
    const nodo = orden[i]
    const salientes = aristas.filter(a => a.from === nodo.id)

    if (salientes.length > 0) {
      nodo.inicioTardio = Math.min(
        ...salientes.map(a => {
          const siguiente = orden.find(n => n.id === a.to)
          return siguiente.inicioTardio - a.duracion
        })
      )
    }
  }

  // ===== HOLGURA NODOS =====
  orden.forEach(n => {
    n.holgura = n.inicioTardio - n.inicioTemprano
  })

  // ===== HOLGURA ARISTAS =====
  aristas.forEach(a => {
    const fromNode = orden.find(n => n.id === a.from)
    const toNode = orden.find(n => n.id === a.to)

    a.holgura =
      toNode.inicioTardio -
      fromNode.inicioTemprano -
      a.duracion
  })

  nodesJohnson.value = [...orden]
  edgesJohnson.value = [...aristas]

  // ===== CAMINO CRÍTICO =====
  const caminoCritico = []

let actual = orden.find(n =>
  n.holgura === 0 &&
  !aristas.some(a => a.to === n.id)
)

while (actual) {
  caminoCritico.push(actual.label)

  const siguienteArista = aristas.find(a =>
    a.from === actual.id &&
    a.holgura === 0
  )

  if (!siguienteArista) break

  actual = orden.find(n => n.id === siguienteArista.to)
}

  alert("Camino Crítico:\n" + caminoCritico.join(" → "))
}

/*IMPORTAR - EXPORTAR CON JSON*/ 
function exportarJSON() {
  const data = {
    directed: directed.value,
    nodes: algoritmoActivo.value === 'normal'
  ? nodesNormal.value
  : nodesJohnson.value,

    edges: algoritmoActivo.value === 'normal'
  ? edgesNormal.value
  : edgesJohnson.value
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
      if (algoritmoActivo.value === 'normal') {
          nodesNormal.value = data.nodes ?? []
          edgesNormal.value = data.edges ?? []
        } else {
          nodesJohnson.value = data.nodes ?? []
          edgesJohnson.value = data.edges ?? []
        }

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

.mini-navbar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.mini-navbar button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #1f2937;
  color: #9ca3af;
  font-weight: 600;
  cursor: pointer;
}

.mini-navbar button.active {
  background: #3b82f6;
  color: white;
}
</style>
