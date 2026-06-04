document.addEventListener("DOMContentLoaded", () => {
  console.log("IsokoRyawe Masterpiece App Engine Initiated successfully!");
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.getElementById("lnk-login");
  
  if (currentUser && loginLink) {
    loginLink.innerText = currentUser.role === "producer" ? "Farmer Panel" : "Client Panel";
    loginLink.href = currentUser.role === "producer" ? "producer-dashboard.html" : "client-dashboard.html";
  }
});
