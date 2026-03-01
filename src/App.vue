<script setup>
</script>

<template>
  <div class="layout">

    <header class="header">
      <div class="container header-content">
        <h1 class="logo">Simulador de Grafos</h1>

        <button class="hamburger" @click="menuOpen = !menuOpen">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>

        <nav :class="['nav', { open: menuOpen }]">
          <router-link to="/">Inicio</router-link>
          <router-link to="/algoritmos">Algoritmos</router-link>
          <router-link to="/grafos">Grafos</router-link>
          <router-link to="/help">Help</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2026 - UCB</p>
        <p>Trabajo por: Paulo</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  margin: 0 ;
  padding: 0 30px;
}

.header {
  background-color: #000000;
  border-bottom: 1px solid #1f2937;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}


.nav {
  display: flex;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav a {
  text-decoration: none;
  color: #9ca3af;
  font-size: 15px;
  transition: 0.2s;
}

.nav a:hover {
  color: white;
}

.router-link-active {
  color: white;
  border-bottom: 2px solid white;
  padding-bottom: 4px;
}


.main {
  flex: 1;
  padding: 20px 0;
  background-color: #111827;
}

.footer {
  background-color: #111827;
  border-top: 1px solid #1f2937;
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
  color: #6b7280;
}


@media (max-width: 768px) {

  .logo {
    font-size: 16px; 
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #000000;
    flex-direction: column;
    gap: 20px;
    padding: 80px 20px 20px 20px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .nav.open {
    transform: translateY(0);
  }


  .nav a {
    font-size: 18px;
    color: #f3f4f6;
  }


  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 110;
  }

  .hamburger span {
    display: block;
    height: 3px;
    background-color: #f1f5f9;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .hamburger span.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }
  .hamburger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
</style>
