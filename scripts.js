let translations = {};
let currentLang = 'es';

async function loadLanguage(lang) {
  const res = await fetch(`i18n/${lang}.json`);
  translations = await res.json();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.innerText = translations[key];
  });
  currentLang = lang;
}

function setLanguage(lang) {
  loadLanguage(lang);
}

window.onload = () => {
  loadLanguage(currentLang);
};
// Esperar a que el DOM esté listo

/* -------------------------------------------------
   ✅ BLOQUE JS CORREGIDO: Activar menú hamburguesa SBELTUS
   📌 Función:
   - Activa el despliegue/ocultamiento del menú en móvil.
   - Asegura que solo una instancia maneje el evento.
   ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
