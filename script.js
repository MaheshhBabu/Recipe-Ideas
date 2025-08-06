async function searchRecipes() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  const res = await fetch(url);
  const data = await res.json();
  displayRecipes(data.meals);
}

function displayRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  if (!recipes) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <h3>${recipe.strMeal}</h3>
      <p>${recipe.strCategory}</p>
    `;
    card.onclick = () => showDetails(recipe);
    container.appendChild(card);
  });
}

function showDetails(recipe) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  content.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" style="width: 100%; border-radius: 8px;" />
    <h4>Category: ${recipe.strCategory}</h4>
    <h4>Area: ${recipe.strArea}</h4>
    <h4>Ingredients:</h4>
    <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h4>Instructions:</h4>
    <p>${recipe.strInstructions}</p>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}