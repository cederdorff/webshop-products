import { getExcerpt, getStockStatus, getAllProducts } from "./helpers.js";

// Event listener - starter appen når siden er loaded
document.addEventListener("DOMContentLoaded", initApp);

// Initialize app
async function initApp() {
  console.log("App initialized 🚀");
  // Hent data
  const products = await getAllProducts();
  // Vis produkter
  displayAllProducts(products);
}

// Vis alle produkter
function displayAllProducts(products) {
  // Find grid container
  const grid = document.querySelector("#productGrid");
  // Fyld grid med produkter
  grid.innerHTML = products.map(displayProduct).join("");
}

// Vis ét produkt
function displayProduct(product) {
  // Hent lagerstatus fra helper funktion
  const stock = getStockStatus(product.inStock);
  // Returner HTML for produktkort
  return /*html*/ `
    <article class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" class="product-image" />
      </a>
      <div class="product-info">
        <h2 class="product-title">
          <a href="product.html?id=${product.id}">${product.title}</a>
        </h2>
        <p class="product-description">${getExcerpt(product.description)}</p>
        <p class="product-price">$${product.price}</p>
        <span class="product-stock ${stock.class}">${stock.text}</span>
      </div>
    </article>
  `;
}
