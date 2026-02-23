export class Grafo {
  constructor(nodes = [], edges = [], directed = true) {
    this.nodes = nodes
    this.edges = edges
    this.directed = directed
  }

  setNodes(nodes) {
    this.nodes = nodes
  }

  setEdges(edges) {
    this.edges = edges
  }

  addNode(node) {
    this.nodes.push(node)
  }

  addEdge(edge) {
    this.edges.push(edge)
  }

  removeNode(id) {
    this.nodes = this.nodes.filter(n => n.id !== id)
    this.edges = this.edges.filter(e => e.from !== id && e.to !== id)
  }

  removeEdge(id) {
    this.edges = this.edges.filter(e => e.id !== id)
  }

  getNodeIndexMap() {
    const map = {}
    this.nodes.forEach((node, index) => {
      map[node.id] = index
    })
    return map
  }


  generarAnalisisAdyacencia() {
  console.log("===== INICIO generarAnalisisAdyacencia =====")

  console.log("NODOS:", this.nodes)
  console.log("ARISTAS:", this.edges)
  console.log("DIRIGIDO:", this.directed)

  const size = this.nodes.length
  console.log("SIZE:", size)

  const matrix = Array.from({ length: size }, () =>
    Array(size).fill(0)
  )

  console.log("MATRIX INICIAL:", matrix)

  const indexMap = this.getNodeIndexMap()
  console.log("INDEX MAP:", indexMap)

  // Llenar matriz
  this.edges.forEach(edge => {
    const i = indexMap[edge.from]
    const j = indexMap[edge.to]
    const weight = Number(edge.weight) || 1

    console.log("Procesando arista:", edge)
    console.log("i:", i, "j:", j, "weight:", weight)

    if (i === undefined || j === undefined) {
      console.error("ERROR: índice undefined", { i, j, edge })
      return
    }

    matrix[i][j] += weight

    if (!this.directed) {
      matrix[j][i] += weight
    }
  })

  console.log("MATRIX DESPUÉS DE LLENAR:", matrix)

  // Suma filas
  const rowSums = matrix.map(row =>
    row.reduce((a, b) => a + b, 0)
  )

  console.log("ROW SUMS:", rowSums)

  // Suma columnas
  const colSums = Array(size).fill(0)
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      colSums[j] += matrix[i][j]
    }
  }

  console.log("COL SUMS:", colSums)

  const maxRow = rowSums.length ? Math.max(...rowSums) : 0
  const maxCol = colSums.length ? Math.max(...colSums) : 0

  console.log("MAX ROW:", maxRow)
  console.log("MAX COL:", maxCol)

  const labels = this.nodes.map(n => n.label)
  console.log("LABELS:", labels)

  const resultado = {
    matrix,
    rowSums,
    colSums,
    maxRow,
    maxCol,
    labels
  }

  console.log("RESULTADO FINAL:", resultado)
  console.log("===== FIN generarAnalisisAdyacencia =====")

  return resultado
}
}