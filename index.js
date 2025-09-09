window.addEventListener("DOMContentLoaded", () => {
  const saludoEl = document.getElementById("saludo");
  const hora = new Date().getHours();
  let saludo = "";

  if (hora >= 6 && hora < 12) {
    saludo = "¡Buenos días!";
  } else if (hora >= 12 && hora < 19) {
    saludo = "¡Buenas tardes!";
  } else {
    saludo = "¡Buenas noches!";
  }

  saludoEl.textContent = saludo;
});
