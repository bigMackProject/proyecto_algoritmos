<template>
  <div class="canvas">
    <svg 
    ref="svgRef"
    class="graph-svg" 
    @click="handleCanvasClick" 
    @mousemove="handleMouseMove" 
    @mouseup="stopDrag "
    >
    <defs>
        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25"
            fill="none"
            stroke="#9ca3af"

            stroke-width="1"/>
        </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />

<g v-for="edge in edges" :key="edge.id">

  <path
    v-if="edge.from === edge.to"
    :d="loopPath(edge)"
    :stroke="edge.color"
    stroke-width="2.5"
    fill="none"
  />

  <line
    :x1="offsetLine(edge).x1"
    :y1="offsetLine(edge).y1"
    :x2="offsetLine(edge).x2"
    :y2="offsetLine(edge).y2"
    stroke="transparent"
    stroke-width="15"
    @click="deleteEdge(edge)"
  />

  <line
    :x1="offsetLine(edge).x1"
    :y1="offsetLine(edge).y1"
    :x2="offsetLine(edge).x2"
    :y2="offsetLine(edge).y2"
    :stroke="edge.color"
    stroke-width="2.5"
    stroke-linecap="round"
  />

  <text
    :x="edgeLabelPosition(edge).x"
    :y="edgeLabelPosition(edge).y"
    font-size="13"
    fill="white"
    font-weight="600"
  >
    {{ edge.weight }}
  </text>
  
  <polygon
    v-if="directed"
    :points="arrowPoints(edge)"
    :fill="edge.color"
  />

</g>


      <!-- Línea temporal -->
      <line
        v-if="tempConnection"
        :x1="tempConnection.x1"
        :y1="tempConnection.y1"
        :x2="tempConnection.x2"
        :y2="tempConnection.y2"
        stroke="gray"
        stroke-dasharray="5"
      />

      <!-- NODOS 1-->
      <g
  v-for="node in nodes"
  :key="node.id"
  @mousedown.stop="startDrag(node)"
  @click.stop="handleNodeClick(node)"
>

     <circle
  :cx="node.x"
  :cy="node.y"
  r="20"
  :fill="node.color"
  stroke="#1f2937"
  stroke-width="2"
  style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); cursor: pointer;"
/>

<text
  :x="node.x"
  :y="node.y + 5"
  text-anchor="middle"
  font-size="13"
  font-weight="600"
  fill="white"
  pointer-events="none"
>
  {{ node.label}}
</text>

      </g>

    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* =========================
   PROPS & EMITS
========================= */

const props = defineProps({
  nodes: Array,
  edges: Array,
  mode: String,
  directed: Boolean,
  selectedColor: String
})

const emit = defineEmits(['updateNodes', 'updateEdges'])

function deleteEdge(edgeToDelete) {
  if (props.mode !== 'delete') return

  emit(
    'updateEdges',
    props.edges.filter(e => e.id !== edgeToDelete.id)
  )
}

/* =========================
   REFERENCIAS Y ESTADO
========================= */

const svgRef = ref(null)

const selectedNode = ref(null)
const tempConnection = ref(null)

const draggingNode = ref(null)


/* =========================
   CICLO DE VIDA
========================= */

function stopDrag() {
  draggingNode.value = null
}

