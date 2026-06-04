const AUTH_STORAGE_KEYS = {
  users: "isokoUsers",
  currentUser: "currentUser"
};

const ADMIN_ACCOUNT = {
  name: "System Admin",
  email: "fmls@gmail.com",
  phone: "0788000000",
  role: "admin",
  password: "1ab2c3",
  status: "active"
};

const DEMO_USERS = [
  {
    name: "Umuhinzi Mwiza",
    email: "farmer@gmail.com",
    phone: "0788123456",
    role: "producer",
    password: "123",
    status: "active"
  },
  {
    name: "Jean Client",
    email: "client@gmail.com",
    phone: "0788654321",
    role: "client",
    password: "123",
    status: "active"
  }
];

function safeParseJSON(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
  const digits = String(phone || "").replace(/[^0-9]/g, "");
  if (digits.length === 9 && digits.startsWith("7")) return `0${digits}`;
  return digits;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function isValidPhone(phone) {
  return /^07\d{8}$/.test(normalizePhone(phone));
}

function isValidPassword(password) {
  return String(password).length >= 6;
}

function isValidName(name) {
  return String(name).trim().length >= 2;
}

function setFieldError(inputId, message) {
  const element = document.getElementById(inputId);
  if (element) element.textContent = message || "";
}

function clearErrors() {
  [
    "regNameError",
    "regEmailError",
    "regPhoneError",
    "regRoleError",
    "regPasswordError",
    "logEmailError",
    "logPasswordError"
  ].forEach((id) => setFieldError(id, ""));
}

function readUsersFromStorage() {
  const users = safeParseJSON(localStorage.getItem(AUTH_STORAGE_KEYS.users), []);
  return Array.isArray(users) ? users : [];
}

function saveUsers(users) {
  localStorage.setItem(AUTH_STORAGE_KEYS.users, JSON.stringify(users));
}

function getUsers() {
  return seedUsersDirectory();
}

function getCurrentUser() {
  return safeParseJSON(localStorage.getItem(AUTH_STORAGE_KEYS.currentUser), null);
}

function setCurrentUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEYS.currentUser, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.currentUser);
}

function normalizeStoredUser(user) {
  if (!user || !user.email) return null;
  return {
    name: user.name || "",
    email: normalizeEmail(user.email),
    phone: normalizePhone(user.phone || ""),
    role: user.role || "client",
    password: user.password || "",
    status: user.status || "active"
  };
}

function seedUsersDirectory() {
  const existingUsers = readUsersFromStorage();
  const mergedUsers = [];
  const seenEmails = new Set();

  const addUser = (user) => {
    const normalized = normalizeStoredUser(user);
    if (!normalized || seenEmails.has(normalized.email)) return;
    seenEmails.add(normalized.email);
    mergedUsers.push(normalized);
  };

  existingUsers.forEach(addUser);
  DEMO_USERS.forEach(addUser);
  addUser(ADMIN_ACCOUNT);

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.password) {
    addUser(currentUser);
  }

  if (mergedUsers.length !== existingUsers.length) {
    saveUsers(mergedUsers);
  } else if (JSON.stringify(mergedUsers) !== JSON.stringify(existingUsers)) {
    saveUsers(mergedUsers);
  }

  return mergedUsers;
}

function getUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return seedUsersDirectory().find((user) => user.email === normalizedEmail) || null;
}

function upsertUser(user) {
  const normalized = normalizeStoredUser(user);
  if (!normalized) return null;

  const users = seedUsersDirectory();
  const index = users.findIndex((item) => item.email === normalized.email);

  if (index >= 0) {
    users[index] = { ...users[index], ...normalized };
  } else {
    users.push(normalized);
  }

  saveUsers(users);
  return normalized;
}

function setAccountStatus(email, status) {
  const normalizedEmail = normalizeEmail(email);
  const users = seedUsersDirectory();
  const index = users.findIndex((user) => user.email === normalizedEmail);
  if (index < 0) return null;

  users[index].status = status;
  saveUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser && normalizeEmail(currentUser.email) === normalizedEmail && status === "blocked") {
    clearCurrentUser();
  }

  return users[index];
}

