<template>
  
  <div class="panel">

    <h3>Modo</h3>

    <div class="button-group">
     <button 
  :class="{ active: mode === 'draw' }"
  @click="$emit('changeMode', 'draw')">
  <i class="fas fa-pencil-alt icon"></i>
  Dibujar
</button>

<button 
  :class="{ active: mode === 'edit' }"
  @click="$emit('changeMode', 'edit')">
  <i class="fas fa-pen icon"></i>
  Editar
</button>

<button 
  :class="{ active: mode === 'delete' }"
  @click="$emit('changeMode', 'delete')">
  <i class="fas fa-eraser icon"></i>
  Borrar
</button>
<button 
  class="matrix-btn"
  @click="$emit('generateMatrix')">
  <i class="fas fa-table icon"></i>
  Generar
</button>
  
    </div>

    <hr />

    <h3>Tipo de Grafo</h3>

    <div class="toggle-container">
      <button
        :class="{ toggleActive: !directed }"
        @click="$emit('toggleDirected', false)">
        No Dirigido
      </button>

      <button
        :class="{ toggleActive: directed }"
        @click="$emit('toggleDirected', true)">
        Dirigido
      </button>
      
    </div>

    <hr />

    <h3>Colores</h3>

    <div class="color-grid">
      <div 
        v-for="color in palette" 
        :key="color"
        class="color-option"
        :style="{ background: color }"
        :class="{ selected: selectedColor === color }"
        @click="$emit('changeColor', color)"
      ></div>
    </div>

  </div>
</template>
<script setup>
const emit = defineEmits([
  'changeMode',
  'toggleDirected',
  'changeColor',
  'generateMatrix'
])
defineProps(['mode', 'directed', 'selectedColor'])

const palette = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#ffffff'
]
</script>
<style scoped>
.panel {
  width: 270px;
  background: #1f2937;
  color: #f3f4f6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-right: 1px solid #374151;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  color: #e5e7eb;
}

button {
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #374151;
  color: #f3f4f6;
  transition: 0.2s ease;
}

button:hover {
  background: #4b5563;
}

button.active {
  background: #3b82f6;
  color: white;
}


.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.matrix-btn {
  margin-top: 5px;
  background: #10b981;
  font-weight: bold;
}

.matrix-btn:disabled {
  background: #374151;
  opacity: 0.4;
  cursor: not-allowed;
}

.toggle-container {
  display: flex;
  gap: 10px;
}

.toggle-container button {
  flex: 1;
  background: #374151;
}

.toggleActive {
  background: #8b5cf6 !important;
  color: white;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.color-option {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border: 2px solid #ffffff;
}

</style>