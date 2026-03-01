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
  <h3>Archivo</h3>

<div class="file-buttons">

  <button 
    class="file-btn export-btn"
    @click="$emit('exportar')">
    <i class="fas fa-download icon"></i>
    Exportar JSON
  </button>

  <label class="file-btn import-btn">
    <i class="fas fa-upload icon"></i>
    Importar JSON
    <input
      type="file"
      accept=".json"
      @change="$emit('importar', $event)"
      hidden
    />
  </label>

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
  width: 260px;
  background: #111827;
  color: #f3f4f6;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-right: 1px solid #1f2937;
  transition: 0.3s ease;
}

/* ===== TITULOS ===== */

h3 {
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

/* ===== BOTONES GENERALES ===== */

button {
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #1f2937;
  color: #e5e7eb;
  font-size: 14px;
  transition: 0.2s ease;
}

button:hover {
  background: #374151;
}

button.active {
  background: #3b82f6;
  color: white;
}

/* ===== GRUPOS ===== */

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.matrix-btn {
  background: #10b981;
  font-weight: 600;
}

/* ===== TOGGLE ===== */

.toggle-container {
  display: flex;
  gap: 8px;
}

.toggle-container button {
  flex: 1;
}

.toggleActive {
  background: #8b5cf6 !important;
  color: white;
}

/* ===== COLORES ===== */

.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.color-option {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.2s;
}

.color-option:hover {
  transform: scale(1.08);
}

.color-option.selected {
  border: 2px solid #ffffff;
}

/* ===== ARCHIVOS ===== */

.file-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

.export-btn {
  background: #059669;
  color: white;
}

.import-btn {
  background: #2563eb;
  color: white;
}

/* ================================================= */
/* =================== MOBILE ====================== */
/* ================================================= */

@media (max-width: 768px) {

  .panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    border-right: none;
    border-top: 1px solid #1f2937;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 10px;
    gap: 16px;
    background: #0f172a;
  }

  /* Ocultar títulos en móvil */
  h3 {
    display: none;
  }

  /* Cada sección como bloque compacto */
  .button-group,
  .toggle-container,
  .color-grid,
  .file-buttons {
    flex-direction: row;
    display: flex;
    gap: 6px;
  }

  .color-grid {
    display: flex;
  }

  .color-option {
    width: 28px;
    height: 28px;
    aspect-ratio: unset;
  }

  button,
  .file-btn {
    font-size: 12px;
    padding: 6px 8px;
    white-space: nowrap;
  }

  .matrix-btn {
    padding: 6px 8px;
  }

}
</style>