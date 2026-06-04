const defaultProducts = [
  { id: 1, name: "🥔 Umuceri wa Kirehe", price: 450, qty: "500 Kg", location: "Kirehe", image: "js/assets/umuceri.png", phone: "0788123456", care: "Ihingwa mu Rwanda, ritangwa neza mu gihe cy'imvura." },
  { id: 2, name: "🥛 Amata", price: 700, qty: "200 Liters", location: "Nyagatare", image: "js/assets/amata.png", phone: "0788654321", care: "Amata akomoka ku matungo yitaweho neza, afite isuku." },
  { id: 3, name: "🍅 Inyanya Nshya", price: 600, qty: "120 Kg", location: "Rwamagana", image: "js/assets/inyanya.png", phone: "0785111222", care: "Inyanya zidakozweho imiti mwinshi, zera mu buryo bw'umwimerere." },
  { id: 4, name: "🍌 Imineke Kamparampaka", price: 350, qty: "400 Kg", location: "Rubavu", image: "js/assets/imineke.png", phone: "0783444555", care: "Imineke izwiho gukura neza kandi ikava mu murima w'umuhinzi wizewe." },
  { id: 5, name: "🥬 Dodo Nziza", price: 320, qty: "250 Kg", location: "Huye", image: "js/assets/dodo.png", phone: "0788776655", care: "Dodo itunganijwe neza, ifite intungamubiri nyinshi kandi ibikwa neza." },
  { id: 6, name: "🥑 Avoka ya Rwanda", price: 950, qty: "150 Kg", location: "Musanze", image: "js/assets/avoka.png", phone: "0787999888", care: "Avoka ikura mu butaka bwa Rwanda, yera kandi irangiye igihe cyiza." },
  { id: 7, name: "🥚 Amagi", price: 220, qty: "100 Amagi", location: "Rusizi", image: "js/assets/amagi.png", phone: "0788333222", care: "Amagi akomoka ku nkoko zitaweho neza kandi akabikwa mu buryo bwiza." },
  { id: 8, name: "🌽 Ibigori", price: 500, qty: "350 Kg", location: "Kayonza", image: "js/assets/umuceri.png", phone: "0788222333", care: "Ibigori byera neza mu butaka bworoshye kandi bigira intungamubiri." },
  { id: 9, name: "🥜 Ibishyimbo ", price: 420, qty: "220 Kg", location: "Kirehe", image: "js/assets/umuceri.png", phone: "0788445566", care: "Ibishyimbo byera mu buryo bw'umwimerere, bikuzuyemo poroteyine." },
  { id: 10, name: "🍓 Imbuto", price: 850, qty: "80 Kg", location: "Musanze", image: "js/assets/avoka.png", phone: "0788556677", care: "Imbuto nshya zidakozweho, zikura mu murima w'abahinzi b'inzobere." },
  { id: 11, name: "🥔 Ibirayi", price: 480, qty: "240 Kg", location: "Gatsibo", image: "js/assets/umuceri.png", phone: "0788667788", care: "Ibirayi bikomeye, byoroshye guteka kandi bikundwa n'abaguzi." },
  { id: 12, name: "🥕 Karoti ", price: 530, qty: "180 Kg", location: "Nyamagabe", image: "js/assets/inyanya.png", phone: "0788778899", care: "Karoti nziza, zirimo vitamine nyinshi kandi zifite isuku." },
  { id: 13, name: "🌾 Umuceri ", price: 620, qty: "500 Kg", location: "Bugesera", image: "js/assets/umuceri.png", phone: "0788889900", care: "Umuceri ukiri mwiza, wabitswe neza kandi ukomejwe n'abahinzi bo mu karere." }
];

function displayProducts(items) {
  const displayArea = document.getElementById("productsDisplay");
  if (!displayArea) return;
  
  displayArea.innerHTML = "";
  if (items.length === 0) {
    displayArea.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Nta musaruro wabonetse.</p>";
    return;
  }

  items.forEach(prod => {
    const itemHtml = `
      <div class="product-item">
        <img src="${prod.image || 'js/assets/umuceri.png'}" alt="${prod.name}" class="product-image" />
        <div>
          <h3>${prod.name}</h3>
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

function searchProducts() {
  const query = document.getElementById("marketSearch").value.toLowerCase();
  const customProducts = JSON.parse(localStorage.getItem("farmProducts")) || [];
  const allProducts = [...defaultProducts, ...customProducts];
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  const customProducts = JSON.parse(localStorage.getItem("farmProducts")) || [];
  const allProducts = [...defaultProducts, ...customProducts];
  displayProducts(allProducts);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const btn = document.getElementById("market-panel-btn");
  if (currentUser && btn) {
    btn.innerText = currentUser.role === "producer" ? "Farmer Panel" : "Umwirondoro";
    btn.href = currentUser.role === "producer" ? "producer-dashboard.html" : "profile.html";
  }
});
