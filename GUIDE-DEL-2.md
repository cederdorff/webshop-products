# Del 2: Avancerede JavaScript Koncepter

## 0. Template - klar til at fortsætte?

Efter første del skal du have noget der minder om nedenstående HTML og JavaScript. Du er velkommen til at bruge løsningen nedenfor, hvis du har været igennem del 1.

**HTML (index.html)**

```html
<!doctype html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product Catalogue - RACE</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <header>
      <h1>Products</h1>
    </header>
    <main>
      <section id="productGrid" class="product-grid">
        <!-- Products will be dynamically inserted here from JS -->
      </section>
    </main>

    <footer>
      <p>© RACE</p>
    </footer>

    <script src="app.js"></script>
  </body>
</html>
```

**JavaScript (app.js)**

```javascript
"use strict";
// Event listener - starter appen når siden er loaded
document.addEventListener("DOMContentLoaded", initApp);

// Data - produkter (kun de første par for at spare plads)
const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    inStock: true,
    rating: { rate: 3.9, count: 120 }
  }
  // ... resten af produkterne
];

// Initialize app
function initApp() {
  console.log("App initialized");
  displayAllProducts();
}

// Vis alle produkter
function displayAllProducts() {
  document.querySelector("#productGrid").innerHTML = "";
  for (const product of products) {
    displayProduct(product);
  }
}

// Vis ét produkt
function displayProduct(product) {
  let stockText;
  let stockClass;
  if (product.inStock) {
    stockText = "På lager";
    stockClass = "in-stock";
  } else {
    stockText = "Udsolgt";
    stockClass = "out-of-stock";
  }

  const html = /*html*/ `
    <article class="product-card">
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price}</p>
        <span class="product-stock ${stockClass}">${stockText}</span>
      </div>
    </article>
  `;
  document.querySelector("#productGrid").insertAdjacentHTML("beforeend", html);
}
```

---

## 1. Forbedringer - Arbejd med tekststrenge

Du har måske allerede nu tænkt over forbedringer? På UI'en har vi nogle ret voldsomme og tekstunge produktkort. Produktbeskrivelserne fylder for meget!

Vi kan skære i produktbeskrivelsen (`product.description`) så der kun vises et par linjer. Det kan vi gøre med JavaScript ved at bruge `.substring()` på tekststrenge.

### Del 1 - Eksperimenter med .substring()

- I bunden af `app.js`, tilføj følgende:

```javascript
const testProduct = products[0];
console.log(testProduct);
```

- Reload siden og se konsollen. Hvad ser du?
- Vi har nu fat i det første produkt fra arrayet. Lad os arbejde med beskrivelsen.

- Brug nu `.substring()` på `testProduct.description`:

```javascript
console.log(testProduct.description.substring(0, 50));
```

- Hvad sker der? Prøv med forskellige tal: `(0, 30)`, `(10, 70)`, `(0, 100)`.
- `.substring(start, end)` klipper en tekststreng fra index `start` til index `end`.

- Lav en variabel til at gemme resultatet:

```javascript
const excerpt = testProduct.description.substring(0, 50);
console.log(excerpt);
```

### Del 2 - Brug det i displayProduct

- Hvordan kan du bruge `.substring()` i `displayProduct` funktionen, så alle produktbeskrivelser automatisk bliver klippet?
- Prøv dig frem! Hint: Du skal ændre linjen hvor `product.description` bruges i HTML'en.

<details>
<summary>💡 Løsningsforslag</summary>

```javascript
<p class="product-description">${product.description.substring(0, 100)}...</p>
```

</details>

### Del 3 - Lav en hjælpefunktion

I stedet for at have logikken direkte i `displayProduct`, lad os lave en hjælpefunktion. Hjælpefunktioner kan genbruges flere steder og gør koden mere læsbar.

- Definer en funktion i bunden af `app.js`:

```javascript
function getExcerpt(text) {
  console.log(text);
}
```

- Test funktionen:

```javascript
const testProduct = products[0];
getExcerpt(testProduct.description);
```

- Se konsollen. Teksten bliver udskrevet!

- Implementer nu substring-logikken inde i `getExcerpt`:

```javascript
function getExcerpt(text) {
  const excerpt = text.substring(0, 100);
  console.log(excerpt);
}
```

- For at kunne bruge resultatet skal funktionen **returnere** værdien:

```javascript
function getExcerpt(text) {
  const excerpt = text.substring(0, 100) + "...";
  return excerpt;
}
```

- Nu kan vi bruge funktionen i `displayProduct`:

```javascript
<p class="product-description">${getExcerpt(product.description)}</p>
```

- Test at det virker! Alle beskrivelser skulle nu være kortere med "..." i enden.

### Del 4 - Endnu en hjælpefunktion

- Kan du lave en hjælpefunktion til at håndtere `stockText` og `stockClass`?
- Funktionen skal returnere et objekt med begge værdier.

<details>
<summary>💡 Løsningsforslag</summary>

```javascript
function getStockStatus(inStock) {
  if (inStock) {
    return {
      text: "På lager",
      class: "in-stock"
    };
  } else {
    return {
      text: "Udsolgt",
      class: "out-of-stock"
    };
  }
}
```

Brug i `displayProduct`:

