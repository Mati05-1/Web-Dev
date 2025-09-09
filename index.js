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

  // Commit 3 - funcionalidad de modo oscuro/claro
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  // Cargar tema guardado o usar tema del sistema
  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    
    body.setAttribute("data-theme", theme);
    updateThemeIcon(theme);
  }

  // Actualizar icono del botón
  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  // Cambiar tema
  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  }

  // Event listener para el botón
  themeToggle.addEventListener("click", toggleTheme);

  // Cargar tema al iniciar
  loadTheme();
});
