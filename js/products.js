const defaultProducts = [
  { id: 1, name: "Umuceri wa Kirehe", farmerName: "Jean Claude", price: 450, qty: "150 Kg", location: "Kirehe", image: "js/assets/umuceri.png", phone: "0788123456", care: "Ihingwa mu Rwanda, ritangwa neza mu gihe cy'imvura." },
  { id: 2, name: "Amata", farmerName: "Murekatete", price: 700, qty: "20Liters", location: "Nyagatare", image: "js/assets/amata.png", phone: "0788654321", care: "Amata akomoka ku matungo yitaweho neza, afite isuku." },
  { id: 3, name: "Inyanya Nshya", farmerName: "Emmanuel", price: 600, qty: "35 Kg", location: "Rwamagana", image: "js/assets/inyanya.png", phone: "0785111222", care: "Inyanya zidakozweho imiti mwinshi, zera mu buryo bw'umwimerere." },
  { id: 4, name: "Imineke Kamparampaka", farmerName: "Aline", price: 350, qty: "38Kg", location: "Rubavu", image: "js/assets/imineke.png", phone: "0783444555", care: "Imineke izwiho gukura neza kandi ikava mu murima w'umuhinzi wizewe." },
  { id: 5, name: "Dodo Nziza", farmerName: "Samuel", price: 320, qty: "38 Kg", location: "Huye", image: "js/assets/dodo.png", phone: "0788776655", care: "Dodo itunganijwe neza, ifite intungamubiri nyinshi kandi ibikwa neza." },
  { id: 6, name: "Avoka ya Rwanda", farmerName: "Claudine", price: 950, qty: "15 Kg", location: "Musanze", image: "js/assets/avoka.png", phone: "0787999888", care: "Avoka ikura mu butaka bwa Rwanda, yera kandi irangiye igihe cyiza." },
  { id: 7, name: "Amagi", farmerName: "Patrick", price: 220, qty: "100 Amagi", location: "Rusizi", image: "js/assets/amagi.png", phone: "0788333222", care: "Amagi akomoka ku nkoko zitaweho neza kandi akabikwa mu buryo bwiza." },
  { id: 8, name: "Ibigori", farmerName: "Alice", price: 500, qty: "30 Kg", location: "Kayonza", image: "js/assets/ibigori.png", phone: "0788222333", care: "Ibigori byera neza mu butaka bworoshye kandi bigira intungamubiri." },
  { id: 9, name: "Ibishyimbo", farmerName: "Jean Pierre", price: 420, qty: "45 Kg", location: "Kirehe", image: "js/assets/ibishyimbo.jpg", phone: "0788445566", care: "Ibishyimbo byera mu buryo bw'umwimerere, bikuzuyemo poroteyine." },
  { id: 10, name: "Imbuto", farmerName: "Diane", price: 850, qty: "32 Kg", location: "Musanze", image: "js/assets/IMBUTO.jpg", phone: "0788556677", care: "Imbuto nshya zidakozweho, zikura mu murima w'abahinzi b'inzobere." },
  { id: 11, name: "Ibirayi", farmerName: "Joseph", price: 480, qty: "24 Kg", location: "Gatsibo", image: "js/assets/IBIRAYI.png", phone: "0788667788", care: "Ibirayi bikomeye, byoroshye guteka kandi bikundwa n'abaguzi." },
  { id: 12, name: "Karoti", farmerName: "Vestine", price: 530, qty: "18 Kg", location: "Nyamagabe", image: "js/assets/CARROT.jpg", phone: "0788778899", care: "Karoti nziza, zirimo vitamine nyinshi kandi zifite isuku." },
  { id: 13, name: "Umuceri", farmerName: "Eric", price: 620, qty: "50 Kg", location: "Bugesera", image: "js/assets/umuceri.png", phone: "0788889900", care: "Umuceri ukiri mwiza, wabitswe neza kandi ukomejwe n'abahinzi bo mu karere." },
  { id: 14, name: "Amateke", farmerName: "Grace", price: 780, qty: "30 Kg", location: "Rutsiro", image: "js/assets/amateke.png", phone: "0788990011", care: "Amateke asukuye, akuze neza kandi afite ubuziranenge bwiza bwo ku isoko." }
];

function getCustomProducts() {
  return JSON.parse(localStorage.getItem("farmProducts")) || [];
}

function getAllProducts() {
  return [...defaultProducts, ...getCustomProducts()];
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))];
}

