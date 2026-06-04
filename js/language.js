const translations = {
  rw: {
    "lnk-home": "Ahabanza",
    "lnk-market": "Sura Isoko",
    "lnk-login": "Injira",
    "hero-title": "Umusaruro wawe, Isoko ryawe",
    "hero-desc": "Gahuza abahinzi n'aborozi bo mu cyaro n'abaguzi ako kanya. Gura umusaruro utoshye, muhamagare cyangwa muvugane kuri WhatsApp nta bakomiseri.",
    "btn-register-cta": "Tangira Kwandikisha Konti",
    "btn-market-cta": "Sura Isoko Ryacu",
    "cat-title": "Ibyiciro by'Umusaruro",
    "cat-farming": "Ibiribwa n'Imboga",
    "cat-livestock": "Ibirorwaho n'Amatungo",
    "cat-fruits": "Imbuto Zitoshye"
  },
  en: {
    "lnk-home": "Home",
    "lnk-market": "Visit Market",
    "lnk-login": "Login",
    "hero-title": "Your Harvest, Your Market",
    "hero-desc": "Connecting rural farmers and livestock breeders directly to buyers. Buy fresh products, call them, or chat via WhatsApp with no middlemen.",
    "btn-register-cta": "Get Registered Now",
    "btn-market-cta": "Browse Marketplace",
    "cat-title": "Produce Categories",
    "cat-farming": "Crops & Vegetables",
    "cat-livestock": "Livestock & Animal Products",
    "cat-fruits": "Fresh Fruits"
  },
  fr: {
    "lnk-home": "Accueil",
    "lnk-market": "Le Marché",
    "lnk-login": "Connexion",
    "hero-title": "Votre Récolte, Votre Marché",
    "hero-desc": "Connecter directement les agriculteurs et éleveurs ruraux avec les acheteurs. Achetez frais, appelez ou discutez sur WhatsApp sans intermédiaires.",
    "btn-register-cta": "Créer un compte",
    "btn-market-cta": "Visiter le Marché",
    "cat-title": "Catégories de Produits",
    "cat-farming": "Cultures & Légumes",
    "cat-livestock": "Élevage & Produits Animaux",
    "cat-fruits": "Fruits Frais"
  },
  sw: {
    "lnk-home": "Nyumbani",
    "lnk-market": "Sokoni",
    "lnk-login": "Ingia",
    "hero-title": "Mavuno Yako, Soko Lako",
    "hero-desc": "Kuunganisha wakulima na wafugaji wa vijijini moja kwa moja na wanunuzi. Nunua mazao mabichi, piga simu au chat kupitia WhatsApp bila madalali.",
    "btn-register-cta": "Jisajili Sasa",
    "btn-market-cta": "Angalia Soko",
    "cat-title": "Jamii za Mazao",
    "cat-farming": "Mazao na Mboga",
    "cat-livestock": "Mifugo na Bidhaa za Wanyama",
    "cat-fruits": "Matunda Mabichi"
  }
};

function switchLanguage(lang) {
  localStorage.setItem("isokoLang", lang);
  applySavedLanguage();
}

function applySavedLanguage() {
  const currentLang = localStorage.getItem("isokoLang") || "rw";
  const selectElem = document.getElementById("languageSelect");
  if(selectElem) selectElem.value = currentLang;

  const dict = translations[currentLang];
  for (const key in dict) {
    const element = document.getElementById(key);
    if (element) {
      element.innerText = dict[key];
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applySavedLanguage();
});
