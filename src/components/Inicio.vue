<template>
  <section class="portada">


    <div class="institucion">
      <h2>Universidad Catolica Boliviana</h2>
      <p>Facultad de Ingeniería</p>
      <p>Carrera de Ingeniería de Sistemas</p>
    </div>
    <div class="logo-container">
      <img src="../assets/logo-UCB.png" alt="Logo Universidad" class="logo" />
    </div>
   
    <div class="titulo">
      <h1>Algoritmos</h1>
    </div>

    
    <div class="info">
      <p><strong>Materia:</strong> Analisis de Algoritmos</p>
      <p><strong>Docente:</strong> Yamil Cardenas</p>
      <p><strong>Estudiante:</strong> Paulo Roberto Escaray Rivero</p>
      <p><strong>Gestión:</strong> 2026</p>
    </div>

  </section>
</template>

<style scoped>
.portada {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.8;
  color: #e5e7eb;
  padding: 40px 20px;
}


.logo-container {
  margin: 30px 0;
}

.logo {
  width: 320px;
  height: auto;
  filter: drop-shadow(0 6px 20px rgba(0,0,0,0.5));
}


.institucion {
  padding: 20px 30px;
  border-radius: 12px;
}

.institucion h2 {
  font-size: 22px;
  font-weight: bold;
  color: #f9fafb;
}

.institucion p {
  font-size: 16px;
  color: #d1d5db;
}


.titulo {
  margin: 35px 0;
}

.titulo h1 {
  font-size: 36px;
  font-weight: bold;
  max-width: 800px;
  color: #ffffff;
}


.info {

  padding: 20px 30px;
  border-radius: 12px;
  
}

.info p {
  font-size: 15px;
  margin-bottom: 6px;
  color: #d1d5db;
}

.info strong {
  color: #ffffff;
}

</style>
