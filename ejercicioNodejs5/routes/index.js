var express = require('express');
var router = express.Router();

/* GET página de inicio */
router.get('/', function(req, res, next) {
  const productos = [
    { id: 1, nombre: 'A Light in the Attic', categoria: 'Libro - Poesía' },
    { id: 2, nombre: 'Dune: Parte 2', categoria: 'Película - Ciencia Ficción' },
    { id: 3, nombre: 'Sapiens: Breve historia de la humanidad', categoria: 'Libro - Ensayo' },
    { id: 4, nombre: 'Oppenheimer', categoria: 'Película - Drama Histórico' }
  ];

  res.render('index', { 
    title: 'Portal Multimedia',
    cursos: productos
  });
});

/* GET página de login */
router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Demo Login'
  });
});

module.exports = router;