```javascript
function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

  const html = /*html*/ `
    <article class="product-card">
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${getExcerpt(product.description)}</p>
        <p class="product-price">$${product.price}</p>
        <span class="product-stock ${stock.class}">${stock.text}</span>
      </div>
    </article>
  `;
  document.querySelector("#productGrid").insertAdjacentHTML("beforeend", html);
}
```

</details>

### Del 5 - CSS kan også!

JavaScript er smart til at manipulere data, men CSS kan faktisk også klippe tekst!

- Udkommenter brugen af `getExcerpt()` og vis den fulde beskrivelse igen:

```javascript
<p class="product-description">${product.description}</p>
```

- Tilføj nu disse CSS-regler til `.product-description` i `app.css`:

```css
.product-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
  /* Begræns til 3 linjer */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

- Test hvad det gør! Smart, ikke? 😎
- Men du har nu lært at arbejde med tekststrenge i JavaScript - det bliver du nødt til senere!

### Del 6 - Refleksion

- Hvad er fordelen ved at opdele koden i hjælpefunktioner?
- Hvornår ville du bruge JavaScript til at klippe tekst vs. CSS?
- Kan du se andre steder hvor hjælpefunktioner ville give mening?

---

## 2. ES Modules - Import og Export

Vores `app.js` er ved at blive uoverskuelig! Best practice er at opdele koden i flere filer, hvor hver fil har ét specifikt ansvar.

Lad os bruge **ES Modules** til at organisere vores kode bedre.

### Del 1 - Aktiver moduler

- Først skal vi aktivere moduler i vores HTML. Tilføj `type="module"` til script-tagget i `index.html`:

```html
<script src="app.js" type="module"></script>
```

- Du kan nu også fjerne `"use strict";` fra `app.js` - det slås automatisk til i moduler!

### Del 2 - Opret data.js

- Opret en ny fil: `data.js`
- Flyt hele `const products = [...]` fra `app.js` til `data.js`
- Eksporter products fra `data.js`. Du har to muligheder:

**Mulighed 1 - Named export:**

```javascript
export const products = [
  // ... alle produkterne
];
```

**Mulighed 2 - Export i bunden:**

```javascript
const products = [
  // ... alle produkterne
];

export { products };
```

**Mulighed 3 - Default export:**

```javascript
const products = [
  // ... alle produkterne
];

export default products;
```

- Vælg én af metoderne. Vi anbefaler named export (mulighed 1).

### Del 3 - Importer i app.js

- Hvis du kører siden nu, får du en fejl: `products is not defined`
- Vi skal importere `products` i toppen af `app.js`:

**Ved named export:**

```javascript
import { products } from "./data.js";

document.addEventListener("DOMContentLoaded", initApp);
// ... resten af koden
```

**Ved default export:**

```javascript
import products from "./data.js";
```

- Test at produkterne vises igen!

### Del 4 - Opret helpers.js

- Opret en ny fil: `helpers.js`
- Flyt `getExcerpt` og `getStockStatus` til `helpers.js`
- Eksporter begge funktioner:

```javascript
export function getExcerpt(text) {
  const excerpt = text.substring(0, 100) + "...";
  return excerpt;
}

export function getStockStatus(inStock) {
  if (inStock) {
    return {
      text: "På lager",
      class: "in-stock"
    };
  } else {
    return {
      text: "Udsolgt",
      class: "out-of-stock"
    };
  }
}
```

- Importer funktionerne i `app.js`:

```javascript
import { products } from "./data.js";
import { getExcerpt, getStockStatus } from "./helpers.js";
```

- Test at alt stadig virker!

### Del 5 - Filestruktur

Din filstruktur skulle nu se sådan ud:

```
📁 webshop-products/
  📄 index.html
  📄 app.css
  📄 app.js         (initialisering og display-funktioner)
  📄 data.js        (produktdata)
  📄 helpers.js     (hjælpefunktioner)
```

### Del 6 - Refleksion

- Hvorfor er det smart at opdele koden i flere filer?
- Hvad er forskellen på named export og default export?
- Hvordan gør moduler det nemmere at arbejde i teams?

**Læs mere:**

- https://thevalleyofcode.com/#es-modules

---

## 3. Arrow Functions

Arrow functions er en kortere syntaks til at skrive funktioner. De bruges MEGET i moderne JavaScript og især i React!

### Del 1 - Grundlæggende syntaks

Traditionel funktion:

```javascript
function greet(name) {
  return "Hej " + name;
}
```

Arrow function:

```javascript
const greet = name => {
  return "Hej " + name;
};
```

Endnu kortere (når der kun er ét statement):

```javascript
const greet = name => "Hej " + name;
```

- Test begge i konsollen!

### Del 2 - Eksperimenter

Tilføj følgende i bunden af `app.js` (bare til test):

```javascript
// Traditionel
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));

// Arrow function
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 3));

// Traditionel
function square(x) {
  return x * x;
}
console.log(square(4));

// Arrow function (kort syntaks)
const squareArrow = x => x * x; // Parenteser kan droppes ved ét parameter
console.log(squareArrow(4));
```

### Del 3 - Konverter til arrow functions

- Konverter `getExcerpt` i `helpers.js` til en arrow function:

```javascript
export const getExcerpt = text => {
  const excerpt = text.substring(0, 100) + "...";
  return excerpt;
};

