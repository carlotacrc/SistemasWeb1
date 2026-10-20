const http = require('http');
const os = require('os');
const config = require('./config.json');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<h1>Servidor de Monitorización - Ejercicio 1</h1>');
});

function mostrarMetricasPeriodicas() {
  console.log('\n--- MÉTRICAS PERIÓDICAS ---');

  if (config.metricas.cpu) {
    console.log(`- CPU: ${os.cpus().length} núcleos (${os.cpus()[0].model})`);
    console.log('  Uso de CPU del proceso:', process.cpuUsage());
  }

  if (config.metricas.memoria) {
    const memLibreMB = (os.freemem() / (1024 * 1024)).toFixed(2);
    const memTotalMB = (os.totalmem() / (1024 * 1024)).toFixed(2);
    const heapUsadoMB = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
    console.log(`- Memoria RAM del equipo: ${memLibreMB} MB libres / ${memTotalMB} MB totales`);
    console.log(`- Memoria usada por Node.js: ${heapUsadoMB} MB`);
  }

  if (config.metricas.uptimeSistema) {
    console.log(`- Tiempo activo del sistema (SO): ${os.uptime().toFixed(1)} segundos`);
  }

  if (config.metricas.uptimeNode) {
    console.log(`- Tiempo activo de Node.js: ${process.uptime().toFixed(1)} segundos`);
  }

  console.log('---------------------------');
}

server.listen(PORT, () => {
  console.log(`Servidor iniciado correctamente en http://localhost:${PORT}`);
  console.log('==============================================');
  console.log('=== INFORMACIÓN INICIAL DEL SISTEMA ===');
  console.log(`- Versión de Node.js: ${process.version}`);
  console.log(`- Sistema Operativo: ${os.type()} (${process.platform})`);
  console.log(`- Versión del SO: ${os.release()}`);
  console.log(`- Arquitectura: ${process.arch}`);
  console.log(`- Nombre del host: ${os.hostname()}`);
  console.log('==============================================\n');

  const segundos = config.intervaloSegundos || 5;
  setInterval(mostrarMetricasPeriodicas, segundos * 1000);
});