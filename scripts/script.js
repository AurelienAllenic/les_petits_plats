

// Récupération de l'élément HTML où afficher les recettes
let recipesSection = document.getElementById('section-recipes');
const recipeListElement     = document.getElementById('recipes-list');
const searchBar             = document.getElementById('search-bar');
const ingredientFilterInput = document.getElementById('ingredient-filter');
const filtreIngredient      = document.querySelector("#filtre-ingredient");
const ingredientsList       = document.getElementById("ingredients-list-container");
const appliancesList        = document.getElementById("appliances-list-container");
const ustensilsList         = document.getElementById("ustensils-list-container");

// Affichage de toutes les recettes du fichier 'recipes.js' sur la page
displayRecipes(recipes);

// Ajouter un événement
searchBar.addEventListener("input", updateRecipeList);


// ################################################################
// Display functions ##############################################
// ################################################################

function ReduceDescription(tab, containerDescription){
    let str = tab;
    let length = null;
    let ending = null
    if (length == null) {
        length = 210;
    }
    if (str.length > length){    
        ending = '...';
        let newStr = str.substring(0, length - ending.length) + ending;
        containerDescription.innerHTML = newStr;
    } else {
    containerDescription.innerHTML = str;    
    }
}


/*
 * Affiche une recette
 */
function displayRecipe(recipe) {

   /* let container = document.createElement('article')
    container.setAttribute("class", "recipe_card")
    recipesSection.appendChild(container)
    container.innerHTML = `
        <span class="container_entire_card"><span class="container_grey_back"></span><span class="container_name_time"><p class="name">${recipe.name}</p><span class="container-time"><svg class="time_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg><p class="time">${recipe.time} min</p></span></span></span>
    `
        let containerDescIng = document.createElement('span')
        containerDescIng.setAttribute("class", "container_desc_ing")
        let container_ingredients = document.createElement('ul')
        container_ingredients.setAttribute("class", "container_ingredients")
        container.appendChild(containerDescIng)
        containerDescIng.appendChild(container_ingredients)
        let containerDescription = document.createElement('p')
        containerDescription.setAttribute('class', 'description_card')
        let recipeDescription = recipe.description;
        ReduceDescription(recipeDescription, containerDescription)
        containerDescIng.appendChild(containerDescription)*/

    // Création des éléments HTML pour afficher la recette
    const recipeElement = document.createElement('article');
    recipeElement.setAttribute("class", "recipe_card")
    recipeElement.innerHTML = `
        <span class="container_entire_card"><span class="container_grey_back"></span><span class="container_name_time"><p class="name">${recipe.name}</p><span class="container-time"><svg class="time_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg><p class="time">${recipe.time} min</p></span></span></span>
    `
    
    let containerDescIng = document.createElement('span')
    containerDescIng.setAttribute("class", "container_desc_ing")
    let container_ingredients = document.createElement('ul')
    container_ingredients.setAttribute("class", "container_ingredients")
    recipeElement.appendChild(containerDescIng)
    containerDescIng.appendChild(container_ingredients)
    let containerDescription = document.createElement('p')
    containerDescription.setAttribute('class', 'description_card')
    let recipeDescription = recipe.description;
    ReduceDescription(recipeDescription, containerDescription)
    containerDescIng.appendChild(containerDescription)
    /*const nameElement = document.createElement('h2');
    const descriptionElement = document.createElement('p');
    const timeElement = document.createElement('p');
    const servingsElement = document.createElement('p');
    const ingredientsElement = document.createElement('ul');
    ingredientsElement.setAttribute("class", "container_ingredients")
    const applianceElement = document.createElement('p');
    const utensilsElement = document.createElement('p');

    // Attribution des valeurs de la recette aux éléments HTML
    nameElement.textContent = recipe.name;
    descriptionElement.textContent = recipe.description;
    timeElement.textContent = `Temps de préparation : ${recipe.time} minutes`;
    servingsElement.textContent = `Nombre de personnes : ${recipe.servings}`;
    applianceElement.textContent = `Appareil requis : ${recipe.appliance}`;
    utensilsElement.textContent = `Ustensiles requis : ${recipe.ustensils.join(', ')}`;
*/
    // Ajout des ingrédients à la liste
    recipe.ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement('li');
        ingredientElement.textContent = `${ingredient.ingredient}${ingredient.quantity ? ' : ' + ingredient.quantity : ''}${ingredient.unit ? ' ' + ingredient.unit : ''}`;
        container_ingredients.appendChild(ingredientElement);
    });
