// ==UserScript==
// @name         YouTube - Ocultar Comentarios
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Elimina por completo la seccion de comentarios
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*
      OBJETIVO DEL SCRIPT:
      Elimina por completo la sección de comentarios de cualquier vídeo en YouTube.
      Con esto se consigue una interfaz más limpia, se evitan distracciones y spoilers,
      y se optimiza la experiencia visual manteniendo el foco exclusivamente en el contenido del vídeo.
    */

    const eliminarComentarios = () => {
        const selectores = [
            '#comments',
            'ytd-comments',
            '#contents.ytd-item-section-renderer'
        ];

        selectores.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el.closest('#below') || el.id === 'comments' || el.tagName.toLowerCase() === 'ytd-comments') {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                }
            });
        });
    };

    setInterval(eliminarComentarios, 500);
})();