// Eller endnu kortere:
export const getExcerpt = text => text.substring(0, 100) + "...";
```

- Konverter også `getStockStatus` til arrow function (denne kan ikke forkortes lige så meget pga. if-statement).

### Del 4 - Arrow functions i loops

- I `displayAllProducts` bruger vi et for-of loop. Vi kan også bruge `.forEach()` med en arrow function:

**Før:**

```javascript
function displayAllProducts() {
  document.querySelector("#productGrid").innerHTML = "";
  for (const product of products) {
    displayProduct(product);
  }
}
```

**Efter:**

```javascript
const displayAllProducts = () => {
  document.querySelector("#productGrid").innerHTML = "";
  products.forEach(product => displayProduct(product));
};
```

Eller endnu kortere:

```javascript
const displayAllProducts = () => {
  document.querySelector("#productGrid").innerHTML = "";
  products.forEach(displayProduct);
};
```

### Del 5 - Refleksion

- Hvornår er arrow functions smart at bruge?
- Hvad er forskellen på en traditionel funktion og en arrow function?
- **Vigtigt:** Arrow functions arver `this` fra det omkringliggende scope (forklares mere senere).

---

## 4. Array Method: .map()

`.map()` er en af de vigtigste array-metoder! Den bruges konstant i React til at vise lister af data.

### Del 1 - Hvad er .map()?

`.map()` går igennem hvert element i et array og laver noget med det. Den returnerer et **nyt array** med de transformerede værdier.

Eksempel:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

- Tilføj koden ovenfor i bunden af `app.js` og test i konsollen.

### Del 2 - Arbejd med produkter

- Lav et array med kun produkttitler:

```javascript
const titles = products.map(product => product.title);
console.log(titles);
```

- Lav et array med kun priser:

```javascript
const prices = products.map(product => product.price);
console.log(prices);
```

- Lav et array med custom objekter:

```javascript
const simplified = products.map(product => {
  return {
    name: product.title,
    cost: product.price,
    available: product.inStock
  };
});
console.log(simplified);
```

### Del 3 - Refaktorer displayProduct til at returnere HTML

Lad os først ændre `displayProduct` til at **returnere** HTML i stedet for at indsætte det direkte i DOM'en:

```javascript
function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

  return /*html*/ `
    <article class="product-card">
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${getExcerpt(product.description)}</p>
        <p class="product-price">$${product.price}</p>
        <span class="product-stock ${stock.class}">${stock.text}</span>
      </div>
    </article>
  `;
}
```

- Læg mærke til at vi nu bruger `return` i stedet for `insertAdjacentHTML`
- Funktionen returnerer HTML som en string

### Del 4 - Brug displayProduct med .map()

Nu kan vi bruge `.map()` sammen med vores `displayProduct` funktion:

```javascript
const displayAllProducts = () => {
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = products.map(displayProduct).join("");
};
```

- Hvad sker der her?
  1. `.map(displayProduct)` kalder `displayProduct` for hvert produkt
  2. Hver gang returneres en HTML-string
  3. Vi får et array af HTML-strenge tilbage
  4. `.join("")` sætter dem sammen til én stor string
  5. Vi indsætter det hele i DOM'en med `innerHTML`

Dette er meget smartere fordi:

- `displayProduct` kan genbruges andre steder
- Koden er mere læsbar og organiseret
- Det ligner måden man skriver komponenter i React!

### Del 5 - Refleksion

- Hvad er forskellen på `.map()` og `.forEach()`?
  - `.map()` returnerer et nyt array
  - `.forEach()` returnerer ingenting (undefined)
- Hvorfor er `.map()` perfekt til at generere HTML?
- Hvorfor er det smart at have `displayProduct` som en separat funktion der returnerer HTML?
- I React vil du bruge `.map()` konstant til at vise lister!

---

## 5. Template Literals

Vi har brugt template literals hele tiden, men lad os dykke dybere!

### Del 1 - Hvad er template literals?

**Gammel måde (string concatenation):**

```javascript
const name = "Peter";
const age = 25;
const message = "Hej, jeg hedder " + name + " og er " + age + " år gammel.";
```

**Ny måde (template literals):**

```javascript
const name = "Peter";
const age = 25;
const message = `Hej, jeg hedder ${name} og er ${age} år gammel.`;
```

### Del 2 - Fordele

**1. Nemmere at læse:**

```javascript
// ❌ Svært at læse
const html = '<div class="' + className + '"><h1>' + title + "</h1></div>";

// ✅ Nemt at læse
const html = `<div class="${className}"><h1>${title}</h1></div>`;
```

**2. Multi-line strenge:**

```javascript
// ❌ Gammel måde
const poem = "Roser er røde\n" + "Violer er blå\n" + "JavaScript er fedt\n" + "Det synes du også!";

// ✅ Template literals
const poem = `Roser er røde
Violer er blå
JavaScript er fedt
Det synes du også!`;
```

**3. Udtryk inde i ${}:**

```javascript
const product = products[0];
const discount = 0.2;

