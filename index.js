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

  // Commit 4 - funcionalidad de mostrar/ocultar información de contacto
  const contactToggle = document.getElementById("contact-toggle");
  const contactInfo = document.getElementById("contact-info");
  const contactIcon = document.getElementById("contact-icon");

  // Cambiar estado del botón y mostrar/ocultar contacto
  function toggleContact() {
    const isVisible = contactInfo.style.display !== "none";
    
    if (isVisible) {
      contactInfo.style.display = "none";
      contactIcon.textContent = "📧";
      contactToggle.innerHTML = '<span id="contact-icon">📧</span> Contacto';
    } else {
      contactInfo.style.display = "block";
      contactIcon.textContent = "❌";
      contactToggle.innerHTML = '<span id="contact-icon">❌</span> Ocultar';
    }
  }

  // Event listener para el botón de contacto
  contactToggle.addEventListener("click", toggleContact);

  // Commit 5 - buscador de habilidades
  const skillSearch = document.getElementById("skill-search");
  const clearSearch = document.getElementById("clear-search");
  const skillItems = document.querySelectorAll(".skill-item");

  // Función para filtrar habilidades
  function filterSkills() {
    const searchTerm = skillSearch.value.toLowerCase().trim();
    
    skillItems.forEach(item => {
      const skillText = item.textContent.toLowerCase();
      const skillData = item.getAttribute("data-skill").toLowerCase();
      
      // Mostrar si coincide con el texto o con el data-skill
      if (skillText.includes(searchTerm) || skillData.includes(searchTerm)) {
        item.style.display = "block";
        item.classList.add("highlight");
      } else {
        item.style.display = "none";
        item.classList.remove("highlight");
      }
    });

    // Mostrar mensaje si no hay resultados
    showNoResultsMessage(searchTerm);
  }

  // Mostrar mensaje cuando no hay resultados
  function showNoResultsMessage(searchTerm) {
    if (searchTerm === "") return;

    const visibleItems = Array.from(skillItems).filter(item => item.style.display !== "none");
    
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector(".no-results-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    if (visibleItems.length === 0) {
      const noResultsDiv = document.createElement("div");
      noResultsDiv.className = "no-results-message alert alert-info mt-2";
      noResultsDiv.innerHTML = `<i class="bi bi-search"></i> No se encontraron habilidades que coincidan con "${searchTerm}"`;
      
      // Insertar después del último grupo de habilidades
      const lastList = document.querySelector("#softskills-list");
      lastList.parentNode.insertBefore(noResultsDiv, lastList.nextSibling);
    }
  }

  // Limpiar búsqueda
  function clearSkillSearch() {
    skillSearch.value = "";
    skillItems.forEach(item => {
      item.style.display = "block";
      item.classList.remove("highlight");
    });
    
    // Remover mensaje de no resultados
    const noResultsMessage = document.querySelector(".no-results-message");
    if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }

  // Event listeners
  skillSearch.addEventListener("input", filterSkills);
  clearSearch.addEventListener("click", clearSkillSearch);

  // Limpiar búsqueda con Escape
  skillSearch.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearSkillSearch();
      skillSearch.focus();
    }
  });
});