function displayProducts(items) {
  const displayArea = document.getElementById("productsDisplay");
  if (!displayArea) return;

  displayArea.innerHTML = "";
  if (items.length === 0) {
    displayArea.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Nta musaruro wabonetse.</p>";
    return;
  }

  items.forEach((prod) => {
    const itemHtml = `
      <div class="product-item">
        <img src="${prod.image || 'js/assets/umuceri.png'}" alt="${prod.name}" class="product-image" />
        <div>
          <h3>${prod.name}</h3>
          <p class="product-farmer">Umuhinzi: ${prod.farmerName || 'Utazwi'}</p>
          <div class="product-meta">
            <span class="meta-pill">${prod.qty}</span>
            <span class="meta-pill">${prod.location}</span>
            <span class="meta-pill">${prod.price} RWF</span>
          </div>
          <p class="qty">Umusaruro uri ku isoko kandi ushobora koherezwa vuba. ${prod.care || ''}</p>
        </div>
        <a href="product-details.html?id=${prod.id}" class="btn-view">Reba birambuye</a>
      </div>
    `;
    displayArea.innerHTML += itemHtml;
  });
}

function populateDistrictFilter(products) {
  const districtSelect = document.getElementById("districtSelect");
  if (!districtSelect) return;

  const districts = uniqueValues(products, "location");
  districtSelect.innerHTML = '<option value="">Akarere cyose</option>';
  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    districtSelect.appendChild(option);
  });
}

function populateFarmerFilter(products, selectedDistrict = "") {
  const farmerSelect = document.getElementById("farmerSelect");
  if (!farmerSelect) return;

  const scopedProducts = selectedDistrict
    ? products.filter((product) => product.location === selectedDistrict)
    : products;

  const farmers = uniqueValues(scopedProducts, "farmerName");
  farmerSelect.innerHTML = '<option value="">Umuhinzi wese</option>';
  farmers.forEach((farmer) => {
    const option = document.createElement("option");
    option.value = farmer;
    option.textContent = farmer;
    farmerSelect.appendChild(option);
  });
}

function applyMarketFilters() {
  const query = document.getElementById("marketSearch")?.value.toLowerCase() || "";
  const district = document.getElementById("districtSelect")?.value || "";
  const farmer = document.getElementById("farmerSelect")?.value || "";

  const filtered = getAllProducts().filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      String(product.farmerName || "").toLowerCase().includes(query) ||
      String(product.location || "").toLowerCase().includes(query);

    const matchesDistrict = !district || product.location === district;
    const matchesFarmer = !farmer || product.farmerName === farmer;

    return matchesQuery && matchesDistrict && matchesFarmer;
  });

  displayProducts(filtered);
}

function searchProducts() {
  applyMarketFilters();
}

window.searchProducts = searchProducts;

document.addEventListener("DOMContentLoaded", () => {
  const allProducts = getAllProducts();
  displayProducts(allProducts);

  populateDistrictFilter(allProducts);
  populateFarmerFilter(allProducts);

  const districtSelect = document.getElementById("districtSelect");
  const farmerSelect = document.getElementById("farmerSelect");
  const marketSearch = document.getElementById("marketSearch");
  const clearFilters = document.getElementById("clearFilters");

  if (districtSelect) {
    districtSelect.addEventListener("change", () => {
      populateFarmerFilter(getAllProducts(), districtSelect.value);
      if (farmerSelect) farmerSelect.value = "";
      applyMarketFilters();
    });
  }

  if (farmerSelect) {
    farmerSelect.addEventListener("change", applyMarketFilters);
  }

  if (marketSearch) {
    marketSearch.addEventListener("input", applyMarketFilters);
  }

  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      if (marketSearch) marketSearch.value = "";
      if (districtSelect) districtSelect.value = "";
      if (farmerSelect) farmerSelect.value = "";
      populateFarmerFilter(getAllProducts());
      displayProducts(getAllProducts());
    });
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const btn = document.getElementById("market-panel-btn");
  if (currentUser && btn) {
    if (currentUser.role === "admin") {
      btn.innerText = "🛡️ Admin Dashboard";
      btn.href = "admin-dashboard.html";
    } else if (currentUser.role === "producer") {
      btn.innerText = "👩‍🌾 Farmer Panel";
      btn.href = "producer-dashboard.html";
    } else {
      btn.innerText = "👤 Umwirondoro";
      btn.href = "profile.html";
    }
  }
});
