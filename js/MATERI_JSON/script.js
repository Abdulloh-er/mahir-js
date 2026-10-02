const API_URL = "https://dummyjson.com/products?limit=194";

let products = [];

// DOM
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");

const reloadBtn = document.querySelector("#reload-btn");
const resetBtn = document.querySelector("#reset-btn");
const retryBtn = document.querySelector("#retry-btn");

const resultSummary = document.querySelector("#result-summary");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const emptyState = document.querySelector("#empty-state");
const errorMessage = document.querySelector("#error-message");

const productDialog = document.querySelector("#product-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogContent = document.querySelector("#dialog-content");

// ------------------------------------
// STATE
// ------------------------------------

function showState(state) {
  loadingState.hidden = state !== "loading";
  errorState.hidden = state !== "error";
  emptyState.hidden = state !== "empty";
  productGrid.hidden = state !== "success";
}

// ------------------------------------
// API
// ------------------------------------

async function loadProducts() {
  showState("loading");
  resultSummary.textContent = "Mengambil data dari API...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    products = data.products;

    fillCategoryOptions();
    applyFilters();
  } catch (error) {
    console.error(error);

    showState("error");
    resultSummary.textContent = "Gagal mengambil data.";
    errorMessage.textContent = "Tidak bisa mengambil data dari DummyJSON. Periksa koneksi internet lalu coba lagi.";
  }
}

// ------------------------------------
// CATEGORY
// ------------------------------------

function fillCategoryOptions() {
  const categories = [...new Set(products.map((product) => product.category))];

  categorySelect.innerHTML = `
    <option value="all">Semua kategori</option>
  `;

  categories.sort().forEach((category) => {
    categorySelect.innerHTML += `
      <option value="${escapeHTML(category)}">
        ${escapeHTML(formatCategory(category))}
      </option>
    `;
  });
}

function formatCategory(category) {
  return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// ------------------------------------
// SEARCH + FILTER + SORT
// ------------------------------------

function applyFilters() {
  const keyword = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  let result = products.filter((product) => {
    const searchText = `
      ${product.title}
      ${product.description}
      ${product.brand || ""}
      ${product.category}
    `.toLowerCase();

    const matchesSearch = searchText.includes(keyword);

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (selectedSort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (selectedSort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  if (selectedSort === "rating-desc") {
    result.sort((a, b) => b.rating - a.rating);
  }

  if (selectedSort === "name-asc") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  resultSummary.textContent = `${result.length} dari ${products.length} product ditampilkan`;

  if (result.length === 0) {
    showState("empty");
    return;
  }

  renderProducts(result);
}

// ------------------------------------
// RENDER
// ------------------------------------

function renderProducts(productList) {
  const cards = productList.map((product) => {
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img
            class="product-image"
            src="${product.thumbnail}"
            alt="${escapeHTML(product.title)}"
            loading="lazy"
          >
        </div>

        <div class="product-body">
          <small class="product-category">
            ${escapeHTML(formatCategory(product.category))}
          </small>

          <h3 class="product-title">
            ${escapeHTML(product.title)}
          </h3>

          <div class="product-meta">
            <strong class="product-price">
              $${Number(product.price).toFixed(2)}
            </strong>

            <span class="product-rating">
              ⭐ ${Number(product.rating).toFixed(1)}
            </span>
          </div>

          <p class="product-description">
            ${escapeHTML(product.description)}
          </p>

          <div class="product-extra">
            <span>📦 Stock: ${product.stock}</span>
            <span>🏷️ ${escapeHTML(product.brand || "No brand")}</span>
          </div>

          <button
            class="detail-btn"
            data-id="${product.id}"
          >
            🔍 Lihat Detail
          </button>
        </div>
      </article>
    `;
  });

  productGrid.innerHTML = cards.join("");
  showState("success");
}

// ------------------------------------
// DETAIL PRODUCT
// ------------------------------------

function openProductDetail(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  dialogContent.innerHTML = `
    <div class="dialog-product">
      <img
        src="${product.thumbnail}"
        alt="${escapeHTML(product.title)}"
      >

      <div>
        <small>${escapeHTML(formatCategory(product.category))}</small>

        <h2>${escapeHTML(product.title)}</h2>

        <p>${escapeHTML(product.description)}</p>

        <div class="dialog-info">
          <div>
            <span>Harga</span>
            <strong>$${Number(product.price).toFixed(2)}</strong>
          </div>

          <div>
            <span>Rating</span>
            <strong>⭐ ${Number(product.rating).toFixed(1)}</strong>
          </div>

          <div>
            <span>Stock</span>
            <strong>${product.stock}</strong>
          </div>

          <div>
            <span>Brand</span>
            <strong>${escapeHTML(product.brand || "No brand")}</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  productDialog.showModal();
}

// Event delegation untuk tombol detail yang dibuat secara dinamis
productGrid.addEventListener("click", (event) => {
  const detailButton = event.target.closest(".detail-btn");

  if (!detailButton) {
    return;
  }

  const productId = Number(detailButton.dataset.id);

  openProductDetail(productId);
});

// ------------------------------------
// RESET
// ------------------------------------

function resetFilters() {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";

  applyFilters();
}

// ------------------------------------
// EVENTS
// ------------------------------------

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

reloadBtn.addEventListener("click", loadProducts);
retryBtn.addEventListener("click", loadProducts);
resetBtn.addEventListener("click", resetFilters);

dialogClose.addEventListener("click", () => {
  productDialog.close();
});

productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) {
    productDialog.close();
  }
});

// ------------------------------------
// SECURITY HELPER
// ------------------------------------

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

// ------------------------------------
// START
// ------------------------------------

loadProducts();
