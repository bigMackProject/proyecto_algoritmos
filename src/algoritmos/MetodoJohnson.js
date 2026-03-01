export default class MetodoJohnson {

  constructor(nodos, aristas) {
    this.nodos = nodos
    this.aristas = aristas
  }

  // ----------------------------
  // Orden topológico (DAG)
  // ----------------------------
  ordenTopologico() {
    const gradoEntrada = {}
    const cola = []
    const orden = []

    this.nodos.forEach(n => gradoEntrada[n.id] = 0)

    this.aristas.forEach(a => {
      gradoEntrada[a.destino]++
    })

    this.nodos.forEach(n => {
      if (gradoEntrada[n.id] === 0)
        cola.push(n.id)
    })

    while (cola.length) {
      const actual = cola.shift()
      orden.push(actual)

      this.aristas
        .filter(a => a.origen === actual)
        .forEach(a => {
          gradoEntrada[a.destino]--
          if (gradoEntrada[a.destino] === 0)
            cola.push(a.destino)
        })
    }

    if (orden.length !== this.nodos.length) {
      throw new Error("El grafo tiene ciclos. Debe ser acíclico.")
    }

    return orden
  }

  // ----------------------------
  // Recorrido hacia adelante
  // ----------------------------
  recorridoAdelante(orden) {

    orden.forEach(id => {
      const nodoActual = this.obtenerNodo(id)

      this.aristas
        .filter(a => a.origen === id)
        .forEach(a => {
          const nodoDestino = this.obtenerNodo(a.destino)

          nodoDestino.temprano = Math.max(
            nodoDestino.temprano,
            nodoActual.temprano + a.duracion
          )
        })
    })
  }

  // ----------------------------
  // Recorrido hacia atrás
  // ----------------------------
  recorridoAtras(orden) {

    const ultimoId = orden[orden.length - 1]
    const ultimoNodo = this.obtenerNodo(ultimoId)

    ultimoNodo.tardio = ultimoNodo.temprano

    orden.reverse().forEach(id => {

      const nodoActual = this.obtenerNodo(id)

      const salientes = this.aristas.filter(a => a.origen === id)

      if (salientes.length === 0) return

      nodoActual.tardio = Math.min(
        ...salientes.map(a => {
          const destino = this.obtenerNodo(a.destino)
          return destino.tardio - a.duracion
        })
      )
    })
  }

  // ----------------------------
  // Calcular holguras
  // ----------------------------
  calcularHolguras() {
    this.aristas.forEach(a => {
      const origen = this.obtenerNodo(a.origen)
      const destino = this.obtenerNodo(a.destino)

      a.holgura = destino.tardio - origen.temprano - a.duracion
    })
  }

  // ----------------------------
  // Ejecutar todo
  // ----------------------------
  ejecutar() {

    const orden = this.ordenTopologico()

    this.recorridoAdelante(orden)
    this.recorridoAtras([...orden])
    this.calcularHolguras()

    return {
      nodos: this.nodos,
      aristas: this.aristas
    }
  }

  obtenerNodo(id) {
    return this.nodos.find(n => n.id === id)
  }

}