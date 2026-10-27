const http = require('http');
const cheerio = require('cheerio');

const PUERTO = 3000;
const URL_OBJETIVO = 'http://books.toscrape.com/';

let libros = [];

async function actualizarLibros() {
  try {
    const respuesta = await fetch(URL_OBJETIVO);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const html = await respuesta.text();
    const $ = cheerio.load(html);
    const nuevosLibros = [];

    $('.product_pod').each((index, elemento) => {
      const titulo = $(elemento).find('h3 a').attr('title');
      const precio = $(elemento).find('.price_color').text().trim();
      const stock = $(elemento).find('.availability').text().trim();

      if (titulo) {
        nuevosLibros.push({
          titulo,
          precio,
          disponibilidad: stock
        });
      }
    });

    libros = nuevosLibros;
    console.log(`[${new Date().toLocaleTimeString()}] Scraping completado con éxito: ${libros.length} libros extraídos.`);
  } catch (error) {
    console.error('Error al actualizar los datos:', error.message);
  }
}

actualizarLibros();

setInterval(actualizarLibros, 60000);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({
    fuente: URL_OBJETIVO,
    ultimaActualizacion: new Date().toISOString(),
    totalLibros: libros.length,
    libros: libros
  }, null, 2));
});

server.listen(PUERTO, () => {
  console.log(`Servidor activo en http://localhost:${PUERTO}`);
});