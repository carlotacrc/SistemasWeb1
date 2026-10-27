const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

const sandia = new Image();
sandia.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M10 30 Q50 100 90 30 Z' fill='%23e63946'/><path d='M10 30 Q50 100 90 30' fill='none' stroke='%232a9d8f' stroke-width='14'/><circle cx='35' cy='45' r='3' fill='black'/><circle cx='65' cy='45' r='3' fill='black'/><circle cx='50' cy='60' r='3' fill='black'/></svg>";

let cestaX = 200;
let sandiaX = 200;
let sandiaY = 0;
let puntos = 0; 

let tiempoPrevio = 0;

canvas.addEventListener("mousemove", function(evento) {
  const rect = canvas.getBoundingClientRect();
  cestaX = evento.clientX - rect.left - 40;
});

function reiniciarSandia() {
  sandiaY = -40;
  sandiaX = Math.random() * (canvas.width - 40);
}

function dibujar(tiempoActual) {
  if (!tiempoPrevio) tiempoPrevio = tiempoActual;
  let delta = (tiempoActual - tiempoPrevio) / 1000;
  tiempoPrevio = tiempoActual;

  sandiaY += 180 * delta;

  let tocaAltura = sandiaY + 40 >= 350 && sandiaY <= 370;

  let tocaHorizontal = sandiaX + 35 >= cestaX && sandiaX <= cestaX + 80;

  if (tocaAltura && tocaHorizontal) {
    puntos++;             
    reiniciarSandia();    
  }

  if (sandiaY > canvas.height) {
    reiniciarSandia();    
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  ctx.fillStyle = "#2a9d8f"; 
  ctx.fillRect(cestaX, 350, 80, 20);

  ctx.drawImage(sandia, sandiaX, sandiaY, 40, 40);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Sandías atrapadas: " + puntos, 20, 35);

  window.requestAnimationFrame(dibujar);
}

window.requestAnimationFrame(dibujar);