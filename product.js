import { getAllProducts, getStockStatus } from "./helpers.js";

document.addEventListener("DOMContentLoaded", initProduct);

async function initProduct() {
  console.log("Product page initialized 🚀");

  // Hent id fra URL - det er det produkt vi skal vise
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("Product ID:", id);

  // Hent alle produkter
  const products = await getAllProducts();
  // Find det specifikke produkt med det id som vi skal vise
  const product = products.find(p => p.id == id);

  // Vis produktet
  if (product) {
    // Hvis produktet findes, vis det
    displayProduct(product);
  } else {
    // Hvis produktet ikke findes, vis en fejlmeddelelse
    document.querySelector("#product").innerHTML = "<p>Produkt ikke fundet!</p>";
  }
}

// Vis ét produkt. Denne funktion er ny og anderledes end den i app.js
function displayProduct(product) {
  // Hent lagerstatus
  const stock = getStockStatus(product.inStock);

  // generér HTML for produktdetaljer
  const html = /*html*/ `
    <div class="product-detail-container">
      <div class="product-image-large">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-details">
        <h1>${product.title}</h1>
        <p class="category">Kategori: ${product.category}</p>
        <p class="price-large">$${product.price}</p>
        <span class="product-stock ${stock.class}">${stock.text}</span>
        
        <div class="rating">
          <span>⭐ ${product.rating.rate} / 5</span>
          <span>(${product.rating.count} anmeldelser)</span>
        </div>
        
        <div class="description-full">
          <h3>Beskrivelse</h3>
          <p>${product.description}</p>
        </div>
        
        <button class="add-to-cart-btn ${!product.inStock ? "disabled" : ""}">
          ${product.inStock ? "Tilføj til kurv" : "Udsolgt"}
        </button>
      </div>
    </div>
  `;
  // Indsæt HTML i DOM
  document.querySelector("#product").innerHTML = html;
}
