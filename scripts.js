/* ==========================================================
   💚 SCRIPTS.JS – TRADUCCIÓN GLOBAL POR SELECTORES (ES/EN)
   📅 2025-11-03
   ----------------------------------------------------------
   Propósito:
   - Traducir TODO sin modificar el HTML.
   - Usa selectores → claves i18n (es.json / en.json).
   - Mantiene menú móvil y data-lang existente.
========================================================== */

let currentLang = "es";
let I18N = {}; // objeto con las claves cargadas de i18n/{lang}.json

// --------- Mapeo: selector → clave i18n (text | placeholder) ----------
const MAP = [
  // <title>
  { type: "title", key: "site_title" },

  // Header
  { sel: ".tagline p", key: "header_tagline" },

  // Menú (por orden visual)
  { sel: ".nav a:nth-child(1)", key: "menu_home" },
  { sel: ".nav a:nth-child(2)", key: "menu_about" },
  { sel: ".nav a:nth-child(3)", key: "menu_results" },
  { sel: ".nav a:nth-child(4)", key: "menu_resources" },
  { sel: ".nav a:nth-child(5)", key: "menu_pricing" },
  { sel: ".nav a:nth-child(6)", key: "menu_contact" },

  // HERO
  { sel: "#hero .hero-content h1", key: "hero_title" },
  { sel: "#hero .hero-subtext", key: "hero_subtext" },
  // (si existe un CTA debajo del logo)
  { sel: '#hero .hero-content p[style*="font-style:italic"]', key: "hero_cta" },

  // ABOUT (si usas data-lang, lo seguimos mostrando/ocultando; si algún título único existe, lo traducimos)
  { sel: "#about h2", key: "about_title" },

  // RESULTS
  { sel: "#results h2, .results-section h2", key: "results_title" },
  { sel: "#results p:nth-of-type(1), .results-section > div > p:nth-of-type(1)", key: "results_intro" },
  { sel: "#results p:nth-of-type(2), .results-section > div > p:nth-of-type(2)", key: "results_paragraph2" },
/* ==========================================================
   🌍 BLOQUE JS: EXTENSIÓN DE TRADUCCIÓN – PÁRRAFOS ADICIONALES RESULTADOS
   📅 Fecha: 2025-11-06
   ----------------------------------------------------------
   Propósito:
   - Incluir la traducción de todos los párrafos dentro de la
     sección “Resultados”, más allá de los dos iniciales.
   - Mantiene el mismo sistema de mapeo por selectores.
   - Compatible con la estructura actual del sitio SBELTUS.
========================================================== */

{ sel: "#results p:nth-of-type(3), .results-section > div > p:nth-of-type(3)", key: "results_paragraph3" },
{ sel: "#results p:nth-of-type(4), .results-section > div > p:nth-of-type(4)", key: "results_paragraph4" },
{ sel: "#results p:nth-of-type(5), .results-section > div > p:nth-of-type(5)", key: "results_paragraph5" },
{ sel: "#results p:nth-of-type(6), .results-section > div > p:nth-of-type(6)", key: "results_paragraph6" },
/* ==========================================================
   🌍 BLOQUE JS: EXTENSIÓN FINAL DE TRADUCCIÓN – PÁRRAFO 7 RESULTADOS
   📅 Fecha: 2025-11-06
   ----------------------------------------------------------
   Propósito:
   - Incluir el último párrafo (7) de la sección Resultados,
     que inicia con “Debemos también tener claro…”.
   - Mantiene la misma estructura del resto de selectores.
========================================================== */

{ sel: "#results p:nth-of-type(7), .results-section > div > p:nth-of-type(7)", key: "results_paragraph7" },

  { sel: "#results h3:nth-of-type(1), .results-section h3:nth-of-type(1)", key: "results_sub1" },
  { sel: "#results h3:nth-of-type(2), .results-section h3:nth-of-type(2)", key: "results_sub2" },
  { sel: "#results h3:nth-of-type(3), .results-section h3:nth-of-type(3)", key: "results_sub3" },
  // leyenda bajo la imagen (si existe)
  { sel: '#results [style*="font-style:italic"][style*="color"], .results-section [style*="font-style:italic"][style*="color"]', key: "results_image_caption" },

  // RESOURCES
  { sel: "#resources h2", key: "resources_title" },
  { sel: "#resources p", key: "resources_description" },
  { sel: '#resources a[href*="who.int"]', key: "resources_link1" },

  // PLAN
  { sel: "#pricing h2", key: "plan_title" },
  { sel: "#pricing .plan-description", key: "plan_description" },
  { sel: "#pricing .plan-card h3", key: "plan_card_title" },
  { sel: "#pricing .plan-features li:nth-child(1)", key: "plan_feature1" },
  { sel: "#pricing .plan-features li:nth-child(2)", key: "plan_feature2" },
  { sel: "#pricing .plan-features li:nth-child(3)", key: "plan_feature3" },
  { sel: "#pricing .plan-price", key: "plan_price" },
  { sel: "#pricing .plan-btn#paypal-button", key: "plan_button" },

  // CONTACT
  { sel: "#contact h2", key: "contact_title" },
  { sel: '#contact input[type="text"]', key: "contact_name_placeholder", attr: "placeholder" },
  { sel: '#contact input[type="email"]', key: "contact_email_placeholder", attr: "placeholder" },
  { sel: "#contact textarea", key: "contact_message_placeholder", attr: "placeholder" },
  { sel: '#contact button[type="submit"]', key: "contact_button" },
  { sel: "#contact p", key: "contact_whatsapp" },

  // FOOTER
  { sel: "footer.footer .footer-top p", key: "footer_line1" },
  { sel: 'footer.footer .legal-links a[href*="disclaimer"]', key: "footer_disclaimer" },
  { sel: 'footer.footer .legal-links a[href*="privacy"]', key: "footer_privacy" },
  { sel: 'footer.footer .legal-links a[href*="terms"]', key: "footer_terms" },
];

