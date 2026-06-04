document.addEventListener("DOMContentLoaded", () => {
    const auth = window.IsokoAuth;
    const user = auth ? auth.requireActiveSession(["producer"], "login.html") : JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "producer") {
        return;
    }

    document.getElementById("farmerName").innerText = user.name;

    function setProductError(inputId, message) {
        const el = document.getElementById(inputId);
        if (el) el.textContent = message || "";
    }

    function clearProductErrors() {
        [
            "prodNameError",
            "prodPriceError",
            "prodQtyError",
            "prodLocationError",
            "prodCareError"
        ].forEach((id) => setProductError(id, ""));
    }

    function validateProductForm() {
        clearProductErrors();

        const name = document.getElementById("prodName").value.trim();
        const priceValue = document.getElementById("prodPrice").value;
        const qty = document.getElementById("prodQty").value.trim();
        const location = document.getElementById("prodLocation").value.trim();
        const care = document.getElementById("prodCare").value.trim();

        let ok = true;
        const price = parseInt(priceValue, 10);

        if (!name) {
            setProductError("prodNameError", "Andika izina ry'umusaruro neza.");
            ok = false;
        }

        if (!priceValue || isNaN(price) || price <= 0) {
            setProductError("prodPriceError", "Andika igiciro cyiza gifite imibare y'inyongera.");
            ok = false;
        }

        if (!qty) {
            setProductError("prodQtyError", "Andika ingano iboneka neza.");
            ok = false;
        }

        if (!location) {
            setProductError("prodLocationError", "Andika akarere uherereyemo.");
            ok = false;
        }

        if (!care) {
            setProductError("prodCareError", "Sobanura uburyo umusaruro witaweho.");
            ok = false;
        }

        return ok;
    }

    const form = document.getElementById("addProductForm");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!validateProductForm()) {
                return;
            }

            const name = document.getElementById("prodName").value.trim();
            const price = parseInt(document.getElementById("prodPrice").value, 10);
            const qty = document.getElementById("prodQty").value.trim();
            const location = document.getElementById("prodLocation").value.trim();
            const care = document.getElementById("prodCare").value.trim();
            const phone = user ? user.phone : "0788000000";

            const newProduct = { id: Date.now(), name, price, qty, location, care, phone };
            
            let farmProducts = JSON.parse(localStorage.getItem("farmProducts")) || [];
            farmProducts.push(newProduct);
            localStorage.setItem("farmProducts", JSON.stringify(farmProducts));

            alert(`Umusaruro wa ${name} winjijwe neza kuri Isoko Rusange!`);
            window.location.href = "market.html";
        });
    }

    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            if (window.IsokoAuth) {
                window.IsokoAuth.clearCurrentUser();
            } else {
                localStorage.removeItem("currentUser");
            }
            window.location.href = "login.html";
        });
    }
});
