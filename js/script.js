/* ===== Instituto Técnico Andino: script.js ===== */

// 1. Variables: guardamos los elementos de la página que vamos a usar
const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

// 2. Función: muestra un mensaje en pantalla (tipo = "success" o "danger")
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "alert alert-" + tipo + " mt-3 mb-0";   // cambia las clases de Bootstrap
}

// 3. Evento click: al elegir un programa en las tarjetas, se selecciona en el formulario
const botones = document.querySelectorAll(".btn-elegir");

for (const boton of botones) {
  boton.addEventListener("click", function () {
    document.getElementById("programa").value = boton.dataset.programa;
    document.getElementById("registro").scrollIntoView();
  });
}

// 4. Evento submit: se ejecuta al enviar el formulario
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // evita que la página se recargue

  // Leemos lo que escribió el usuario
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const edad = Number(document.getElementById("edad").value);   // texto -> número
  const programa = document.getElementById("programa").value;
  const acepto = document.getElementById("acepto").checked;     // true o false

  // Validaciones: if / else if
  if (nombre === "" || correo === "" || programa === "") {
    mostrarMensaje("Completa todos los campos.", "danger");
  } else if (!correo.includes("@")) {
    mostrarMensaje("Ingresa un correo válido.", "danger");
  } else if (edad < 16 || edad > 60) {
    mostrarMensaje("La edad debe estar entre 16 y 60 años.", "danger");
  } else if (!acepto) {
    mostrarMensaje("Debes aceptar que te contacten.", "danger");
  } else {
    // Todo correcto
    mostrarMensaje("¡Gracias " + nombre + "! Tu solicitud fue enviada.", "success");
    simularEnvio(nombre, correo, edad, programa);
  }
});

// 5. Función: simula cómo viajan los datos con POST y con GET
function simularEnvio(nombre, correo, edad, programa) {
  // POST: los datos van dentro de la petición
  const post = "POST procesar.php\n" +
               "nombre=" + nombre + "\n" +
               "correo=" + correo + "\n" +
               "edad=" + edad + "\n" +
               "programa=" + programa;

  // GET: los datos van en la URL, después del "?"
  const get = "GET procesar.php?nombre=" + nombre +
              "&correo=" + correo +
              "&edad=" + edad +
              "&programa=" + programa;

  document.getElementById("salidaPost").textContent = post;
  document.getElementById("salidaGet").textContent = get;
  document.getElementById("simulacion").classList.remove("d-none");   // muestra el bloque
}
