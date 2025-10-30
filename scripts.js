/* ==========================================================
   ✅ ARCHIVO: scripts.js (versión limpia y funcional)
   📅 Fecha: 2025-10-30
   ----------------------------------------------------------
   - Elimina duplicado de setLanguage()
   - Mantiene control ES/EN y menú hamburguesa
========================================================== */

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

/* ------------------------------------------------------------
   ✅ BLOQUE JS: Control visual de secciones bilingües (ES / EN)
   ------------------------------------------------------------ */
function updateLanguageVisibility(lang) {
  const blocks = document.querySelectorAll('[data-lang]');
  blocks.forEach(block => {
    block.style.display = (block.getAttribute('data-lang') === lang)
      ? 'block' : 'none';
  });
}

function setLanguage(lang) {
  loadLanguage(lang);
  updateLanguageVisibility(lang);
}

/* ------------------------------------------------------------
   ✅ BLOQUE JS: Menú hamburguesa funcional
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    nav.classList.remove("active");
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820 && nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });
  }

  updateLanguageVisibility('es');
});
