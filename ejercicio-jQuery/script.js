$(function() {

  $("#btn-abrir-registro").click(function() {
    $("#contenedor-principal").hide();
    $("#contenedor-formulario").show();
  });

  $("#btn-cancelar").click(function() {
    $(".error").text(""); 
    $("#form-registro")[0].reset(); 
    $("#contenedor-formulario").hide();
    $("#contenedor-principal").show();
  });

  $("#form-registro").on("submit", function(e) {
    e.preventDefault();

    $(".error").text("");

    let formularioValido = true;

    let nombre = $("#nombre").val().trim();
    let email = $("#email").val().trim();
    let telefono = $("#telefono").val().trim();
    let password = $("#password").val();

    let patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
    if (!patronNombre.test(nombre)) {
      $("#error-nombre").text("Debe contener al menos dos palabras y solo letras.");
      formularioValido = false;
    }

    let patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(email)) {
      $("#error-email").text("Introduce un correo electrónico válido (ejemplo: usuario@correo.com).");
      formularioValido = false;
    }

    let patronTelefono = /^[0-9]{9,}$/;
    if (!patronTelefono.test(telefono)) {
      $("#error-telefono").text("Debe contener solo números, sin espacios (mínimo 9 cifras).");
      formularioValido = false;
    }

    let patronPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!patronPassword.test(password)) {
      $("#error-password").text("Mínimo 8 caracteres con al menos una mayúscula, una minúscula y un número.");
      formularioValido = false;
    }

    if (formularioValido) {
      alert("¡Registro completado con éxito! Bienvenido a la frutería.");
      $("#form-registro")[0].reset();
      $("#contenedor-formulario").hide();
      $("#contenedor-principal").show();
    }

  });

});