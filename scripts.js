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

/* -------------------------------------------------
   🔹 SCRIPT: Control seguro del menú hamburguesa
   🔹 Evita franja superior y mantiene colores intactos
--------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function() {
      nav.classList.toggle("active");
    });

    // Cierra el menú al hacer clic en un enlace
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }
});