const html = `
  <div>
    <h2>${product.title}</h2>
    <p>Pris: $${product.price}</p>
    <p>Med rabat: $${product.price * (1 - discount)}</p>
    <p>Du sparer: $${product.price * discount}</p>
  </div>
`;
```

### Del 3 - Nested template literals

Du kan endda have template literals inde i template literals!

```javascript
const displayAllProducts = () => {
  const grid = document.querySelector("#productGrid");

  grid.innerHTML = `
    <div class="products-header">
      <h2>Alle Produkter (${products.length})</h2>
    </div>
    ${products.map(displayProduct).join("")}
  `;
};
```

- Her bruger vi `displayProduct` funktionen inde i template literal sammen med `.map()`
- Det gør koden meget kortere og mere læsbar!

### Del 4 - Refleksion

- Hvad er fordelene ved template literals?
- Hvornår ville du stadig bruge almindelige strings?
- Hvordan gør template literals HTML-generering nemmere?

---

## 6. Short Conditionals: &&, ||, Ternary Operator

Der er kortere måder at skrive if-statements på. De bruges MEGET i React!

### Del 1 - Forstå Ternary Operator (?:)

Du kender denne type kode:

```javascript
let message;
if (product.inStock) {
  message = "På lager";
} else {
  message = "Udsolgt";
}
```

Det kan skrives meget kortere med **ternary operator**. Syntaksen er:

```
condition ? valueIfTrue : valueIfFalse
```

- Tilføj følgende i bunden af `app.js` for at teste:

```javascript
const testProduct = products[0];
const message = testProduct.inStock ? "På lager" : "Udsolgt";
console.log(message);
```

- Test med forskellige produkter! Hvad viser det?
- Prøv også:

```javascript
const discount = testProduct.price > 100 ? 20 : 10;
console.log(`Rabat: ${discount}%`);
```

### Del 2 - Eksperimenter med ternary

Lad os øve os lidt mere:

- Lav en variabel der viser "Dyrt!" hvis prisen er over 100, ellers "Billigt!"
- Lav en variabel der viser antal stjerner baseret på rating: "⭐⭐⭐⭐⭐" hvis rating > 4, ellers "⭐⭐⭐"
- Lav en variabel der viser kategorien med stort begyndelsesbogstav

<details>
<summary>💡 Løsningsforslag</summary>

```javascript
const priceLabel = testProduct.price > 100 ? "Dyrt!" : "Billigt!";
console.log(priceLabel);

const stars = testProduct.rating.rate > 4 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐";
console.log(stars);

const category = testProduct.category.charAt(0).toUpperCase() + testProduct.category.slice(1);
console.log(category);
```

</details>

### Del 3 - Refaktorer getStockStatus

Prøv selv at refaktorer `getStockStatus` funktionen i `helpers.js` til at bruge ternary operator!

**Hint:** I stedet for if-else, kan du returnere objektet direkte med ternary.

<details>
<summary>💡 Løsningsforslag - Trin 1</summary>

Først kan vi gøre funktionen kortere ved at returnere direkte:

```javascript
export const getStockStatus = inStock => {
  return inStock ? { text: "På lager", class: "in-stock" } : { text: "Udsolgt", class: "out-of-stock" };
};
```

</details>

<details>
<summary>💡 Løsningsforslag - Trin 2 (endnu kortere)</summary>

Med arrow functions kan vi fjerne `return` og `{}`:

```javascript
export const getStockStatus = inStock =>
  inStock ? { text: "På lager", class: "in-stock" } : { text: "Udsolgt", class: "out-of-stock" };
```

</details>

### Del 4 - Ternary direkte i HTML

Ternary operator er super smart i template literals! Du kan bruge den direkte i HTML.

- Prøv at tilføj en "New!" badge kun hvis produktet har id under 5:

```javascript
function displayProduct(product) {
  return /*html*/ `
    <article class="product-card">
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        ${product.id < 5 ? '<span class="badge new">New!</span>' : ""}
        <h2 class="product-title">${product.title}</h2>
        <!-- ... resten -->
      </div>
    </article>
  `;
}
```

- Prøv også at vise prisen i grønt hvis den er under $50, ellers sort:

```javascript
<p class="product-price" style="color: ${product.price < 50 ? 'green' : 'black'}">
  $${product.price}
</p>
```

### Del 5 - Opgave: Brug ternary til stock status

Kan du refaktorer `displayProduct` til at bruge ternary operator direkte i stedet for at kalde `getStockStatus`?

**Hint:** Du skal bruge ternary to gange - én til class og én til text.

<details>
<summary>💡 Løsningsforslag</summary>

```javascript
function displayProduct(product) {
  return /*html*/ `
    <article class="product-card">
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${getExcerpt(product.description)}</p>
        <p class="product-price">$${product.price}</p>
        <span class="product-stock ${product.inStock ? "in-stock" : "out-of-stock"}">
          ${product.inStock ? "På lager" : "Udsolgt"}
        </span>
      </div>
    </article>
  `;
}
```

**Note:** Nu bruger vi ternary direkte! Du kan vælge om du vil beholde `getStockStatus` eller bruge ternary - begge tilgange er fine.

</details>

### Del 6 - Logical AND (&&)

`&&` er smart når du kun vil vise noget hvis en condition er sand.

- Tilføj i bunden af `app.js`:

```javascript
const testProduct = products[0];

// Traditionel måde
if (testProduct.rating.count > 100) {
  console.log("Populært produkt!");
}

