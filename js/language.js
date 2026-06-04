/*
  Simple i18n engine for IsokoRyawe.

  Usage:
    - Add data-i18n="some.key" to any element you want translated.
    - Use <select onchange="switchLanguage(this.value)">...

  This file was created because pages already call switchLanguage(...)
  but js/language.js was missing in the repo.
*/

(function () {
  const STORAGE_KEY = "isokoLanguage";

  const DICTIONARY = {
    rw: {
      // Navbar
      "nav.home": "🏠 Ahabanza",
      "nav.market": "🛒 Sura Isoko",
      "nav.about": "ℹ️ About Us",
      "nav.login": "🔐 Injira",
      "nav.logout": "🚪 Sohokamo",
      "nav.dashboard": "🛡️ Admin Dashboard",
      "nav.farmer": "👩‍🌾 Farmer Panel",
      "nav.profile": "👤 Umwirondoro",

      // Common pages
      "footer.about": "About Us",
      "footer.login": "Injira",
      "footer.home": "Ahabanza",
      "footer.market": "Isoko",

      // Index
      "index.title": "Impamvu guhitamo IsokoRyawe",
      "index.feature1": "⚡ Byoroshye kandi bwihuse",
      "index.feature1.desc": "Ongeramo umusaruro wawe mu masaha make, kandi abaguzi bazawubona mu buryo bwihuta.",
      "index.feature2": "🤝 Nta bakomiseri",
      "index.feature2.desc": "Ucuruza neza ku buryo butaziguye, uhitemo uburyo bwo kuvugana kuri WhatsApp cyangwa guhamagara.",
      "index.feature3": "🛡️ Amakuru yizewe",
      "index.feature3.desc": "Abaguzi babona ibisobanuro birambuye ku musaruro, aho uherereye, ndetse n'amafoto yizewe.",
      "index.process": "Uko bikorwa",
      "index.step1": "✍️ Iyandikishe",
      "index.step1.desc": "Fungura konti yawe mu buryo bwihuse kandi butekanye kugira ngo utangire kwerekana ibikorwa byawe.",
      "index.step2": "📦 Tangira gusangiza",
      "index.step2.desc": "Shyiraho ibicuruzwa byawe, amafoto y'ubwiza, ibiciro n'ubusobanuro bwuzuye.",
      "index.step3": "💬 Vugana n'abaguzi",
      "index.step3.desc": "Abaguzi bashobora kukuvugisha kuri WhatsApp cyangwa kukuhamagara kugirango muzungurane amakuru y'ibicuruzwa."
    },
    en: {
      // Navbar
      "nav.home": "🏠 Home",
      "nav.market": "🛒 Browse Marketplace",
      "nav.about": "ℹ️ About Us",
      "nav.login": "🔐 Login",
      "nav.logout": "🚪 Logout",
      "nav.dashboard": "🛡️ Admin Dashboard",
      "nav.farmer": "👩‍🌾 Farmer Panel",
      "nav.profile": "👤 Profile",

      // Common pages
      "footer.about": "About Us",
      "footer.login": "Login",
      "footer.home": "Home",
      "footer.market": "Market",

      // Index
      "index.title": "Why choose IsokoRyawe",
      "index.feature1": "⚡ Easy & fast",
      "index.feature1.desc": "Add your produce in minutes and buyers can find it instantly.",
      "index.feature2": "🤝 No middlemen",
      "index.feature2.desc": "Sell directly and choose how to communicate: WhatsApp or call.",
      "index.feature3": "🛡️ Trusted information",
      "index.feature3.desc": "Buyers see detailed produce info, location, and real photos.",
      "index.process": "How it works",
      "index.step1": "✍️ Register",
      "index.step1.desc": "Open your account quickly and securely to start listing your products.",
      "index.step2": "📦 Start listing",
      "index.step2.desc": "Add your products, quality photos, price, and full description.",
      "index.step3": "💬 Talk to buyers",
      "index.step3.desc": "Buyers can message you on WhatsApp or call to share order details."
    },
    fr: {
      "nav.home": "🏠 Accueil",
      "nav.market": "🛒 Marché",
      "nav.about": "ℹ️ À propos",
      "nav.login": "🔐 Connexion",
      "nav.logout": "🚪 Déconnexion",
      "nav.dashboard": "🛡️ Tableau admin",
      "nav.farmer": "👩‍🌾 Espace producteur",
      "nav.profile": "👤 Profil"
    },
    sw: {
      "nav.home": "🏠 Mwanzo",
      "nav.market": "🛒 Soko",
      "nav.about": "ℹ️ Kuhusu",
      "nav.login": "🔐 Ingia",
      "nav.logout": "🚪 Toka",
      "nav.dashboard": "🛡️ Dashibodi ya Admin",
      "nav.farmer": "👩‍🌾 Jopo la Mkulima",
      "nav.profile": "👤 Wasifu"
    }
  };

  function normalizeLang(lang) {
    const l = String(lang || "").toLowerCase();
    if (DICTIONARY[l]) return l;
    if (l.startsWith("rw")) return "rw";
    if (l.startsWith("en")) return "en";
    if (l.startsWith("fr")) return "fr";
    if (l.startsWith("sw")) return "sw";
    return "rw";
  }

  function applyLanguage(lang) {
    const code = normalizeLang(lang);
    const dict = DICTIONARY[code] || DICTIONARY.rw;

    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;

      const value = dict[key];
      if (typeof value === "string" && value.length > 0) {
        el.textContent = value;
      }
    });

    // If there are elements where full HTML is required, add data-i18n-html later.
  }

  function syncLanguageSelect(lang) {
    const sel = document.getElementById("languageSelect");
    if (!sel) return;
    const code = normalizeLang(lang);
    sel.value = code;
  }

  function switchLanguage(lang) {
    const code = normalizeLang(lang);
    localStorage.setItem(STORAGE_KEY, code);
    syncLanguageSelect(code);
    applyLanguage(code);
  }

  // Expose globally for inline onchange="switchLanguage(...)"
  window.switchLanguage = switchLanguage;

  document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const lang = stored || document.documentElement.getAttribute("lang") || "rw";
    syncLanguageSelect(lang);
    applyLanguage(lang);
  });
})();

