/* ==========================================================
   ✅ ARCHIVO: scripts.js (versión funcional SBELTUS)
   📅 Fecha: 2025-10-27
   ----------------------------------------------------------
   - Controla menú hamburguesa
   - Cambia idioma ES/EN
   - Muestra solo bloques del idioma activo
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

function updateLanguageVisibility(lang) {
  const blocks = document.querySelectorAll('[data-lang]');
  blocks.forEach(block => {
    block.style.display = (block.getAttribute('data-lang') === lang) ? 'block' : 'none';
  });
}

function setLanguage(lang) {
  loadLanguage(lang);
  updateLanguageVisibility(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
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