// --------- Carga de idioma y aplicación ---------
async function loadLanguage(lang) {
  currentLang = lang;
  try {
    const res = await fetch(`i18n/${lang}.json`);
    I18N = await res.json();
    applyTranslations();
    updateLanguageVisibility(lang); // respeta tus bloques data-lang (About)
  } catch (e) {
    console.warn("No se pudo cargar i18n/", lang, e);
  }
}

function t(key) {
  // Las claves están agrupadas por secciones (💚 HERO, 💚 PLAN, etc.)
  // Buscamos linealmente en todos los bloques
  for (const sectionKey in I18N) {
    const section = I18N[sectionKey];
    if (section && typeof section === "object" && key in section) {
      return section[key];
    }
  }
  return null;
}

function applyTranslations() {
  // <title>
  const titleVal = t("site_title");
  if (titleVal) document.title = titleVal;

  // Recorremos el mapa de selectores
  MAP.forEach(({ sel, key, attr, type }) => {
    const value = t(key);
    if (!value) return;

    if (type === "title") {
      document.title = value;
      return;
    }

    const el = document.querySelector(sel);
    if (!el) return;

    if (attr === "placeholder") {
      el.setAttribute("placeholder", value);
    } else {
      // Evita borrar HTML interno accidental (solo textos simples)
      // Si el nodo tiene hijos (enlaces con <span>|</span>, etc.), solo cambia textContent del propio elemento si procede
      if (el.children.length === 0) {
        el.textContent = value;
      } else {
        // Para elementos con separadores (ej. enlaces del footer con <span>|</span>), si son A/texto simple: cambia solo el nodo de texto
        if (el.tagName === "A") el.textContent = value;
      }
    }
  });
document.body.classList.add('translated');


/* 🌿 BLOQUE JS: Sincronización de repintado tras traducción – 2025-11-11 */
/* 📍 Inserta al final de la función applyTranslations(), justo antes de la llave final "}" */

  // 🌿 Corrección: estabiliza la posición tras traducir en móvil
  if (window.innerWidth <= 820) {
    // Espera un ciclo de render antes de recalcular posición
    requestAnimationFrame(() => {
      window.scrollTo({ top: window.scrollY, behavior: "instant" });
    });
  }

}

// --------- Exponer botón ES/EN ---------
function setLanguage(lang) {
  loadLanguage(lang);
}

// --------- Mantener tu comportamiento previo (data-lang y menú) ---------
function updateLanguageVisibility(lang) {
  document.querySelectorAll("[data-lang]").forEach(block => {
    block.style.display = (block.getAttribute("data-lang") === lang) ? "block" : "none";
  });
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

  // Idioma por defecto
  updateLanguageVisibility("es");
  loadLanguage("es");

  // Cierre automático en móvil
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuToggle && menuToggle.classList.remove("open");
      }
    });
  });
});

// Hacer global para los botones ES/EN del HTML
window.setLanguage = setLanguage;