function activateAccount(email) {
  return setAccountStatus(email, "active");
}

function blockAccount(email) {
  return setAccountStatus(email, "blocked");
}

function createSession(user) {
  const session = {
    name: user.name || "",
    email: normalizeEmail(user.email),
    phone: normalizePhone(user.phone || ""),
    role: user.role || "client",
    status: user.status || "active"
  };

  setCurrentUser(session);
  return session;
}

function getRoleHome(role) {
  if (role === "admin") return "admin-dashboard.html";
  if (role === "producer") return "producer-dashboard.html";
  return "market.html";
}

function notify(message, type = "info") {
  if (window.IsokoNotify && typeof window.IsokoNotify.show === "function") {
    window.IsokoNotify.show(message, type);
    return;
  }
  console.log(message);
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
    setFieldError("regEmailError", "Andika email ikwiye (urugero: izina@gmail.com).");
    ok = false;
  }

  if (!isValidPhone(phone)) {
    setFieldError("regPhoneError", "Numero ya telefone igomba kuba 07XXXXXXXX.");
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
  setFieldError("logEmailError", "");
  setFieldError("logPasswordError", "");

  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPassword").value;

  let ok = true;

  if (!isValidEmail(email)) {
    setFieldError("logEmailError", "Andika email ikwiye.");
    ok = false;
  }

  if (!String(password).trim()) {
    setFieldError("logPasswordError", "Andika ijambo ry'ibanga.");
    ok = false;
  }

  return ok;
}

function requireActiveSession(allowedRoles, redirectUrl = "login.html") {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = redirectUrl;
    return null;
  }

  if (currentUser.status === "blocked") {
    clearCurrentUser();
    window.location.href = redirectUrl;
    return null;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    window.location.href = redirectUrl;
    return null;
  }

  return currentUser;
}

window.IsokoAuth = {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getUserByEmail,
  upsertUser,
  blockAccount,
  activateAccount,
  createSession,
  requireActiveSession,
  getRoleHome,
  ADMIN_ACCOUNT
};

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateRegister()) return;

    const name = document.getElementById("regName").value.trim();
    const email = normalizeEmail(document.getElementById("regEmail").value);
    const phone = normalizePhone(document.getElementById("regPhone").value);
    const role = document.getElementById("regRole").value;
    const password = document.getElementById("regPassword").value;

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      setFieldError("regEmailError", "Iyi email yamaze gukoreshwa.");
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      role,
      password,
      status: "active"
    };

    upsertUser(newUser);
    createSession(newUser);

    if (window.IsokoNotify && typeof window.IsokoNotify.flash === "function") {
      window.IsokoNotify.flash("Konti yawe yafunguwe neza! Murakaza neza kuri IsokoRyawe.", "success");
    }
    window.location.href = getRoleHome(role);
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    const email = normalizeEmail(document.getElementById("logEmail").value);
    const password = document.getElementById("logPassword").value;

    if (email === normalizeEmail(ADMIN_ACCOUNT.email) && password === ADMIN_ACCOUNT.password) {
      upsertUser(ADMIN_ACCOUNT);
      createSession(ADMIN_ACCOUNT);
      notify("Admin yinjiye neza.", "success");
      window.setTimeout(() => {
        window.location.href = "admin-dashboard.html";
      }, 1200);
      return;
    }

    const savedUser = getUserByEmail(email);

    if (savedUser && savedUser.password === password) {
      if (savedUser.status === "blocked") {
        setFieldError("logPasswordError", "Konti yawe yahagaritswe n'admin. Muvugane na we.");
        return;
      }

      createSession(savedUser);
      notify("Mwinjiye neza kuri IsokoRyawe!", "success");
      window.setTimeout(() => {
        window.location.href = getRoleHome(savedUser.role);
      }, 1200);
      return;
    }

    notify("Email cyangwa ijambo ry'ibanga sibyo!", "error");
  });
}