// Med &&
testProduct.rating.count > 100 && console.log("Populært produkt!");
```

- Begge gør det samme! Hvis betingelsen er falsk, sker der ingenting.

**Prøv selv:**

- Log "Billigt!" hvis prisen er under 50
- Log "Top rated!" hvis rating er over 4.5

### Del 7 - && i template literals

Det smarte er at bruge `&&` direkte i HTML:

```javascript
const html = `
  <div class="product-info">
    <h2>${testProduct.title}</h2>
    ${testProduct.inStock && '<span class="badge">På lager! 🎉</span>'}
    ${testProduct.price < 50 && '<span class="badge">Godt tilbud! 💰</span>'}
    ${testProduct.rating.rate > 4.5 && '<span class="badge">⭐ Top rated!</span>'}
  </div>
`;
console.log(html);
```

- Hvad sker der? Hvis betingelsen er sand, vises HTML'en. Hvis falsk, vises ingenting!
- Prøv at tilføje en af disse badges til dine produktkort!

### Del 8 - Logical OR (||)

`||` bruges til fallback-værdier (hvis noget er undefined/null, brug en default værdi).

```javascript
// Hvis product.name ikke findes, brug "Unavngivet produkt"
const name = product.name || "Unavngivet produkt";
const image = product.image || "placeholder.png";
const description = product.description || "Ingen beskrivelse";
```

- Prøv i konsollen:

```javascript
const testProduct = products[0];
console.log(testProduct.name || "Unavngivet"); // Hvad vises?
console.log(testProduct.color || "Ingen farve"); // Hvad vises?
```

### Del 9 - Prøv selv!

Refaktorer dele af din kode til at bruge short conditionals:

1. Brug `&&` til at vise en "Bestseller" badge hvis `rating.count > 200`
2. Brug ternary til at vise "Free shipping" hvis prisen er over $100
3. Brug `||` til at give en default beskrivelse hvis `product.description` er tom

### Del 10 - Refleksion

- Hvornår er ternary operator bedre end if-else?
- Hvornår er if-else mere læsbar?
- Hvad er forskellen på `&&` og ternary operator?
- Hvorfor er short conditionals populære i React?

---

## 7. Fetch, async og await

Nu skal vi hente data fra en server i stedet for at have det lokalt!

### Del 1 - Client-Server Arkitektur

Indtil nu har vi haft al vores data lokalt i `data.js`. Men i den virkelige verden kommer data fra en **server**.

**Sådan fungerer det:**

```
┌─────────────┐                    ┌─────────────┐
│   Client    │ ←─── Internet ───→ │   Server    │
│ (Browser)   │                    │  (GitHub)   │
│             │                    │             │
│  app.js  ←──┼──── Request ──────→│  products   │
│             │                    │   .json     │
│  Viser   ←──┼──── Response ─────→│             │
│  data       │     (JSON data)    │             │
└─────────────┘                    └─────────────┘
```

**Processen:**

1. **Client** (din browser) sender en **request** til serveren: "Giv mig produkterne!"
2. **Server** (GitHub) sender en **response** tilbage med data i JSON-format
3. **Client** modtager data og viser det til brugeren

**Hvorfor?**

- ✅ Data kan opdateres uden at ændre koden
- ✅ Flere brugere kan få samme data
- ✅ Data kan være dynamisk (f.eks. priser, lagerstatus)
- ✅ Data kan komme fra databaser

### Del 2 - Fjern lokal data

- Udkommenter eller slet importen af products i `app.js`:

```javascript
// import { products } from "./data.js";  // Udkommenter denne
import { getExcerpt, getStockStatus } from "./helpers.js";
```

- Siden viser nu ingen produkter - det skal vi fixe ved at hente data fra serveren!

### Del 3 - Hvad er fetch?

`fetch()` er JavaScript's indbyggede funktion til at **hente data fra en server**.

**Traditionel måde (Promises med .then()):**

```javascript
fetch("url")
  .then(response => response.json())
  .then(data => console.log(data));
