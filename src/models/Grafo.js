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

  const size = this.nodes.length

  // 1️⃣ Crear matriz primero
  const matrix = Array.from({ length: size }, () =>
    Array(size).fill(0)
  )

  const indexMap = this.getNodeIndexMap()

  // 2️⃣ Llenar matriz
  this.edges.forEach(edge => {
    const i = indexMap[edge.from]
    const j = indexMap[edge.to]
    const weight = Number(edge.weight) || 1

    if (i === undefined || j === undefined) return

    matrix[i][j] += weight

    if (!this.directed) {
      matrix[j][i] += weight
    }
  })

  // 3️⃣ Suma de filas (pesos)
  const rowSums = matrix.map(row =>
    row.reduce((a, b) => a + b, 0)
  )

  // 4️⃣ Suma de columnas (pesos)
  const colSums = Array(size).fill(0)
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      colSums[j] += matrix[i][j]
    }
  }

  const maxRow = rowSums.length ? Math.max(...rowSums) : 0
  const maxCol = colSums.length ? Math.max(...colSums) : 0

  // 5️⃣ NUEVO: Conteo de conexiones (≠ 0)

  const rowCounts = matrix.map(row =>
    row.filter(value => value !== 0).length
  )

  const colCounts = Array(size).fill(0)
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (matrix[i][j] !== 0) {
        colCounts[j]++
      }
    }
  }

  const maxRowCount = rowCounts.length ? Math.max(...rowCounts) : 0
  const maxColCount = colCounts.length ? Math.max(...colCounts) : 0

  const labels = this.nodes.map(n => n.label)

  const resultado = {
    matrix,
    rowSums,
    colSums,
    maxRow,
    maxCol,
    rowCounts,
    colCounts,
    maxRowCount,
    maxColCount,
    labels
  }

  console.log("RESULTADO FINAL:", resultado)
  console.log("===== FIN generarAnalisisAdyacencia =====")

  return resultado
}
}