/*
    // Ajout des éléments HTML à la recette
    recipeElement.appendChild(nameElement);
    recipeElement.appendChild(descriptionElement);
    recipeElement.appendChild(timeElement);
    recipeElement.appendChild(servingsElement);
    recipeElement.appendChild(ingredientsElement);
    recipeElement.appendChild(applianceElement);
    recipeElement.appendChild(utensilsElement);
*/
    // Ajout de la recette à la liste sur la page
    recipeListElement.appendChild(recipeElement);
}

/*
 * Affiche des recettes
 */
function displayRecipes(recipes) {
    recipeListElement.innerHTML = "";
    if (recipes.length === 0) {
        recipeListElement.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
    } else {
        // Affichage de toutes les recettes sur la page
        recipes.forEach((recipe) => {
            displayRecipe(recipe);
        });

        // Affichage de la liste des ingrédients
        displayIngredientsList(recipes);
        // Affichage de la liste des appareils
        displayAppliancesList(recipes);
        // Affichage de la liste des u
        displayUstensilsList(recipes);
    }
}

/*
 * Met à jour la liste des ingrédients affichée
 */
function displayIngredientsList(recipes) {
    const ingredients = recipes
        .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));

    const uniqueIngredients = [...new Set(ingredients)];
    const sortedIngredients = sortAlphabetically(uniqueIngredients);

    ingredientsList.innerHTML = "";
    sortedIngredients.forEach(ingredient => {
        const liIngredient = document.createElement('li');
        liIngredient.classList.add('ingredient-list-item');
        liIngredient.style = "display:inline;margin-left: 3px;";
        liIngredient.textContent = ingredient;
        liIngredient.addEventListener('click', () => {
            addIngredientFilter(ingredient);
            updateRecipeList();
        });
        ingredientsList.appendChild(liIngredient);
    });
}

/*
 * Met à jour la liste des appareils affichée
 */
function displayAppliancesList(recipes) {
    const appliances = recipes
        .flatMap(recipe => recipe.appliance.toLowerCase());

    const uniqueAppliances = [...new Set(appliances)];
    const sortedAppliances = sortAlphabetically(uniqueAppliances);

    appliancesList.innerHTML = "";
    sortedAppliances.forEach(appliance => {
        const liAppliance = document.createElement('li');
        liAppliance.classList.add('appliance-list-item');
        liAppliance.style = "display:inline;margin-left: 3px;";
        liAppliance.textContent = appliance;
        liAppliance.addEventListener('click', () => {
            addApplianceFilter(appliance);
            updateRecipeList();
        });
        appliancesList.appendChild(liAppliance);
    });
}

/*
 * Met à jour la liste des ustensiles affichée
 */
function displayUstensilsList(recipes) {
    const ustensils = recipes
        .flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

    const uniqueUstensils = [...new Set(ustensils)];
    const sortedUstensils = sortAlphabetically(uniqueUstensils);

    ustensilsList.innerHTML = "";
    sortedUstensils.forEach(ustensil => {
        const liUstensil = document.createElement('li');
        liUstensil.classList.add('ustensil-list-item');
        liUstensil.style = "display:inline;margin-left: 3px;";
        liUstensil.textContent = ustensil;
        liUstensil.addEventListener('click', () => {
            addUstensilFilter(ustensil);
            updateRecipeList();
        });
        ustensilsList.appendChild(liUstensil);
    });
}

// ################################################################
// Recipes functions ##############################################
// ################################################################

/*
 * Met à jour la liste des recettes et l'affiche avec 'displayRecipes()'
 */