```

**Moderne måde (async/await):**

```javascript
async function getData() {
  const response = await fetch("url");
  const data = await response.json();
  console.log(data);
}
```

- Vi vil bruge `async/await` - det er mere læseligt!

### Del 4 - Forstå async/await

Når du henter data fra en server, tager det tid (måske 100ms, måske 2 sekunder). JavaScript skal **vente** på svaret.

**Problem uden async/await:**

```javascript
const response = fetch("url"); // Starter request
console.log(response); // Promise { <pending> } - ikke færdig!
const data = response.json(); // ❌ Fejl! Response er ikke klar endnu
```

**Løsning med async/await:**

```javascript
async function getData() {
  const response = await fetch("url"); // ⏳ Venter på response
  const data = await response.json(); // ⏳ Venter på parsing
  console.log(data); // ✅ Data er klar!
}
```

- `async` markerer at funktionen er asynkron
- `await` siger "vent her indtil dette er færdigt"

### Del 5 - Test fetch i konsollen

- Åbn konsollen og prøv:

```javascript
const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
const response = await fetch(url);
console.log(response);
```

- Hvad ser du? Du får et `Response` objekt tilbage!
- Se på `response.status` - hvis det er `200`, var requesten succesful
- Se på `response.ok` - `true` hvis status er 200-299

- Nu skal vi parse JSON-data:

```javascript
const data = await response.json();
console.log(data);
```

- Nu ser du et array af produkter! 🎉

### Del 6 - Opret getAllProducts i helpers.js

Nu skal vi lave en funktion der henter produkterne. Tilføj følgende i `helpers.js`:

```javascript
export const getAllProducts = async () => {
  const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
```

**Forklaring:**

- `async` markerer at funktionen er asynkron (den venter på noget)
- `await` venter på at fetch er færdig før den fortsætter
- Vi henter data fra en JSON-fil på GitHub (vores "server")
- `.json()` parser JSON-strengen til et JavaScript array
- Funktionen returnerer arrayet med produkter

**Hvad sker der?**

1. `fetch(url)` sender en HTTP GET request til GitHub
2. Serveren (GitHub) sender JSON-filen tilbage
3. `response.json()` konverterer JSON-tekst til JavaScript objekter
4. Vi returnerer arrayet så det kan bruges i `app.js`

### Del 7 - Brug getAllProducts i app.js

- Importer funktionen:

```javascript
import { getExcerpt, getStockStatus, getAllProducts } from "./helpers.js";
```

- Opdater `initApp` til at være async og hente data:

```javascript
async function initApp() {
  console.log("App initialized 🚀");
  const products = await getAllProducts();
  displayAllProducts(products);
}
```

- Opdater `displayAllProducts` til at modtage products som parameter:

```javascript
const displayAllProducts = products => {
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = products.map(displayProduct).join("");
};
```

- Nu kalder vi `displayProduct` for hvert produkt via `.map()` - meget nemmere!

**Hvad sker der nu?**

1. Når siden loader, kaldes `initApp()`
2. `initApp()` venter på at `getAllProducts()` henter data fra serveren
3. Når data er hentet, kaldes `displayAllProducts(products)`
4. Produkterne vises på siden!

### Del 8 - Test!

- Reload siden. Du skulle nu se alle 20 produkter fra API'et!
- Tjek konsollen - ser du "App initialized 🚀"?
- **Vigtigt:** Åbn Developer Tools → Network-fanen:
  - Reload siden
  - Find requesten til `products.json`
  - Klik på den og se:
    - **Headers**: Se request URL, method (GET), status (200)
    - **Response**: Se den rå JSON-data fra serveren
    - **Timing**: Hvor lang tid tog det?

**Eksperiment:**

- Sluk for internettet (eller simuler offline i DevTools)
- Reload siden - hvad sker der?
- Tænd internettet igen og reload

### Del 9 - Error handling

Hvad hvis netværket fejler? Eller hvis URL'en er forkert? Vi skal håndtere fejl!

**Først, lad os se hvad der kan gå galt:**

- Prøv at ændre URL'en i `getAllProducts` til noget forkert og reload siden
- Hvad sker der i konsollen?

**Tilføj try-catch:**

```javascript
export const getAllProducts = async () => {
  const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Kunne ikke hente produkter:", error);
    return [];
  }
};
```

**Forklaring:**

- `try` - prøv at køre denne kode
- `catch` - hvis der sker en fejl, håndter den her
- `response.ok` - tjekker om status er 200-299 (success)
- Hvis fejl, returnerer vi et tomt array `[]` i stedet for at crashe

**Test:**

1. Ret URL'en så den er forkert - se fejlbeskeden i konsollen
2. Ret URL'en tilbage - det virker igen!
3. Åbn DevTools → Network → Throttling → Offline - simuler ingen internet

### Del 10 - Loading state (valgfrit)

Det ville være smart at vise en loading-besked mens data hentes:

```javascript
async function initApp() {
  console.log("App initialized 🚀");

  // Vis loading
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = "<p>Henter produkter...</p>";

  // Hent data
  const products = await getAllProducts();

  // Vis produkter
  displayAllProducts(products);
}
```

- Prøv det! (Du skal måske throttle netværket i DevTools for at se loading-beskeden)

### Del 11 - Refleksion

- Hvad er forskellen på synkron og asynkron kode?
- Hvorfor bruger vi `async/await` i stedet for `.then()`?
- Hvordan ville du vise en loading-indikator mens data hentes?

---

## 8. `product.html` - Produktdetaljeside

Nu skal vi lave en dedikeret side til at vise ét produkt med alle detaljer!

**Hvad skal vi bygge?**

- En separat HTML-side (`product.html`) til at vise produktdetaljer
- Navigation: Fra produktliste til detaljeside via klik
- URL-parametre: Brug `?id=1` til at identificere hvilket produkt der skal vises
- Dynamisk indhold: Hent det rigtige produkt og vis alle detaljer

### Del 1 - Forstå URL-parametre

Når du klikker på et produkt, skal browseren vide **hvilket** produkt der skal vises.

Vi bruger **URL-parametre** til dette:

```
index.html              → Viser alle produkter
product.html?id=1       → Viser produkt med id 1
product.html?id=5       → Viser produkt med id 5
product.html?id=10      → Viser produkt med id 10
```

**Sådan fungerer det:**

1. Bruger klikker på produkt #5 på `index.html`
2. Link sender brugeren til `product.html?id=5`
3. `product.js` læser `id=5` fra URL'en
4. Finder produkt med `id: 5` i data
5. Viser produktets detaljer

### Del 2 - Tilføj links på index.html

Først skal vi gøre produkterne klikbare! Opdater `displayProduct` funktionen:

**Find denne linje i din `displayProduct` funktion:**

```javascript
<img src="${product.image}" class="product-image" />
```

**Ændr den til:**

```javascript
<a href="product.html?id=${product.id}">
  <img src="${product.image}" class="product-image" />
