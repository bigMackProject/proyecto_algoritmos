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
     
      @updateMode="mode = $event"
      
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GraphCanvas from './GrafosComp/GraphCanvas.vue'
import ControlPanel from './GrafosComp/ControlPanel.vue'

import { Grafo } from '../models/Grafo'
import { computed } from 'vue'

const grafo = computed(() => {
  return new Grafo(nodes.value, edges.value, directed.value)
})

function generarMatriz() {
  const grafo = new Grafo(nodes.value, edges.value, directed.value)
  const matriz = grafo.generarMatrizAdyacencia()
  console.log("Matriz de Adyacencia")
  console.table(matriz)
}

const nodes = ref([])
const edges = ref([])

const mode = ref('draw') 
const directed = ref(false)
const selectedColor = ref('#3b82f6')
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

</style>
