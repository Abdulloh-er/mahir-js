const API_URL = "https://dummyjson.com/recipes";

let recipes = [];
let favorites = [];

const recipeGrid = document.getElementById("recipe-grid");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const emptyState = document.getElementById("empty-state");

const recipeCount = document.getElementById("recipe-count");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const cuisineFilter = document.getElementById("cuisine-filter");
const difficultyFilter = document.getElementById("difficulty-filter");
const resetFilterButton = document.getElementById("reset-filter-button");

const favoriteButton = document.getElementById("favorite-button");
const favoriteCount = document.getElementById("favorite-count");

const recipeDialog = document.getElementById("recipe-dialog");
const dialogContent = document.getElementById("dialog-content");
const closeDialog = document.getElementById("close-dialog");

async function getRecipes() {
  try {
    showLoading();

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Gagal mengambil data resep");
    }

    const data = await response.json();
    recipes = data.recipes || [];

    console.log("Data:", data);
    console.log("Daftar resep:", recipes);

    createCuisineFilter();
    displayRecipes(recipes);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function displayRecipes(data) {
  recipeGrid.innerHTML = "";

  loadingState.hidden = true;
  errorState.hidden = true;
  emptyState.hidden = data.length !== 0;
  recipeGrid.hidden = data.length === 0;

  recipeCount.textContent = `${data.length} resep`;

  if (data.length === 0) {
    return;
  }

  data.forEach(function (recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const recipeName = recipe.name || "Resep tanpa nama";
    const recipeTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

    card.innerHTML = `
      <img
        class="recipe-image"
        src="${recipe.image || ""}"
        alt="${recipeName}"
      >

      <div class="recipe-body">
        <span class="recipe-cuisine">${recipe.cuisine || "Tidak diketahui"}</span>
        <h3 class="recipe-title">${recipeName}</h3>

        <div class="recipe-meta">
          <span>Rating: ${recipe.rating ?? 0}</span>
          <span>${recipeTime} menit</span>
          <span>${recipe.difficulty || "Tidak diketahui"}</span>
        </div>

        <div class="recipe-actions">
          <button class="detail-button" onclick="showDetail(${recipe.id})">Lihat Detail</button>

          <button class="like-button" onclick="toggleFavorite(${recipe.id})" aria-label="Favorit">
            ${favorites.includes(recipe.id) ? "Favorit" : "♡"}
          </button>
        </div>
      </div>
    `;

    recipeGrid.appendChild(card);
  });
}

function createCuisineFilter() {
  const categories = [];

  recipes.forEach(function (recipe) {
    if (recipe.cuisine && !categories.includes(recipe.cuisine)) {
      categories.push(recipe.cuisine);
    }
  });

  categories.sort();

  categories.forEach(function (category) {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    cuisineFilter.appendChild(option);
  });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  filterRecipes();
});

cuisineFilter.addEventListener("change", filterRecipes);
difficultyFilter.addEventListener("change", filterRecipes);

function filterRecipes() {
  const keyword = searchInput.value.toLowerCase().trim();
  const category = cuisineFilter.value;
  const difficulty = difficultyFilter.value;

  const filteredRecipes = recipes.filter(function (recipe) {
    const recipeName = (recipe.name || "").toLowerCase();
    const recipeCuisine = (recipe.cuisine || "").toLowerCase();
    const recipeTags = (recipe.tags || []).join(" ").toLowerCase();

    const matchesSearch =
      recipeName.includes(keyword) ||
      recipeCuisine.includes(keyword) ||
      recipeTags.includes(keyword) ||
      (recipe.ingredients || []).join(" ").toLowerCase().includes(keyword);

    const matchesCategory = category === "" || recipe.cuisine === category;
    const matchesDifficulty = difficulty === "" || recipe.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  displayRecipes(filteredRecipes);

  resetFilterButton.hidden = keyword === "" && category === "" && difficulty === "";
}

resetFilterButton.addEventListener("click", function () {
  searchInput.value = "";
  cuisineFilter.value = "";
  difficultyFilter.value = "";

  displayRecipes(recipes);
  resetFilterButton.hidden = true;
});

function showDetail(id) {
  const recipe = recipes.find(function (item) {
    return item.id === id;
  });

  if (!recipe) {
    return;
  }

  const recipeName = recipe.name || "Resep tanpa nama";
  const recipeTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  const recipeDescription =
    (recipe.instructions && recipe.instructions[0]) ||
    `Hidangan ${recipe.cuisine || "ini"} yang dibuat dengan bahan-bahan pilihan.`;

  const ingredients = (recipe.ingredients || [])
    .map(function (item) {
      return `<li>${item}</li>`;
    })
    .join("");

  const instructions = (recipe.instructions || [])
    .map(function (step, index) {
      return `<li>${index + 1}. ${step}</li>`;
    })
    .join("");

  dialogContent.innerHTML = `
    <img
      class="dialog-image"
      src="${recipe.image || ""}"
      alt="${recipeName}"
    >

    <div class="dialog-body">
      <h2>${recipeName}</h2>

      <div class="dialog-meta">
        <span>Asal: ${recipe.cuisine || "Tidak diketahui"}</span>
        <span>Rating: ${recipe.rating ?? 0}</span>
        <span>Kesulitan: ${recipe.difficulty || "Tidak diketahui"}</span>
        <span>Waktu: ${recipeTime} menit</span>
      </div>

      <h3>Deskripsi</h3>
      <div class="instructions">
        <p>${recipeDescription}</p>
      </div>

      <h3>Bahan-bahan</h3>
      <ul class="ingredients">${ingredients}</ul>

      <h3>Cara membuat</h3>
      <ol class="instructions-list">${instructions}</ol>
    </div>
  `;

  recipeDialog.showModal();
}

closeDialog.addEventListener("click", function () {
  recipeDialog.close();
});

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(function (favoriteId) {
      return favoriteId !== id;
    });
  } else {
    favorites.push(id);
  }

  favoriteCount.textContent = favorites.length;
  filterRecipes();
}

favoriteButton.addEventListener("click", function () {
  const favoriteRecipes = recipes.filter(function (recipe) {
    return favorites.includes(recipe.id);
  });

  displayRecipes(favoriteRecipes);

  searchInput.value = "";
  cuisineFilter.value = "";
  difficultyFilter.value = "";
});

function showLoading() {
  loadingState.hidden = false;
  errorState.hidden = true;
  emptyState.hidden = true;
  recipeGrid.hidden = true;
}

function showError() {
  loadingState.hidden = true;
  errorState.hidden = false;
  emptyState.hidden = true;
  recipeGrid.hidden = true;
}

getRecipes();
