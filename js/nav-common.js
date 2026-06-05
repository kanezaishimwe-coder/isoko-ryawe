// Common helpers for contact links, footer layout etc.
(function () {
  function telToWhatsApp(phone) {
    const digits = String(phone || "").replace(/[^0-9]/g, "");
    // If phone already in international format like 2507XXXXXXXX, keep it.
    // Otherwise if it starts with 07XXXXXXX (Rwanda), convert to 250XXXXXXXX.
    const rwPhone = digits.startsWith("07") ? "250" + digits.slice(1) : digits;
    return `https://wa.me/${rwPhone}`;
  }

  function getWhatsAppHrefFromInstagramUrl(url) {
    // no-op helper placeholder (kept for future)
    return url;
  }


  document.addEventListener("DOMContentLoaded", () => {
    // If any page has a link with data-contact-phone, convert it to a WhatsApp link.
    document.querySelectorAll('a[data-contact-phone]').forEach((a) => {
      const phone = a.getAttribute('data-contact-phone');
      const href = telToWhatsApp(phone);
      a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  });
})();

