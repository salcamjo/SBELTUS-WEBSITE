/* ==========================================================
   ✅ ARCHIVO: scripts.js (versión depurada SBELTUS)
   ----------------------------------------------------------
   Propósito:
   - Mantiene activo el sistema de cambio de idioma.
   - Elimina el bloque duplicado que controlaba el menú.
   - No interfiere con el script del index.html.
=========================================================== */

let translations = {};
let currentLang = 'es';

/* === Cargar idioma === */
async function loadLanguage(lang) {
  try {
    const res = await fetch(`i18n/${lang}.json`);
    translations = await res.json();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.innerText = translations[key];
    });
    currentLang = lang;
  } catch (err) {
    console.warn("No se pudo cargar el archivo de idioma:", err);
  }
}

/* === Cambiar idioma manualmente === */
function setLanguage(lang) {
  loadLanguage(lang);
}

/* === Inicializar idioma al cargar la página === */
window.onload = () => {
  loadLanguage(currentLang);
};
