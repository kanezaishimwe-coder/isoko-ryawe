const UI_ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-16v5h6V4h-6z" fill="currentColor"/></svg>',
  market: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6.2 6l.3 2H20l-1.2 6H8.1L6 4H3V2h4l.3 2H22l-1.7 8.5A2 2 0 0 1 18.3 14H8.1l.3 2H19v2H7a1 1 0 0 1-1-.8L4.3 6H6.2z" fill="currentColor"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-5 0-9 2.7-9 6v2h18v-2c0-3.3-4-6-9-6z" fill="currentColor"/></svg>',
  logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17v-2h4v-2h-4V8l-6 4 6 5zm8-13H9a2 2 0 0 0-2 2v3h2V6h9v12H9v-3H7v3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" fill="currentColor"/></svg>',
  admin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5.5 3.8 10.7 8 11 4.2-.3 8-5.5 8-11V5l-8-3zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 15c-2.4-.2-4.9-2.4-5.7-5.1A9.7 9.7 0 0 1 12 14c2.2 0 4.1.7 5.7 1.9C16.9 18.6 14.4 20.8 12 21z" fill="currentColor"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM8 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0 2c-2.8 0-8 1.4-8 4v2h8v-2c0-1.4.5-2.7 1.4-3.7A13.2 13.2 0 0 0 8 14zm8 0c-.6 0-1.3 0-1.9.1 1 1 1.9 2.4 1.9 3.9v2h8v-2c0-2.6-5.2-4-8-4z" fill="currentColor"/></svg>',
  active: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.2-4-4 1.4-1.4L11 13.4l4.6-4.6L17 10.2z" fill="currentColor"/></svg>',
  blocked: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5 11H7v-2h10z" fill="currentColor"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4a6 6 0 1 0 3.8 10.6l4.3 4.3 1.4-1.4-4.3-4.3A6 6 0 0 0 10 4zm0 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4z" fill="currentColor"/></svg>',
  boxes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.5 12 4 3 8.5V18l9 4 9-4V8.5zM12 6.2l5.8 2.9L12 12 6.2 9.1 12 6.2zM5 10l6 3v6l-6-3v-6zm14 0v6l-6 3v-6l6-3z" fill="currentColor"/></svg>',
  region: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.2A2.2 2.2 0 1 1 12 6.8a2.2 2.2 0 0 1 0 4.4z" fill="currentColor"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 5h-2v6l5 3 1-1.7-4-2.3z" fill="currentColor"/></svg>',
  add: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="currentColor"/></svg>',
  profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" fill="currentColor"/></svg>',
  welcome: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 5h2v7h-2zm0 9h2v2h-2z" fill="currentColor"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 10h2v10h6v-6h2v6h6V10h2z" fill="currentColor"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" fill="currentColor"/></svg>',
  login: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17v-2h4v-2h-4V8l-6 4 6 5zm8-13H9a2 2 0 0 0-2 2v3h2V6h9v12H9v-3H7v3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" fill="currentColor"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 3v9h16V8l-8 5z" fill="currentColor"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.6 3 3.9 5.3 6.9 6.9l2.3-2.3c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.1 22.2 1.8 13.9 1.8 3.2 1.8 2.5 2.3 2 3 2h3.2c.7 0 1.2.5 1.2 1.2 0 1.4.3 2.8.8 4.1.1.4 0 .9-.2 1.2L6.6 10.8z" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 3 4 3c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor" opacity="0.25"/><path d="M12 2C6.5 2 2 6.4 2 12c0 1.9.5 3.7 1.4 5.2L2 22l5-1.4c1.5.9 3.3 1.4 5 1.4 5.5 0 10-4.4 10-10S17.5 2 12 2zm5.9 14.2c-.3.9-1.7 1.7-2.3 1.7-.6 0-1.3.1-2.5-.3-1.2-.4-2.6-1.6-3.4-2.6-.8-1-1.3-2.2-1-3.2.2-.7.7-1.4 1.1-1.5.4-.1.7 0 1 .7l.7 1.8c.1.3.1.5 0 .7-.1.2-.2.3-.4.5-.2.2-.3.4-.1.7.2.3.8 1.2 1.7 2 .9.7 1.7 1.1 2 .9.3-.2.4-.4.6-.6.2-.2.4-.2.7-.1l2 .9c.3.1.5.2.6.4.1.2.1.6-.1 1.1z" fill="currentColor"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5zM18 6.8a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 6.8z" fill="currentColor"/></svg>'
};


function applyUiIcons(root = document) {
  const nodes = root.querySelectorAll("[data-icon]");
  nodes.forEach((node) => {
    const name = node.getAttribute("data-icon");
    node.innerHTML = UI_ICONS[name] || "";
  });
}

document.addEventListener("DOMContentLoaded", () => applyUiIcons());