</a>
```

**Find også denne linje:**

```javascript
<h2 class="product-title">${product.title}</h2>
```

**Ændr den til:**

```javascript
<h2 class="product-title">
  <a href="product.html?id=${product.id}">${product.title}</a>
</h2>
```

- Test det! Klik på et produkt - URL'en ændrer sig til `product.html?id=...`
- Siden findes ikke endnu - det skal vi fikse!

### Del 3 - Opret product.html

Opret en ny fil `product.html`:

```html
<!doctype html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product - RACE</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <header>
      <h1>Product Details</h1>
      <a href="index.html">← Tilbage til alle produkter</a>
    </header>
    <main>
      <section id="product" class="product-detail">
        <!-- Product details will be dynamically inserted here -->
      </section>
    </main>

    <footer>
      <p>© RACE</p>
    </footer>

    <script src="product.js" type="module"></script>
  </body>
</html>
```

- Reload siden - du skulle nu se en tom side med "Product Details"

### Del 4 - Opret product.js - Basis struktur

Opret en ny fil `product.js`. Start med grundstrukturen:

```javascript
import { getAllProducts } from "./helpers.js";

document.addEventListener("DOMContentLoaded", initProduct);

async function initProduct() {
  console.log("Product page initialized 🚀");
}
```

- Reload `product.html` - se konsollen. Virker det?

### Del 5 - Læs URL-parametre

Nu skal vi læse `id` fra URL'en. Tilføj i `initProduct`:

```javascript
async function initProduct() {
  console.log("Product page initialized 🚀");

  // Læs URL-parametre
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("Product ID:", id);
}
```

**Forklaring:**

- `window.location.search` returnerer `?id=1` (den del efter `?` i URL'en)
- `URLSearchParams` parser parametrene
- `.get("id")` henter værdien af `id` parameteren

**Test:**

- Gå til `product.html?id=5` - hvad vises i konsollen?
- Gå til `product.html?id=10` - hvad vises i konsollen?
- Gå til `product.html` (uden id) - hvad vises?

### Del 6 - Hent produkter og find det rigtige

Nu skal vi hente alle produkter og finde det med det rigtige id:

```javascript
async function initProduct() {
  console.log("Product page initialized 🚀");

  // Læs URL-parametre
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("Product ID:", id);

  // Hent alle produkter
  const products = await getAllProducts();
  console.log("Products:", products);

  // Find det specifikke produkt
  const product = products.find(p => p.id == id);
  console.log("Found product:", product);
}
```

**Prøv selv først!** Kan du bruge `.find()` til at finde produktet?

<details>
<summary>💡 Forklaring af .find()</summary>

`.find()` går igennem arrayet og returnerer det **første element** der matcher betingelsen:

```javascript
const products = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" }
];

const product = products.find(p => p.id == 2);
// Returnerer: { id: 2, name: "B" }
```

**Vigtigt:** Vi bruger `==` (ikke `===`) fordi URL-parametre er strings (`"1"`), men produkt-id'er er numbers (`1`). `==` konverterer automatisk.

</details>

**Test i konsollen:**

- Gå til `product.html?id=1` - ser du det rigtige produkt?
- Gå til `product.html?id=999` - hvad returnerer `.find()`? (`undefined`)

### Del 7 - Håndter ikke-fundet produkter

Hvad hvis produktet ikke findes? Tilføj en if-check:

```javascript
async function initProduct() {
  console.log("Product page initialized 🚀");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const products = await getAllProducts();
  const product = products.find(p => p.id == id);

  if (product) {
    console.log("Produkt fundet:", product);
    // Vi skal vise produktet her (kommer snart!)
  } else {
    document.querySelector("#product").innerHTML = "<p>Produkt ikke fundet!</p>";
  }
}
```

**Test:**

- Gå til `product.html?id=999` - ser du fejlbeskeden?
- Gå til `product.html?id=1` - ser du "Produkt fundet" i konsollen?

### Del 8 - Vis produktet - Start simpelt

Lad os starte med at vise produktet meget simpelt:

```javascript
function displayProduct(product) {
  const html = `
    <div>
      <h1>${product.title}</h1>
      <p>Pris: $${product.price}</p>
      <p>${product.description}</p>
    </div>
  `;

  document.querySelector("#product").innerHTML = html;
}
```

- Kald funktionen i `initProduct`:

```javascript
if (product) {
  displayProduct(product);
} else {
  document.querySelector("#product").innerHTML = "<p>Produkt ikke fundet!</p>";
}
```

**Test:**

- Gå til `product.html?id=1` - ser du produkttitlen?
- Prøv forskellige id'er!

### Del 9 - Forbedre displayProduct - Tilføj billede og kategori

Lad os gradvist gøre det pænere:

```javascript
function displayProduct(product) {
  const html = /*html*/ `
    <div class="product-detail-container">
      <div class="product-image-large">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-details">
        <h1>${product.title}</h1>
        <p class="category">Kategori: ${product.category}</p>
        <p class="price-large">$${product.price}</p>
        <p>${product.description}</p>
      </div>
    </div>
  `;

  document.querySelector("#product").innerHTML = html;
}
```

- Test! Det ser allerede bedre ud!

### Del 10 - Tilføj stock status

Vi kan genbruge `getStockStatus` fra `helpers.js`!

```javascript
import { getAllProducts, getStockStatus } from "./helpers.js";
```

- Opdater `displayProduct`:

```javascript
function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

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
        <p>${product.description}</p>
      </div>
    </div>
  `;

  document.querySelector("#product").innerHTML = html;
}
```

