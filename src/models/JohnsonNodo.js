export default class JohnsonNodo{

  constructor(id, etiqueta, x, y) {
    this.id = id
    this.etiqueta = etiqueta
    this.x = x
    this.y = y

    // tiempos del método
    this.temprano = 0   // recorrido hacia adelante (E)
    this.tardio = 0     // recorrido hacia atrás (L)
  }

  esCritico() {
    return this.temprano === this.tardio
  }

}