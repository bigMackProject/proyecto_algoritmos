import { createRouter, createWebHashHistory } from 'vue-router'

import Inicio from '../components/Inicio.vue'
import Algoritmos from '../components/Algoritmos.vue'
import Grafos from '../components/Grafos.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/algoritmos',
    name: 'Algoritmos',
    component: Algoritmos
  },
  {
    path: '/grafos',
    name: 'Grafos',
    component: Grafos
  }
]

const router = createRouter({
  history: createWebHashHistory(),  
  routes
})

export default router
