document.addEventListener("DOMContentLoaded", () => {
  // Commit 1 - saludo dinámico
  const saludoEl = document.createElement("h1");
  saludoEl.className = "text-center my-4";
  document.body.prepend(saludoEl);

  function actualizarSaludo() {
    const hora = moment().hour();
    let saludo = "Hola";
    if (hora < 12) saludo = "¡Buenos días!";
    else if (hora < 18) saludo = "¡Buenas tardes!";
    else saludo = "¡Buenas noches!";
    saludoEl.textContent = saludo + " Soy Matías Arroyo.";
  }

  actualizarSaludo();
  setInterval(actualizarSaludo, 60000);

    // Commit 2 - botón para mostrar/ocultar experiencia
  const btnExperiencia = document.getElementById("toggle-experiencia");
  const contenidoExperiencia = document.getElementById("contenido-experiencia");

  btnExperiencia.addEventListener("click", () => {
    if (contenidoExperiencia.style.display === "none") {
      contenidoExperiencia.style.display = "block";
    } else {
      contenidoExperiencia.style.display = "none";
    }
  });
});
