# TODO

## Navbar + project-wide language switching (rw/en/fr/sw)
- [ ] Update `js/language.js` to translate navbar-only behaviour consistently across all pages.
- [ ] Ensure every page navbar has `data-i18n` keys for all nav links, and that the active state doesn’t get lost on language switch.
- [ ] Remove hard-coded `lang` default values (e.g. `lang="en"` in `about.html`) so Kinyarwanda is respected by default unless user switches.
- [ ] Add missing `data-i18n` keys for nav text on pages with different navbar markup.
- [ ] Verify language switching changes only navbar text (and not the rest) as requested.
- [ ] Test on: `index.html`, `market.html`, `about.html`, `login.html`, `register.html`, `profile.html`, `admin-dashboard.html`, `producer-dashboard.html`, `product-details.html`.

