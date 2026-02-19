<template>
  <section class="algoritmos">
    <h1>Algoritmos</h1>

    <div class="bloque">
      <h2>¿Qué es un algoritmos?</h2>
      <p>
        Un algoritmo es un conjunto ordenado y finito de instrucciones precisas
        que indican paso a paso cómo resolver un problema o realizar una tarea
        determinada. Cada paso sigue una secuencia lógica, donde las acciones
        dependen de las anteriores y conducen a un resultado específico.
      </p>

      <p>
        En términos generales, un algoritmo funciona como una guía estructurada:
        recibe datos de entrada, los procesa mediante reglas bien definidas y
        genera una salida. Puede compararse con una receta de cocina, donde los
        ingredientes representan los datos y el procedimiento describe los pasos
        necesarios para obtener el resultado final.
      </p>

      <p>
        El término “algoritmo” proviene del matemático Al-Khwarizmi, cuyas
        contribuciones fueron fundamentales para el desarrollo de las
        matemáticas y los sistemas numéricos modernos.
      </p>
    </div>

    <div class="bloque">
      <h2>Características de los algoritmos</h2>
      <ul>
        <li>
          <strong>Efectividad:</strong> Cada instrucción debe ser clara y
          ejecutable en un tiempo determinado.
        </li>
        <li>
          <strong>Finitud:</strong> El proceso debe finalizar después de un
          número limitado de pasos.
        </li>
        <li>
          <strong>Entrada:</strong> Puede recibir uno o más datos iniciales
          para ser procesados.
        </li>
        <li>
          <strong>Salida:</strong> Debe producir al menos un resultado
          relacionado con los datos de entrada.
        </li>
      </ul>
    </div>
    <div class="bloque">
  <h2>Videos relacionados</h2>

  <div class="grid-videos">
    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/U3CGMyjzlvM?si=C8d13AUp1EbYQVkQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>

    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/UD240-OEbVY?si=DMb3cUjnavj6ussv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>

    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/EkObhToiseo?si=RiG1GpUNvuptZkdO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>

    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FS9u9cIGf3o?si=7eCdsYYZMw2E8YjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
</div>

  </section>
</template>

<style scoped>
.algoritmos {
  max-width: 900px;
  margin: auto;
  line-height: 1.7;
  color: #e5e7eb; 
}

h1 {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #f9fafb; 
}

.bloque {
  margin-bottom: 30px;
  padding: 20px;
  background: #1f2937; 
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

h2 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-right: 15px;
  border-right: 3px solid #3b82f6;
  display: inline-block;
  color: #f3f4f6;
}

p {
  margin-bottom: 15px;
  color: #d1d5db;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 12px;
  color: #d1d5db;
}

li strong {
  color: #ffffff;
}


.grid-videos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 25px;
}


.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.video-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
}

</style>
