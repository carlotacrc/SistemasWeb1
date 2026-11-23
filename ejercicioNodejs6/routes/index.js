var express = require('express');
var router = express.Router();

/* Página de inicio */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Web con Chat',
    user: req.session.user || null
  });
});

/* Mostrar formulario de Login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión' });
});

/* Procesar Login */
router.post('/login', function(req, res, next) {
  const { username } = req.body;
  if (username && username.trim() !== '') {
    req.session.user = username.trim();
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

/* Cerrar sesión */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

/* Sala de Chat (restringida) */
router.get('/chat', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('chat', { 
    title: 'Sala de Chat',
    user: req.session.user
  });
});

module.exports = router;