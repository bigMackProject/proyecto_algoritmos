export default class JohnsonArista {

  constructor(origen, destino, duracion) {
    this.origen = origen
    this.destino = destino
    this.duracion = duracion

    this.holgura = 0
  }

  esCritica() {
    return this.holgura === 0
  }

}