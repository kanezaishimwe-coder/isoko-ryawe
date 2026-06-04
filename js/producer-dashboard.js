function renderFarmerProducts(products) {
  const productsList = document.getElementById("farmerProductsList");
  if (!productsList) return;
  productsList.innerHTML = "";

  if (products.length === 0) {
    productsList.innerHTML = '<div class="product-card empty-state">Nta musaruro watanzwe kugeza ubu. Tegereza wubake isoko!</div>';
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <h3>${product.name}</h3>
        <div class="meta">
          <span>Agaciro: ${product.price} RWF</span>
          <span>${product.qty}</span>
          <span>${product.location}</span>
        </div>
        <p>Care: ${product.care || 'Nta makuru'}</p>
      </div>
    `;
    productsList.appendChild(card);
  });
}

function renderDashboardStats(products) {
  const cardTotal = document.getElementById("cardTotal");
  const cardRegions = document.getElementById("cardRegions");
  const cardLatest = document.getElementById("cardLatest");
  if (!cardTotal || !cardRegions || !cardLatest) return;

  cardTotal.innerText = products.length;
  const uniqueRegions = [...new Set(products.map((item) => item.location))].length;
  cardRegions.innerText = uniqueRegions || 0;
  cardLatest.innerText = products.length > 0 ? products[products.length - 1].name : "-";
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user && user.role === "producer") {
    document.getElementById("farmerName").innerText = user.name;
  } else {
    window.location.href = "login.html";
    return;
  }

  const customProducts = JSON.parse(localStorage.getItem("farmProducts")) || [];
  renderDashboardStats(customProducts);
  renderFarmerProducts(customProducts);

  const form = document.getElementById("addProductForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("prodName").value.trim();
      const price = parseInt(document.getElementById("prodPrice").value, 10);
      const qty = document.getElementById("prodQty").value.trim();
      const location = document.getElementById("prodLocation").value.trim();
      const care = document.getElementById("prodCare").value.trim();
      const phone = user.phone || "0788000000";

      if (!name || !price || !qty || !location) {
        alert("Saranganya neza amakuru yose y'umusanzu.");
        return;
      }

      function getImageFromName(n) {
        const nameLower = (n || "").toLowerCase();
        if (nameLower.includes("amagi")) return "js/assets/amagi.png";
        if (nameLower.includes("amata")) return "js/assets/amata.png";
        if (nameLower.includes("inyanya")) return "js/assets/inyanya.png";
        if (nameLower.includes("imineke")) return "js/assets/imineke.png";
        if (nameLower.includes("dodo")) return "js/assets/dodo.png";
        if (nameLower.includes("avoka")) return "js/assets/avoka.png";
        if (nameLower.includes("umuceri")) return "js/assets/umuceri.png";
        if (nameLower.includes("ibirayi")) return "js/assets/umuceri.png";
        return "js/assets/umuceri.png";
      }

      const newProduct = { id: Date.now(), name, price, qty, location, care, phone, image: getImageFromName(name) };
      const farmProducts = JSON.parse(localStorage.getItem("farmProducts")) || [];
      farmProducts.push(newProduct);
      localStorage.setItem("farmProducts", JSON.stringify(farmProducts));

      renderDashboardStats(farmProducts);
      renderFarmerProducts(farmProducts);
      alert(`Umusaruro wa ${name} winjijwe neza kuri Isoko Rusange!`);
      form.reset();
    });
  }

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});
