function setFieldError(inputId, message) {
  const el = document.getElementById(inputId);
  if (el) el.textContent = message || "";
}

function clearErrors() {
  const ids = [
    "regNameError",
    "regEmailError",
    "regPhoneError",
    "regRoleError",
    "regPasswordError",
    "logEmailError",
    "logPasswordError"
  ];
  ids.forEach((id) => setFieldError(id, ""));
}

function isValidEmail(email) {
  // basic email validation (browser already handles type=email, but keep JS check)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function normalizePhone(phone) {
  // allow spaces/dashes, keep only digits
  const digits = String(phone).replace(/[^0-9]/g, "");
  // Accept 0788... (10 digits) or 7XXXXXXXX (9 digits) -> normalize to 0 + digits when needed
  if (digits.length === 9 && digits.startsWith("7")) return "0" + digits;
  return digits;
}

function isValidPhone(phone) {
  const p = normalizePhone(phone);
  // Expect Kigali/Rwanda style: 07 + 8 digits => 10 digits total starting with 07
  return /^07\d{8}$/.test(p);
}

function isValidPassword(password) {
  return String(password).length >= 6;
}

function isValidName(name) {
  const n = String(name).trim();
  return n.length >= 2;
}

function validateRegister() {
  clearErrors();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const phone = document.getElementById("regPhone").value;
  const role = document.getElementById("regRole").value;
  const password = document.getElementById("regPassword").value;

  let ok = true;

  if (!isValidName(name)) {
    setFieldError("regNameError", "Andika izina rifite nibura inyuguti 2.");
    ok = false;
  }

  if (!isValidEmail(email)) {
    setFieldError("regEmailError", "Andika email ikwiye (urugero: izina@gmail.com). ");
    ok = false;
  }

  if (!isValidPhone(phone)) {
    setFieldError("regPhoneError", "Numero ya telefone igomba gutangirana na 07 kandi igakoresha imibare 10 (urugero 0788000000). ");
    ok = false;
  }

  if (!role) {
    setFieldError("regRoleError", "Hitamo icyo uri cyo.");
    ok = false;
  }

  if (!isValidPassword(password)) {
    setFieldError("regPasswordError", "Ijambo ry'ibanga rigomba kuba nibura inyuguti 6.");
    ok = false;
  }

  return ok;
}

function validateLogin() {
  // only clear login errors here
  setFieldError("logEmailError", "");
  setFieldError("logPasswordError", "");

  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPassword").value;

  let ok = true;

  if (!isValidEmail(email)) {
    setFieldError("logEmailError", "Andika email ikwiye.");
    ok = false;
  }

  if (!isValidPassword(password)) {
    setFieldError("logPasswordError", "Ijambo ry'ibanga rigomba kuba nibura inyuguti 6.");
    ok = false;
  }

  return ok;
}

// Kwiyandikisha (Sign Up)
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateRegister()) return;

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = normalizePhone(document.getElementById("regPhone").value);
    const role = document.getElementById("regRole").value;
    const password = document.getElementById("regPassword").value;

    const user = { name, email, phone, role, password };
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Konti yawe yafunguwe neza! Murakaza neza kuri IsokoRyawe.");
    window.location.href = "market.html";
  });
}

// Kwinjira (Login)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    const email = document.getElementById("logEmail").value.trim();
    const password = document.getElementById("logPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("Mwinjiye neza kuri IsokoRyawe!");
      window.location.href = "market.html";
      return;
    }

    // Demo accounts
    if (email === "farmer@gmail.com" && password === "123") {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: "Umuhinzi Mwiza", email, phone: "0788123456", role: "producer" })
      );
      window.location.href = "market.html";
      return;
    }

    if (email === "client@gmail.com" && password === "123") {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: "Jean Client", email, phone: "0788654321", role: "client" })
      );
      window.location.href = "market.html";
      return;
    }

    alert("Email cyangwa Ijambo ry'ibanga ryawe sbyo!");
  });
}
