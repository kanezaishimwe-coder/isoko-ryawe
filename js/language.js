/*
  language.js
  Default language: English
*/

(function () {
  const STORAGE_KEY = "isokoLanguage";

  const DICTIONARY = {
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

      // Footer
      "footer.contactTitle": "Contact",
      "footer.contactEmailText": "kanezaishi@gmail.com",
      "footer.contactWhatsappText": "0788206614",
      "footer.contactInstagramText": "GLORY SHEMA",
      "footer.contactHint": "Want chat or help? Send us an email.",

      // Index
      "index.title": "Why choose IsokoRyawe",
      "index.feature1": "⚡ Easy & Fast",
      "index.feature1.desc":
        "Add your produce in minutes and buyers can find it instantly.",
      "index.feature2": "🤝 No Middlemen",
      "index.feature2.desc":
        "Sell directly and choose how to communicate: WhatsApp or call.",
      "index.feature3": "🛡️ Trusted Information",
      "index.feature3.desc":
        "Buyers see detailed produce info, location and real photos.",
      "index.process": "How It Works",
      "index.step1": "✍️ Register",
      "index.step1.desc":
        "Create your account quickly and securely.",
      "index.step2": "📦 Start Listing",
      "index.step2.desc":
        "Add products, prices, photos and descriptions.",
      "index.step3": "💬 Talk to Buyers",
      "index.step3.desc":
        "Buyers can contact you through WhatsApp or phone calls."
    },

    rw: {
      // Navbar
      "nav.home": "🏠 Ahabanza",
      "nav.market": "🛒 Sura Isoko",
      "nav.about": "ℹ️ Ibyerekeye Twebwe",
      "nav.login": "🔐 Injira",
      "nav.logout": "🚪 Sohokamo",
      "nav.dashboard": "🛡️ Admin Dashboard",
      "nav.farmer": "👩‍🌾 Farmer Panel",
      "nav.profile": "👤 Umwirondoro",

      // Footer
      "footer.contactTitle": "Wasiliana",
      "footer.contactEmailText": "kanezaishi@gmail.com",
      "footer.contactWhatsappText": "0788206614",
      "footer.contactInstagramText": "GLORY SHEMA",
      "footer.contactHint":
        "Ushaka ubufasha cyangwa kuganira? Twohereze email.",

      // Index
      "index.title": "Impamvu wahitamo IsokoRyawe",
      "index.feature1": "⚡ Byoroshye kandi Byihuse",
      "index.feature1.desc":
        "Shyiraho umusaruro wawe vuba kandi abaguzi bawubone ako kanya.",
      "index.feature2": "🤝 Nta Bakomiseri",
      "index.feature2.desc":
        "Ucuruza neza ku buryo butaziguye.",
      "index.feature3": "🛡️ Amakuru Yizewe",
      "index.feature3.desc":
        "Abaguzi babona ibisobanuro birambuye n'amafoto y'ukuri.",
      "index.process": "Uko Bikora",
      "index.step1": "✍️ Iyandikishe",
      "index.step1.desc":
        "Fungura konti yawe mu buryo bworoshye kandi butekanye.",
      "index.step2": "📦 Tangira Gushyiraho Ibicuruzwa",
      "index.step2.desc":
        "Shyiraho ibiciro, amafoto n'ibisobanuro.",
      "index.step3": "💬 Ganira n'Abaguzi",
      "index.step3.desc":
        "Abaguzi bashobora kukwandikira cyangwa kuguhamagara."
    },

    fr: {
      "nav.home": "🏠 Accueil",
      "nav.market": "🛒 Marché",
      "nav.about": "ℹ️ À propos",
      "nav.login": "🔐 Connexion",
      "nav.logout": "🚪 Déconnexion",
      "nav.dashboard": "🛡️ Tableau Admin",
      "nav.farmer": "👩‍🌾 Espace Producteur",
      "nav.profile": "👤 Profil",

      "footer.contactTitle": "Contact",
      "footer.contactHint":
        "Besoin d'aide ? Envoyez-nous un email."
    },

    sw: {
      "nav.home": "🏠 Mwanzo",
      "nav.market": "🛒 Soko",
      "nav.about": "ℹ️ Kuhusu",
      "nav.login": "🔐 Ingia",
      "nav.logout": "🚪 Toka",
      "nav.dashboard": "🛡️ Dashibodi ya Admin",
      "nav.farmer": "👩‍🌾 Paneli ya Mkulima",
      "nav.profile": "👤 Wasifu",

      "footer.contactTitle": "Wasiliana",
      "footer.contactHint":
        "Unahitaji msaada? Tutumie barua pepe."
    }
  };

  function normalizeLang(lang) {
    const l = String(lang || "").toLowerCase();

    if (DICTIONARY[l]) return l;
    if (l.startsWith("en")) return "en";
    if (l.startsWith("rw")) return "rw";
    if (l.startsWith("fr")) return "fr";
    if (l.startsWith("sw")) return "sw";

    return "en"; // Default Language
  }

  function applyLanguage(lang) {
    const code = normalizeLang(lang);
    const dict = DICTIONARY[code];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (dict[key]) {
        element.textContent = dict[key];
      }
    });

    document.documentElement.lang = code;
  }

  function syncLanguageSelect(lang) {
    const select = document.getElementById("languageSelect");

    if (select) {
      select.value = normalizeLang(lang);
    }
  }

  window.switchLanguage = function (lang) {
    const code = normalizeLang(lang);

    localStorage.setItem(STORAGE_KEY, code);

    syncLanguageSelect(code);
    applyLanguage(code);
  };

  document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem(STORAGE_KEY);

    if (!lang) {
      lang = "en"; // English is default
      localStorage.setItem(STORAGE_KEY, lang);
    }

    syncLanguageSelect(lang);
    applyLanguage(lang);
  });
})();