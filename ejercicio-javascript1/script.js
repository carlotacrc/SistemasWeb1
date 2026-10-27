const diccionario = [
  "acrata", "afaca", "absit", "agape", "arbol", "cielo",
  "sol", "luna", "rio", "mar", "viento", "fuego",
  "nube", "bosque", "puente", "camino", "piedra", "estrella"
];

function generarContrasena() {
  const cantidad = parseInt(document.getElementById("numero").value, 10);
  const enMayusculas = document.getElementById("checkMayus").checked;
  const noRepetir = document.getElementById("checkNoRepetir").checked;

  let palabrasDisponibles = [...diccionario];
  let contrasena = "";

  for (let i = 0; i < cantidad; i++) {
    if (palabrasDisponibles.length === 0) break;

    const indice = Math.floor(Math.random() * palabrasDisponibles.length);
    let palabra = palabrasDisponibles[indice];

    if (noRepetir) {
      palabrasDisponibles.splice(indice, 1);
    }

    if (enMayusculas) {
      palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    }

    contrasena += palabra;
  }

  document.getElementById("resultado").textContent = "La contraseña generada es: " + contrasena;
}

document.getElementById("boton").addEventListener("click", generarContrasena);