function updateRecipeList() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase().trim();
    const selectedIngredients = Array.from(document.getElementsByClassName("ingredient-filter")).map(span => span.innerText.toLowerCase());
    const selectedAppliances = Array.from(document.getElementsByClassName("appliance-filter")).map(span => span.innerText.toLowerCase());
    const selectedUstensils = Array.from(document.getElementsByClassName("ustensil-filter")).map(span => span.innerText.toLowerCase());

    const filteredRecipes = recipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const hasAllIngredients = selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient));

        const recipeAppliance = recipe.appliance.toLowerCase();
        const hasAllAppliances = selectedAppliances.every(appliance => recipeAppliance.includes(appliance));

        const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        const hasAllUstensils = selectedUstensils.every(ustensil => recipeUstensils.includes(ustensil));

        const searchInFields = recipe.name + " " + recipe.description + " " + recipe.ingredients.map((i) => i.ingredient).join(" ") + recipe.ustensils.map((u) => u).join(" ") + " " + recipe.appliance;

        return searchInFields.toLowerCase().includes(searchTerm) && hasAllIngredients && hasAllAppliances && hasAllUstensils;
    });

    displayRecipes(filteredRecipes);
}


// ################################################################
// Filters functions ##############################################
// ################################################################

/*
 * Ajoute un filtre ingrédient
 */
function addIngredientFilter(ingredientName) {
    // Vérifier si le filtre existe déjà
    const existingFilter = document.querySelector(`.ingredient-filter[data-ingredient="${ingredientName}"]`);
    if (existingFilter) {
        // Supprimer le filtre si on clique à nouveau sur l'ingrédient
        existingFilter.remove();
        updateRecipeList();
    } else {
        // Ajouter un nouveau filtre si on clique sur un ingrédient pour la première fois
        const filter = document.createElement('span');
        filter.classList.add('ingredient-filter');
        filter.dataset.ingredient = ingredientName;
        filter.textContent = ingredientName;
        filter.addEventListener('click', () => {
            filter.remove();
            updateRecipeList();
        });
        const filterList = document.querySelector('.ingredient-filter-list');
        filterList.appendChild(filter);
        sortAlphabeticallyHtml(filterList);
    }
}

/*
 * Ajoute un filtre appareil
 */
function addApplianceFilter(applianceName) {
    // Vérifier si le filtre existe déjà
    const existingFilter = document.querySelector(`.appliance-filter[data-appliance="${applianceName}"]`);
    if (existingFilter) {
        // Supprimer le filtre si on clique à nouveau sur l'appareil
        existingFilter.remove();
        updateRecipeList();
    } else {
        // Ajouter un nouveau filtre si on clique sur un appareil pour la première fois
        const filter = document.createElement('span');
        filter.classList.add('appliance-filter');
        filter.dataset.appliance = applianceName;
        filter.textContent = applianceName;
        filter.addEventListener('click', () => {
            filter.remove();
            updateRecipeList();
        });
        const filterList = document.querySelector('.appliance-filter-list');
        filterList.appendChild(filter);
        sortAlphabeticallyHtml(filterList);
    }
}

/*
 * Ajoute un filtre ustensile
 */
function addUstensilFilter(ustensilName) {
    // Vérifier si le filtre existe déjà
    const existingFilter = document.querySelector(`.ustensil-filter[data-ustensil="${ustensilName}"]`);
    if (existingFilter) {
        // Supprimer le filtre si on clique à nouveau sur l'ustensile
        existingFilter.remove();
        updateRecipeList();
    } else {
        // Ajouter un nouveau filtre si on clique sur un ustensile pour la première fois
        const filter = document.createElement('span');
        filter.classList.add('ustensil-filter');
        filter.dataset.ustensil = ustensilName;
        filter.textContent = ustensilName;
        filter.addEventListener('click', () => {
            filter.remove();
            updateRecipeList();
        });
        const filterList = document.querySelector('.ustensil-filter-list');
        filterList.appendChild(filter);
        sortAlphabeticallyHtml(filterList);
    }
}


// ################################################################
// Helper functions ###############################################
// ################################################################

function sortAlphabetically(uniqueElements) {
    const sortedElements = uniqueElements.sort((a, b) => a.localeCompare(b));

    return sortedElements;
}

function sortAlphabeticallyHtml(htmlElements) {
    const elements = Array.from(htmlElements.children);
    elements.sort((a, b) => a.textContent.localeCompare(b.textContent));
    elements.forEach(elem => htmlElements.appendChild(elem));
}
