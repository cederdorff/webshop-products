// Helper function til at klippe tekst
export const getExcerpt = text => text.substring(0, 100) + "...";

// Helper function til lagerstatus
export const getStockStatus = inStock =>
  inStock ? { text: "På lager", class: "in-stock" } : { text: "Udsolgt", class: "out-of-stock" };

// Helper function til at hente produkter fra API
export async function getAllProducts() {
  const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
