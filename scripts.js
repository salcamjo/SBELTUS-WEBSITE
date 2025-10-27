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
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle"); // botón ☰
  const nav = document.querySelector(".nav"); // menú de navegación

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active"); // abre/cierra el menú
    });
  }
});

/* ------------------------------------------------------------
   ✅ BLOQUE JS: Control visual de secciones bilingües (ES / EN)
   📅 Fecha: 2025-10-27
   ------------------------------------------------------------
   Propósito:
   - Al pulsar los botones ES / EN, muestra solo el texto del idioma elegido.
   - Funciona con los bloques: <div data-lang="es"> y <div data-lang="en">
   - No interfiere con el sistema i18n existente.
------------------------------------------------------------- */

function updateLanguageVisibility(lang) {
  const blocks = document.querySelectorAll('[data-lang]');
  blocks.forEach(block => {
    block.style.display = (block.getAttribute('data-lang') === lang) ? 'block' : 'none';
  });
}

// 🔹 Reemplazamos el comportamiento del cambio de idioma
function setLanguage(lang) {
  loadLanguage(lang);
  updateLanguageVisibility(lang);
}

// 🔹 Asegura que al cargar la página se muestre el idioma por defecto (ES)
document.addEventListener("DOMContentLoaded", () => {
  updateLanguageVisibility('es');
});
