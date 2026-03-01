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
    :stroke="edge.holgura === 0 ? '#dc2626' : edge.color"
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
  {{ edge.duracion }}
</text>

<text
  v-if="edge.holgura !== undefined"
  :x="edgeLabelPosition(edge).x"
  :y="edgeLabelPosition(edge).y + 15"
  font-size="11"
  fill="#fbbf24"
>
  h={{ edge.holgura }}
</text>
  
  <polygon
    v-if="directed"
    :points="arrowPoints(edge)"
    :fill="edge.holgura === 0 ? '#dc2626' : edge.color"
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

      <!-- Nodos johnson-->
        <g
        v-for="node in nodes"
        :key="node.id"
        @mousedown.stop="startDrag(node)"
        @click.stop="handleNodeClick(node)"
        >

        <circle
        :cx="node.x"
        :cy="node.y"
        r="35"
        :fill="node.color"
        :stroke="node.holgura === 0 ? '#dc2626' : '#1f2937'"
        stroke-width="3"
        style="cursor:pointer;"
        />

        <!-- Línea horizontal (divide arriba y abajo) -->
        <line
        :x1="node.x - 35"
        :y1="node.y"
        :x2="node.x + 35"
        :y2="node.y"
        stroke="#1f2937"
        stroke-width="2"
        />

        <!-- Línea vertical SOLO en la parte inferior -->
        <line
        :x1="node.x"
        :y1="node.y"
        :x2="node.x"
        :y2="node.y + 35"
        stroke="#1f2937"
        stroke-width="2"
        />

        <!-- TEXTO SUPERIOR (label grande centrado) -->
        <text
        :x="node.x"
        :y="node.y - 10"
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="white"
        >
        {{ node.label }}
        </text>

        <!-- CUADRANTE 3 (inicio temprano) -->
        <text
        :x="node.x - 12"
        :y="node.y + 20"
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="white"
        >
        {{ node.inicioTemprano ?? '' }}
        </text>

        <!-- CUADRANTE 4 (inicio tardío) -->
        <text
        :x="node.x + 12"
        :y="node.y + 20"
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="white"
        >
        {{ node.inicioTardio ?? '' }}
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

  let name = ""
  while (!name) {
    name = prompt("Nombre del nodo (no puede estar vacío):", "")
    if (name === null) return 
    name = name.trim()        
  }

    const newNode = {
    id: Date.now(),
    x,
    y,
    label: name,
    color: props.selectedColor,

    // CAMPOS JOHNSON
    inicioTemprano: 0,
    inicioTardio: 0,
    holgura: 0
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
   
    if (!node.label || node.label === "") {
      const name = prompt("Nombre del nodo:", "")
      node.label = name || ""  
      const updatedNodes = props.nodes.map(n =>
        n.id === node.id ? { ...n, label: node.label } : n
      )
      emit('updateNodes', updatedNodes)
    }

    selectedNode.value = node
    return
  }

  let input = prompt("Duración de la arista:", "1")

    if (input === null) {
    selectedNode.value = null
    tempConnection.value = null
    return
    }

    input = input.trim()

    if (!/^\d+(\.\d+)?$/.test(input)) {
    alert("Ingresa solo números válidos.")
    selectedNode.value = null
    tempConnection.value = null
    return
    }

    const duracion = Number(input)

  const exists = props.edges.some(e =>
  e.from === selectedNode.value.id && e.to === node.id)
  if (exists) {
    selectedNode.value = null
    tempConnection.value = null
    return
  }

 
  const newEdge = {
    id: Date.now(),
    from: selectedNode.value.id,
    to: node.id,
    duracion,
    holgura: 0,
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

function offsetLine(edge) {
  const from = getNode(edge.from)
  const to = getNode(edge.to)

  const r = 20 // radio del nodo

  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const normX = dx / dist
  const normY = dy / dist

  return {
    x1: from.x + normX * r,
    y1: from.y + normY * r,
    x2: to.x - normX * r,
    y2: to.y - normY * r
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
  position: relative;
  display: flex;
}

/* SVG ocupa todo el espacio disponible */
.graph-svg {
  width: 100%;
  height: 100%;
  touch-action: none; /* 🔥 importante para drag en móvil */
}

/* ============================= */
/* ======= RESPONSIVE ========= */
/* ============================= */

@media (max-width: 768px) {

  .canvas {
    height: calc(100vh - 80px); 
  }

}

@media (min-width: 769px) {

  .canvas {
    height: 100vh;
  }

}
</style>