### Del 11 - Tilføj rating og knap

Nu tilføjer vi de sidste detaljer:

```javascript
function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

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

  document.querySelector("#product").innerHTML = html;
}
```

**Læg mærke til:**

- **Rating**: Viser stjerner og antal anmeldelser
- **Beskrivelse**: Nu med overskrift og bedre formatering
- **Knap**: Bruger ternary operator til at ændre tekst og CSS-class baseret på lager-status

### Del 12 - Opgave: Gør knappen klikbar

Kan du tilføje en event listener til "Tilføj til kurv" knappen? Den skal bare logge "Produkt tilføjet!" i konsollen for nu.

**Hint:** Du skal bruge `querySelector` og `addEventListener` EFTER HTML'en er indsat.

<details>
<summary>💡 Løsningsforslag</summary>

```javascript
function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

  const html = /*html*/ `
    <!-- ... hele HTML'en ... -->
  `;

  document.querySelector("#product").innerHTML = html;

  // Tilføj event listener til knappen
  const button = document.querySelector(".add-to-cart-btn");
  if (product.inStock) {
    button.addEventListener("click", () => {
      console.log("Tilføj til kurv:", product);
      alert(`${product.title} tilføjet til kurv!`);
    });
  }
}
```

</details>

### Del 13 - Tilføj CSS

Tilføj følgende CSS til `app.css` for at style detaljesiden:

```css
/* Product Detail Page */
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

.product-image-large img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 500px;
}

.product-details h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.category {
  color: #7f8c8d;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.price-large {
  font-size: 2.5rem;
  color: #27ae60;
  font-weight: bold;
  margin: 1rem 0;
}

.rating {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.description-full {
  margin: 2rem 0;
  line-height: 1.8;
}

.add-to-cart-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.add-to-cart-btn.disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

header a {
  color: white;
  text-decoration: none;
  margin-top: 0.5rem;
  display: inline-block;
}

header a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .product-detail-container {
    grid-template-columns: 1fr;
  }
}
```

- Test på forskellige skærmstørrelser!
- Prøv at gøre browservinduet mindre - ser du at layoutet ændrer sig til 1 kolonne?

### Del 14 - Test hele flowet

Lad os teste hele brugeroplevelsen:

1. **Start på index.html**
   - Ser du alle produkter?
   - Er billederne og titlerne klikbare?

2. **Klik på et produkt**
   - Bliver du sendt til `product.html?id=...`?
   - Vises det korrekte produkt?

3. **Tjek detaljer**
   - Vises billede, titel, pris, kategori?
   - Vises rating korrekt?
   - Er "Tilføj til kurv" knappen korrekt baseret på lager-status?

4. **Test edge cases**
   - Gå til `product.html?id=999` - vises fejlbeskeden?
   - Gå til `product.html` uden id - hvad sker der?

5. **Gå tilbage**
   - Virker "← Tilbage til alle produkter" linket?

### Del 15 - Eksperimenter og forbedringer

Prøv at tilføje flere features:

1. **"Lignende produkter"**: Vis andre produkter fra samme kategori

```javascript
// I product.js, i initProduct:
const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id);
console.log("Lignende produkter:", similarProducts);
```

2. **"Forrige/Næste" knapper**: Navigér mellem produkter

3. **Zoom på billede**: Gør billedet større ved klik

4. **Del-knap**: Kopiér URL til clipboard

<details>
<summary>💡 Eksempel: Kopiér URL</summary>

```javascript
const shareButton = document.createElement("button");
shareButton.textContent = "📋 Del produkt";
shareButton.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link kopieret!");
});
```

</details>

### Del 16 - Refleksion

- **URL-parametre**: Hvordan fungerer `?id=1` og hvorfor er det smart?
- **Routing**: Hvordan ville du bygge en app med mange forskellige sider?
- **.find() vs .filter()**: Hvad er forskellen? Hvornår bruger du hvilken?
- **Code reuse**: Vi genbrugte `getAllProducts` og `getStockStatus` - hvorfor er det smart?
- **User experience**: Hvad kunne forbedre brugeroplevelsen yderligere?
- **Error handling**: Hvad sker der hvis fetch fejler på product.html? Kan du forbedre det?

**Næste niveau:**

- Hvordan ville du implementere en indkøbskurv?
- Hvordan kunne du gemme brugerens favoritter i `localStorage`?
- Kunne du lave en søgefunktion der filtrerer produkter?

---

## 🎉 Tillykke!

Du har nu lært:

- ✅ Hjælpefunktioner og kode-organisation
- ✅ ES Modules (import/export)
- ✅ Arrow functions
- ✅ `.map()` array method
- ✅ Template literals
- ✅ Short conditionals (ternary, &&, ||)
- ✅ Fetch, async/await
- ✅ URL-parametre og routing

**Næste skridt:**

- Tilføj filter-funktionalitet (vis kun bestemte kategorier)
- Tilføj søgefunktion
- Lav en "tilføj til kurv"-funktionalitet
- Gem kurv i localStorage
