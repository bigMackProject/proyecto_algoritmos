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

  getAdjacencyMatrix() {
    const size = this.nodes.length
    const matrix = Array.from({ length: size }, () =>
      Array(size).fill(0)
    )

    const nodeIndex = this.getNodeIndexMap()

    this.edges.forEach(edge => {
      const i = nodeIndex[edge.from]
      const j = nodeIndex[edge.to]
      const weight = Number(edge.weight) || 1

      matrix[i][j] += weight

      if (!this.directed) {
        matrix[j][i] += weight
      }
    })

    return matrix
  }

  getTransitionMatrix() {
    const matrix = this.getAdjacencyMatrix()
    const size = matrix.length

    const transition = matrix.map(row => [...row])

    for (let i = 0; i < size; i++) {
      const rowSum = transition[i].reduce((a, b) => a + b, 0)

      if (rowSum > 0) {
        for (let j = 0; j < size; j++) {
          transition[i][j] = transition[i][j] / rowSum
        }
      }
    }

    return transition
  }

  generarMatrizAdyacencia() {
    const size = this.nodes.length

    const matrix = Array.from({ length: size }, () =>
      Array(size).fill(0)
    )

    this.edges.forEach(edge => {
      const from = this.nodes.find(n => n.id === edge.from)
      const to = this.nodes.find(n => n.id === edge.to)

      if (!from || !to) return

      matrix[from.label][to.label] = Number(edge.weight)

      if (!this.directed) {
        matrix[to.label][from.label] = Number(edge.weight)
      }
    })

    return matrix
  }
}

