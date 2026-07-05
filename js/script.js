(function () {
  "use strict";

  var root = document.documentElement;

  var STRINGS = {
    title: {
      fi: "Selinin Marjatila – Mansikkaa ja vadelmaa Launosista",
      sv: "Selinin Marjatila – Jordgubbar och hallon från Launonen",
      en: "Selinin Marjatila – Strawberries and Raspberries from Launonen"
    },
    desc: {
      fi: "Selinin Marjatila kasvattaa mansikkaa, vadelmaa, varhaisperunaa ja herneitä Launosissa, Lopella. Itsepoimintaa ja tuoretta satoa suoraan tilalta.",
      sv: "Selinin Marjatila odlar jordgubbar, hallon, färskpotatis och ärtor i Launonen, Loppis. Självplock och färsk skörd direkt från gården.",
      en: "Selinin Marjatila grows strawberries, raspberries, early potatoes and peas in Launonen, Loppi. Self-picking and fresh harvest straight from the farm."
    }
  };

  function setLanguage(lang) {
    if (["fi", "sv", "en"].indexOf(lang) === -1) lang = "fi";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    document.title = STRINGS.title[lang];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", STRINGS.desc[lang]);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem("selinin-lang", lang); } catch (e) {}
  }

  function initLanguage() {
    var stored = null;
    try { stored = localStorage.getItem("selinin-lang"); } catch (e) {}
    setLanguage(stored || "fi");
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-lang-btn"));
      var nav = document.querySelector("[data-nav]");
      var toggle = document.querySelector("[data-nav-toggle]");
      if (nav && nav.classList.contains("open")) { nav.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  });

  initLanguage();

  var header = document.querySelector("[data-header]");
  function onScroll() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
