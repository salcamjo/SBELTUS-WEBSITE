/* ==========================================================
   ✅ ARCHIVO: scripts.js (versión final 30-10-2025)
   ----------------------------------------------------------
   - Menú hamburguesa
   - Bilingüe ES / EN
   - Con fallback cuando se abre local (file://)
========================================================== */

let translations = {};
let currentLang = 'es';

async function loadLanguage(lang) {
  try {
    const res = await fetch(`i18n/${lang}.json`);
    const data = await res.json();
    translations = data;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.innerText = translations[key];
    });
  } catch (err) {
    // 👇 Si estás abriendo local (file://) y no puede hacer fetch, no rompe
    console.warn("No se pudo cargar i18n, mostrando texto por defecto.");
  }
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

  // idioma por defecto
  updateLanguageVisibility('es');
  loadLanguage('es');
});
/* -----------------------------------------
   BLOQUE JS: Cierre automático del menú móvil
   Fecha: 30/10/2025
   Función: Cuando se hace clic en un enlace del menú
   en modo móvil, el menú se cierra y reaparecen las tres rayas.
------------------------------------------ */

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.menu-toggle');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggle.classList.remove('open');
    }
  });
});
