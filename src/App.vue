<script setup>
</script>

<template>
  <div class="layout">


    <header class="header">
      <div class="container header-content">
        <h1 class="logo">Simulador de Grafos</h1>

        <nav class="nav">
          <router-link to="/">Inicio</router-link>
          <router-link to="/algoritmos">Algoritmos</router-link>
          <router-link to="/grafos">Grafos</router-link>
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

<style>

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
}


.logo {
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
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
</style>
