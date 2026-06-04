document.addEventListener("DOMContentLoaded", () => {
  const auth = window.IsokoAuth;
  const adminUser = auth ? auth.requireActiveSession(["admin"], "login.html") : JSON.parse(localStorage.getItem("currentUser"));

  if (!adminUser || adminUser.role !== "admin") {
    return;
  }

  const adminName = document.getElementById("adminName");
  const totalUsersCard = document.getElementById("cardTotalUsers");
  const activeUsersCard = document.getElementById("cardActiveUsers");
  const blockedUsersCard = document.getElementById("cardBlockedUsers");
  const usersTableBody = document.getElementById("usersTableBody");
  const userSearch = document.getElementById("userSearch");
  const btnLogout = document.getElementById("btnLogout");

  if (adminName) {
    adminName.textContent = adminUser.name || "Admin";
  }

  const roleOrder = {
    admin: 0,
    producer: 1,
    client: 2
  };

  function getFilteredUsers() {
    const query = String(userSearch?.value || "").trim().toLowerCase();
    const users = auth ? auth.getUsers() : [];

    return users
      .slice()
      .sort((left, right) => {
        const roleDiff = (roleOrder[left.role] ?? 99) - (roleOrder[right.role] ?? 99);
        if (roleDiff !== 0) return roleDiff;
        return String(left.name || left.email || "").localeCompare(String(right.name || right.email || ""));
      })
      .filter((user) => {
        if (!query) return true;
        return String(user.name || "").toLowerCase().includes(query) || String(user.email || "").toLowerCase().includes(query);
      });
  }

  function updateStats(users) {
    if (totalUsersCard) totalUsersCard.textContent = String(users.length);
    if (activeUsersCard) activeUsersCard.textContent = String(users.filter((user) => user.status !== "blocked").length);
    if (blockedUsersCard) blockedUsersCard.textContent = String(users.filter((user) => user.status === "blocked").length);
  }

  function renderUsers() {
    const users = getFilteredUsers();
    updateStats(auth ? auth.getUsers() : []);

    if (!usersTableBody) return;
    usersTableBody.innerHTML = "";

    if (users.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.className = "empty-state";
      cell.textContent = "Nta mukoresha wabonetse muri iki cyiciro.";
      row.appendChild(cell);
      usersTableBody.appendChild(row);
      return;
    }

    users.forEach((user) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = user.name || "-";

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email || "-";

      const roleCell = document.createElement("td");
      roleCell.textContent = user.role || "-";

      const statusCell = document.createElement("td");
      const badge = document.createElement("span");
      badge.className = `status-badge status-${user.status === "blocked" ? "blocked" : "active"}`;
      badge.textContent = user.status === "blocked" ? "Blocked" : "Active";
      statusCell.appendChild(badge);

      const actionsCell = document.createElement("td");
      const actionsWrap = document.createElement("div");
      actionsWrap.className = "actions";

      if (user.role === "admin" || String(user.email).toLowerCase() === String(adminUser.email).toLowerCase()) {
        const protectedBadge = document.createElement("span");
        protectedBadge.className = "btn-action btn-disabled";
        protectedBadge.textContent = "Protected";
        actionsWrap.appendChild(protectedBadge);
      } else {
        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className = user.status === "blocked" ? "btn-action btn-unblock" : "btn-action btn-block";
        toggleButton.dataset.email = user.email;
        toggleButton.dataset.action = user.status === "blocked" ? "activate" : "block";
        toggleButton.textContent = user.status === "blocked" ? "Re-activate" : "Block";
        actionsWrap.appendChild(toggleButton);
      }

      actionsCell.appendChild(actionsWrap);

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(roleCell);
      row.appendChild(statusCell);
      row.appendChild(actionsCell);

      usersTableBody.appendChild(row);
    });
  }

  if (userSearch) {
    userSearch.addEventListener("input", renderUsers);
  }

  if (usersTableBody) {
    usersTableBody.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-email][data-action]");
      if (!button || !auth) return;

      const email = button.dataset.email;
      const action = button.dataset.action;

      if (action === "block") {
        auth.blockAccount(email);
      } else {
        auth.activateAccount(email);
      }

      renderUsers();
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      if (auth) {
        auth.clearCurrentUser();
      } else {
        localStorage.removeItem("currentUser");
      }
      window.location.href = "login.html";
    });
  }

  renderUsers();
});
