document.addEventListener("DOMContentLoaded", () => {
  console.log("IsokoRyawe Masterpiece App Engine Initiated successfully!");
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.getElementById("lnk-login");
  
  if (currentUser && loginLink) {
    if (currentUser.role === "admin") {
      loginLink.innerText = "🛡️ Admin Dashboard";
      loginLink.href = "admin-dashboard.html";
    } else if (currentUser.role === "producer") {
      loginLink.innerText = "👩‍🌾 Farmer Panel";
      loginLink.href = "producer-dashboard.html";
    } else {
      loginLink.innerText = "🧑‍💼 Client Panel";
      loginLink.href = "profile.html";
    }
  }
});
