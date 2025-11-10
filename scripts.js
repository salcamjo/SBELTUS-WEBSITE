// ==========================================================
// 💚 SCRIPTS.JS — SISTEMA SIMPLE POR VISIBILIDAD (data-lang)
// 📅 2025-11-10
// ----------------------------------------------------------
// Qué hace:
// - Alterna entre bloques data-lang="es" y data-lang="en".
// - Persiste el idioma elegido en localStorage.
// - Mantiene el comportamiento del menú hamburguesa y autocierre.
// Qué NO hace:
// - No carga ni aplica archivos JSON (i18n). No hay MAP, ni fetch.
// - No modifica estilos ni estructura del HTML.
// Instrucción:
// - Reemplaza COMPLETAMENTE el contenido de tu scripts.js por este bloque.
// ==========================================================

// Cambia visibilidad según idioma y persiste selección
function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(block => {
    block.style.display = (block.getAttribute("data-lang") === lang) ? "block" : "none";
  });
  try { localStorage.setItem("selectedLanguage", lang); } catch (_) {}
}

// Carga idioma guardado al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = (function () {
    try { return localStorage.getItem("selectedLanguage") || "es"; }
    catch (_) { return "es"; }
  })();

  // Mostrar idioma elegido
  setLanguage(savedLang);

  // ===== Menú hamburguesa (se conserva tu comportamiento) =====
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    // Asegura estado inicial
    nav.classList.remove("active");

    // Toggle en clic
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Cierre automático al cambiar tamaño a escritorio
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820 && nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });

    // Cierre automático al hacer clic en un enlace del menú (móvil)
    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          menuToggle.classList.remove("open");
        }
      });
    });
  }
});

// Exponer para los botones ES/EN del HTML
window.setLanguage = setLanguage;