onMounted(() => {
  window.addEventListener('mouseup', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', stopDrag)
})


/* =========================
   DRAG MODE (EDITAR)
========================= */

function startDrag(node) {
  if (props.mode !== 'edit') return
  draggingNode.value = node
}

function handleMouseMove(e) {
  const rect = svgRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  if (draggingNode.value && props.mode === 'edit') {
    const updatedNodes = props.nodes.map(n =>
      n.id === draggingNode.value.id
        ? { ...n, x, y }
        : n
    )

    emit('updateNodes', updatedNodes)
    return
  }

  if (!selectedNode.value) return

  tempConnection.value = {
    x1: selectedNode.value.x,
    y1: selectedNode.value.y,
    x2: x,
    y2: y
  }
}


/* =========================
   CREAR NODOS
========================= */

function handleCanvasClick(e) {
  if (props.mode !== 'draw') return

  const rect = svgRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const newNode = {
    id: Date.now(),
    x,
    y,
    label: props.nodes.length,    
    color: props.selectedColor
  }

  emit('updateNodes', [...props.nodes, newNode])
}


/* =========================
   INTERACCIÓN CON NODOS
========================= */

function handleNodeClick(node) {

  if (props.mode === 'delete') {
    emit('updateNodes', props.nodes.filter(n => n.id !== node.id))
    emit(
      'updateEdges',
      props.edges.filter(e => e.from !== node.id && e.to !== node.id)
    )
    return
  }

  if (props.mode !== 'draw') return

 
  if (!selectedNode.value) {
    selectedNode.value = node
    return
  }

  const weight = prompt("Peso de la arista:", "1")

  const exists = props.edges.some(e =>
    props.directed
      ? (e.from === selectedNode.value.id && e.to === node.id)
      : (
          (e.from === selectedNode.value.id && e.to === node.id) ||
          (e.from === node.id && e.to === selectedNode.value.id)
        )
  )

  if (exists) {
    selectedNode.value = null
    tempConnection.value = null
    return
  }

  const newEdge = {
    id: Date.now(),
    from: selectedNode.value.id,
    to: node.id,
    weight: weight || 1,
    color: props.selectedColor
  }

  emit('updateEdges', [...props.edges, newEdge])

  selectedNode.value = null
  tempConnection.value = null
}


/* =========================
   UTILIDADES
========================= */

function getNode(id) {
  return props.nodes.find(n => n.id === id)
}

function isBidirectional(edge) {
  return props.edges.some(e =>
    e.from === edge.to && e.to === edge.from
  )
}

function offsetLine(edge) {
  const from = getNode(edge.from)
  const to = getNode(edge.to)

  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const offset = isBidirectional(edge) ? 10 : 0
  const offsetX = -dy / dist * offset
  const offsetY = dx / dist * offset

  return {
    x1: from.x + offsetX,
    y1: from.y + offsetY,
    x2: to.x + offsetX,
    y2: to.y + offsetY
  }
}

function arrowPoints(edge) {
  const pos = offsetLine(edge)

  const angle = Math.atan2(pos.y2 - pos.y1, pos.x2 - pos.x1)
  const arrowSize = 12

  const x = pos.x2 - 20 * Math.cos(angle)
  const y = pos.y2 - 20 * Math.sin(angle)

  const p1 = `${x},${y}`
  const p2 = `${x - arrowSize * Math.cos(angle - Math.PI / 6)},${y - arrowSize * Math.sin(angle - Math.PI / 6)}`
  const p3 = `${x - arrowSize * Math.cos(angle + Math.PI / 6)},${y - arrowSize * Math.sin(angle + Math.PI / 6)}`

  return `${p1} ${p2} ${p3}`
}

function loopPath(edge) {
  const node = getNode(edge.from)
  const r = 20
  const loopSize = 30

  return `
    M ${node.x} ${node.y - r}
    C ${node.x + loopSize} ${node.y - r - loopSize},
      ${node.x - loopSize} ${node.y - r - loopSize},
      ${node.x} ${node.y - r}
  `
}

function edgeLabelPosition(edge) {


  if (edge.from === edge.to) {
    const node = getNode(edge.from)

    return {
      x: node.x,
      y: node.y - 50   
    }
  }

  const pos = offsetLine(edge)

  return {
    x: (pos.x1 + pos.x2) / 2,
    y: (pos.y1 + pos.y2) / 2 - 5
  }
}


</script>


<style scoped>
.canvas {
  flex: 1;
  background: #080c14;

}
.canvas-container {
  flex: 1;
  background: #e5e7eb;
}

.graph-canvas {
  flex: 1;
}

.graph-svg {
  width: 100%;
  height: 100%;
}
</style>
