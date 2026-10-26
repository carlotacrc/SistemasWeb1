const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

const contenido = fs.readFileSync('diccionario.txt', 'utf8');
const diccionario = contenido.split(/\r?\n/).filter(palabra => palabra.trim() !== '');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    const cantidad = parseInt(parsedUrl.query.palabras, 10) || 3;

    const seleccionadas = [];
    for (let i = 0; i < cantidad; i++) {
      const indiceAleatorio = Math.floor(Math.random() * diccionario.length);
      seleccionadas.push(diccionario[indiceAleatorio]);
    }

    const contrasena = seleccionadas.join('-');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<h1>Contraseña generada:</h1><p><strong>${contrasena}</strong></p>`);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Ruta no encontrada');
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});