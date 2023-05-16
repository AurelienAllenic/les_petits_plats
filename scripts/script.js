// Récupération de l'élément HTML où afficher les recettes
let arrowIngredients = document.getElementById('arrow_ingredients')
let recipesSection = document.getElementById('section-recipes');
let buttonsIngredient = document.getElementById('container_buttons_ingredients')
let inputIngredients = document.getElementById('ingredients')
let uniqueIngredients = new Set();
let listUpdatedIngredients = new Set();
let messageError = document.getElementById("messageError")

const recipeListElement     = document.getElementById('recipes-list');
const searchBar             = document.getElementById('search-bar');

const ingredientFilterInput = document.getElementById('ingredient-filter');
const filtreIngredient      = document.querySelector("#filtre-ingredient");
const ingredientsList       = document.getElementById("container_hidden_options_ingredients");
const appliancesList        = document.getElementById("container_hidden_options_appareils");
const ustensilsList         = document.getElementById("container_hidden_options_ustensils");
let IsOpenIngredients = false;
buttonsIngredient.style.display ="none";
// Affichage de toutes les recettes du fichier 'recipes.js' sur la page
displayRecipes(recipes);

// Ajouter un événement
searchBar.addEventListener("input", listenToMainInput);
arrowIngredients.addEventListener('click', checkIsOpenIngredients)
inputIngredients.addEventListener('input', listenToInputIngredients)
// ################################################################
// Display functions ##############################################
// ################################################################

function changeFilterIngredientsOnInput(data){
    console.log(data, "DATA")
    deleteFilterIng()
    let ul = document.createElement('ul')
    ul.setAttribute('class', "container_hidden_filter_ingredients")
    data.forEach(ingredient => {
        const liIngredient = document.createElement('li');
        liIngredient.textContent = ingredient;
        liIngredient.addEventListener('click', () => {
            addIngredientFilter(ingredient);
            updateRecipeList();
        });
        deleteFilterIng()
        ul.appendChild(liIngredient);
})
ingredientsList.appendChild(ul);

}

function listenToInputIngredients(){
    let allIngredients = [];
    let valueInputIng = inputIngredients.value;
        if(valueInputIng.length >= 1){
            console.log(uniqueIngredients)
        for(let ing of uniqueIngredients){
          if(ing.includes(valueInputIng)){
            allIngredients.push(ing)
          }  
        }
        listUpdatedIngredients = new Set(allIngredients)
        if(listUpdatedIngredients.size > 0){
            changeFilterIngredientsOnInput(listUpdatedIngredients);
        }else{
            let arrayNoIngFind = []
            arrayNoIngFind.push("aucun ingrédient ne correspond à votre recherche")
            changeFilterIngredientsOnInput(arrayNoIngFind);
        }
        
        
        }else{
            console.log(uniqueIngredients)
        changeFilterIngredientsOnInput(uniqueIngredients);
        }
}


function listenToMainInput(){
    let mainInput = searchBar.value
    if(mainInput.length >= 3){
        messageError.style.display = "none"
        updateRecipeList()
    }
    else{
        messageError.style.display = "block"
        deleteRecipes();
        deleteFilterIng()
        displayRecipes(recipes)
    }
}

function deleteRecipes(){
    let allRecipes = document.querySelectorAll('.recipe_card');
    allRecipes.forEach(recipe => {
    recipe.remove()
    })
}
function deleteFilterIng(){
    let ourFilter = document.querySelectorAll('.container_hidden_filter_ingredients');
    ourFilter.forEach(filter => {
        filter.remove()
    })
}

function checkIsOpenIngredients(){
    console.log(IsOpenIngredients)
    if(IsOpenIngredients === false){
        ingredientsList.style.display = "inherit"
        console.log(IsOpenIngredients)
        //displayIngredientsList(recipes);
        IsOpenIngredients = true;
        updateRecipeList()
        
    }else{
        IsOpenIngredients = false;
        deleteFilterIng()
        ingredientsList.style.display = "none"
    }
}


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
    // Ajout des ingrédients à la liste
    recipe.ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement('li');
        ingredientElement.textContent = `${ingredient.ingredient}${ingredient.quantity ? ' : ' + ingredient.quantity : ''}${ingredient.unit ? ' ' + ingredient.unit : ''}`;
        container_ingredients.appendChild(ingredientElement);
    });
    // Ajout de la recette à la liste sur la page
    recipeListElement.appendChild(recipeElement);
}

/*
 * Affiche des recettes
 */
function displayRecipes(recipes) {
    let valueInputIng = inputIngredients.value;
    recipeListElement.innerHTML = "";
    if (recipes.length === 0) {
        recipeListElement.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
    } else {
        // Affichage de toutes les recettes sur la page
        recipes.forEach((recipe) => {
            displayRecipe(recipe);
        });
        console.log(IsOpenIngredients, "1")
        if(IsOpenIngredients === true && valueInputIng.length === 0){
            ingredientsList.style.display = "inherit"
            console.log("ça rentre")
            displayIngredientsList(recipes);
        }else if(IsOpenIngredients === true && valueInputIng.length >= 1){
            ingredientsList.style.display = "inherit"
            console.log(uniqueIngredients)
        }
        // Affichage de la liste des ingrédients
        
        // Affichage de la liste des appareils
        //displayAppliancesList(recipes);
        // Affichage de la liste des u
        //displayUstensilsList(recipes);
    }
}

/*
 * Met à jour la liste des ingrédients affichée
 */
function displayIngredientsList(recipes) {
    let ourUl = document.querySelector(".container_hidden_filter_ingredients")
    if(ourUl !== null){
        ourUl.remove();
    }
    const ingredients = recipes
        .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
console.log(ingredients)
    uniqueIngredients = [...new Set(ingredients)];
    const sortedIngredients = sortAlphabetically(uniqueIngredients);
    
    let ul = document.createElement('ul')
    ul.setAttribute('class', "container_hidden_filter_ingredients")
    sortedIngredients.forEach(ingredient => {
        const liIngredient = document.createElement('li');
        liIngredient.textContent = ingredient;
        liIngredient.addEventListener('click', () => {
            addIngredientFilter(ingredient);
            updateRecipeList();
        });
        deleteFilterIng()
        
        ingredientsList.appendChild(ul);
        ul.appendChild(liIngredient);
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
        deleteFilterIng()
        console.log("updateRecipeList")
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
        console.log(filteredRecipes)
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
        deleteFilterIng()
        updateRecipeList();
    } else {
        // Ajouter un nouveau filtre si on clique sur un ingrédient pour la première fois
        let icon = document.createElement('img')
        icon.setAttribute("class", "button-ing")
        icon.setAttribute("src", "/assets/logos/delete.svg")

        const filter = document.createElement('span');
        filter.classList.add('ingredient-filter');
        filter.dataset.ingredient = ingredientName;
        filter.textContent = ingredientName;
        filter.addEventListener('click', () => {
            filter.remove();
            deleteFilterIng()
            updateRecipeList();
        });
        const filterList = document.getElementById('container_buttons_ingredients');
        buttonsIngredient.style.display ="flex";
        IsOpenIngredients = false
        filterList.appendChild(filter);
        filter.appendChild(icon);
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
