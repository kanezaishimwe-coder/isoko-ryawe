function ensureToastContainer() {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = "info", duration = 2800) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span class="toast-message">${message}</span>
    <button type="button" class="toast-close" aria-label="Close notification">×</button>
  `;

  const close = () => {
    toast.classList.add("toast-hide");
    window.setTimeout(() => toast.remove(), 220);
  };

  toast.querySelector(".toast-close").addEventListener("click", close);
  container.appendChild(toast);

  window.setTimeout(close, duration);
  return toast;
}

function flash(message, type = "info") {
  localStorage.setItem("isokoFlashToast", JSON.stringify({ message, type }));
}

function consumeFlash() {
  const raw = localStorage.getItem("isokoFlashToast");
  if (!raw) return null;
  localStorage.removeItem("isokoFlashToast");
  return safeParseFlash(raw);
}

function safeParseFlash(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const flashToast = consumeFlash();
  if (flashToast && flashToast.message) {
    showToast(flashToast.message, flashToast.type || "info");
  }
});

window.IsokoNotify = {
  show: showToast,
  success: (message, duration) => showToast(message, "success", duration),
  error: (message, duration) => showToast(message, "error", duration),
  info: (message, duration) => showToast(message, "info", duration),
  flash
};
