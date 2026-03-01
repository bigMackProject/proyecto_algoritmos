<template>
  <div class="help-container">

    <h2>Guía de Uso del Simulador de Grafos</h2>

    <section>
      <h3>1️⃣ Seleccionar el modo de trabajo</h3>
      <p>
        Antes de interactuar con el lienzo, debes elegir un modo en el panel izquierdo:
      </p>
      <ul>
        <li><strong>Dibujar:</strong> Permite crear nodos y aristas.</li>
        <li><strong>Editar:</strong> Permite mover los nodos arrastrándolos.</li>
        <li><strong>Borrar:</strong> Permite eliminar nodos o aristas.</li>
      </ul>
    </section>

    <section>
      <h3>2️⃣ Crear nodos</h3>
      <p>
        Selecciona el modo <strong>Dibujar</strong> y haz clic en cualquier parte del lienzo.
        Se te pedirá ingresar un nombre para el nodo (no puede estar vacío).
      </p>
      <p>
        El nodo se creará con el color actualmente seleccionado.
      </p>
    </section>

    <section>
      <h3>3️⃣ Crear aristas (conexiones)</h3>
      <p>
        En modo <strong>Dibujar</strong>:
      </p>
      <ol>
        <li>Haz clic en el nodo origen.</li>
        <li>Luego haz clic en el nodo destino.</li>
        <li>Se te pedirá ingresar el peso de la arista (solo números).</li>
      </ol>
      <p>
        Si el grafo está configurado como dirigido, aparecerá una flecha indicando dirección.
      </p>
      <p>
        No se permiten aristas duplicadas.
      </p>
    </section>

    <section>
      <h3>4️⃣ Mover nodos</h3>
      <p>
        Selecciona el modo <strong>Editar</strong>.
        Luego haz clic sostenido sobre un nodo y arrástralo a la nueva posición.
      </p>
    </section>

    <section>
      <h3>5️⃣ Eliminar elementos</h3>
      <p>
        Selecciona el modo <strong>Borrar</strong>.
      </p>
      <ul>
        <li>Haz clic sobre un nodo para eliminarlo (también se eliminarán sus aristas).</li>
        <li>Haz clic sobre una arista para eliminar solo esa conexión.</li>
      </ul>
    </section>

    <section>
      <h3>6️⃣ Tipo de grafo</h3>
      <p>
        Puedes elegir entre:
      </p>
      <ul>
        <li><strong>No Dirigido:</strong> Las conexiones no tienen flecha.</li>
        <li><strong>Dirigido:</strong> Las aristas tendrán flecha indicando dirección.</li>
      </ul>
    </section>

    <section>
      <h3>7️⃣ Colores</h3>
      <p>
        Antes de crear un nodo o arista, puedes seleccionar un color.
        El color elegido se aplicará a los nuevos elementos.
      </p>
    </section>

    <section>
      <h3>8️⃣ Generar matriz de adyacencia</h3>
      <p>
        Presiona el botón <strong>Generar</strong> para crear la matriz de adyacencia
        basada en los nodos y aristas actuales del grafo.
      </p>
    </section>

    <section>
      <h3>⚠ Recomendaciones</h3>
      <ul>
        <li>No puedes crear nodos sin nombre.</li>
        <li>El peso de las aristas debe ser numérico.</li>
        <li>No se permiten aristas duplicadas.</li>
        <li>Si eliminas un nodo, se eliminan también sus conexiones.</li>
      </ul>
    </section>

  </div>
</template>

<style scoped>
.help-container {
  color: #f1f5f9;
  max-width: 900px;
  margin: auto;
}

section {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #1f2937;
  border-radius: 10px;
}

h2 {
  margin-bottom: 25px;
}

h3 {
  margin-bottom: 10px;
  color: #60a5fa;
}
</style>