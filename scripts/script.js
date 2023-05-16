// Récupération de l'élément HTML où afficher les recettes

// Variables globales des recettes
let recipesSection          = document.getElementById('section-recipes');
let messageError            = document.getElementById("messageError")
const recipeListElement     = document.getElementById('recipes-list');
const searchBar             = document.getElementById('search-bar');

// Variables globales du filtre ingrédients
let arrowIngredients        = document.getElementById('arrow_ingredients')
let buttonsIngredient       = document.getElementById('container_buttons_ingredients')
let inputIngredients        = document.getElementById('ingredients')
let uniqueIngredients       = new Set();
let listUpdatedIngredients  = new Set();
const filtreIngredient      = document.querySelector("#filtre-ingredient");
const ingredientsList       = document.getElementById("container_hidden_options_ingredients");
const ingredientFilterInput = document.getElementById('ingredient-filter');
let IsOpenIngredients       = false;
buttonsIngredient.style.display ="none";

// Variables globales du filtre Appareils

let arrowAppliances       = document.getElementById('arrow_appareils')
let buttonsAppliances     = document.getElementById('container_buttons_appareils')
let inputAppliances       = document.getElementById('appareils')
let uniqueAppliances       = new Set();
let listUpdatedAppliances = new Set();
const filtreAppareil      = document.querySelector("#filtre-appareil");
const appliancesList        = document.getElementById("container_hidden_options_appareils");
const AppliancesFilterInput = document.getElementById('appareils-filter');
let IsOpenAppliances        = false;
buttonsAppliances.style.display ="none";

// Variables globales du filtre Ustensiles

const ustensilsList         = document.getElementById("container_hidden_options_ustensils");


// Affichage de toutes les recettes au chargement
displayRecipes(recipes);

// EventListeners
searchBar.addEventListener("input", listenToMainInput);

arrowIngredients.addEventListener('click', checkIsOpenIngredients)
inputIngredients.addEventListener('input', listenToInputIngredients)

arrowAppliances.addEventListener('click', checkIsOpenAppliances)
inputAppliances.addEventListener('input', listenToInputAppliances)

// ################################################################
// handling filter ingredients functions ##############################################
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
        ul.appendChild(liIngredient);
})
ingredientsList.appendChild(ul);
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

// ################################################################
// handling filter appliances functions ##############################################
// ################################################################

function changeFilterAppliancesOnInput(data){
    console.log(data, "DATA")
    deleteFilterApp()
    let ul = document.createElement('ul')
    ul.setAttribute('class', "container_hidden_filter_appareils")
    data.forEach(appareil => {
        const liAppliance = document.createElement('li');
        liAppliance.textContent = appareil;
        liAppliance.addEventListener('click', () => {
            addApplianceFilter(appareil);
            updateRecipeList();
        });
        ul.appendChild(liAppliance);
})
appliancesList.appendChild(ul);
}

function checkIsOpenAppliances(){
    console.log(IsOpenAppliances, "IsOpenAppliances")
    if(IsOpenAppliances === false){
        appliancesList.style.display = "inherit"
        console.log(IsOpenAppliances)
        //displayIngredientsList(recipes);
        IsOpenAppliances = true;
        updateRecipeList()
    }else{
        IsOpenAppliances = false;
        deleteFilterIng()
        appliancesList.style.display = "none"
    }
}
// ################################################################
// Listening functions ##############################################
// ################################################################

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
/* à reprendre */
function listenToInputAppliances(){
    let allAppliances = [];
    let valueInputApp= inputAppliances.value;
        if(valueInputApp.length >= 1){
            console.log(uniqueAppliances)
        for(let app of uniqueAppliances){
          if(app.includes(valueInputApp)){
            allAppliances.push(app)
          }  
        }
        listUpdatedAppliances = new Set(allAppliances)
        if(listUpdatedAppliances.size > 0){
            changeFilterAppliancesOnInput(listUpdatedAppliances);
        }else{
            let arrayNoAppFind = []
            arrayNoAppFind.push("aucun ingrédient ne correspond à votre recherche")
            changeFilterAppliancesOnInput(arrayNoAppFind);
        }
        }else{
            console.log(uniqueAppliances)
            changeFilterAppliancesOnInput(uniqueAppliances);
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

// ################################################################
// delete functions ##############################################
// ################################################################

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
function deleteFilterApp(){
    let ourFilter = document.querySelectorAll('.container_hidden_filter_appareils');
    ourFilter.forEach(filter => {
        filter.remove()
    })
}





// ################################################################
// Display functions ##############################################
// ################################################################

/*
 * Réduit la description de la recette
 */

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
    // Création des li de notre liste d'ingrédients
    recipe.ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement('li');
        ingredientElement.textContent = `${ingredient.ingredient}${ingredient.quantity ? ' : ' + ingredient.quantity : ''}${ingredient.unit ? ' ' + ingredient.unit : ''}`;
        container_ingredients.appendChild(ingredientElement);
    });
    // Ajout de la recette à la liste sur la page
    recipeListElement.appendChild(recipeElement);
}

/*
 * Affichage des recettes
 */
function displayRecipes(recipes) {
    let valueInputIng = inputIngredients.value;
    let valueInputApp = inputAppliances.value;
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
            console.log("ça rentre 1")
            displayIngredientsList(recipes);
        }else if(IsOpenIngredients === true && valueInputIng.length >= 1){
            console.log("ça rentre 2")
            ingredientsList.style.display = "inherit"
            console.log(uniqueIngredients)
        }else if(IsOpenAppliances === true && valueInputApp.length === 0){
            console.log("ça rentre 3")
            appliancesList.style.display = "inherit"
            displayAppliancesList(recipes);
        }else if(IsOpenAppliances === true && valueInputApp.length >= 1){
            console.log("ça rentre 4")
            appliancesList.style.display = "inherit"
        }
        // Affichage de la liste des ingrédients
        
        // Affichage de la liste des appareils
        //displayAppliancesList(recipes);
        // Affichage de la liste des u
        //displayUstensilsList(recipes);
    }
}

/*
 * Met à jour la liste des ingrédients affichés
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
    ul.setAttribute('id', "container_hidden_filter_ingredients")
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
 * Met à jour la liste des appareils affichés
 */
function displayAppliancesList(recipes) {
    let ourUl = document.querySelector(".container_hidden_filter_appareils")
    if(ourUl !== null){
        ourUl.remove();
    }
    const appliances = recipes
        .flatMap(recipe => recipe.appliance.toLowerCase());
    uniqueAppliances = [...new Set(appliances)];
    const sortedAppliances = sortAlphabetically(uniqueAppliances);
    let ul = document.createElement('ul')
    ul.setAttribute('id', "container_hidden_filter_appareils")
    ul.setAttribute('class', "container_hidden_filter_appareils")
    sortedAppliances.forEach(appliance => {
        const liAppliance = document.createElement('li');
        liAppliance.textContent = appliance;
        liAppliance.addEventListener('click', () => {
            addApplianceFilter(appliance);
            updateRecipeList();
        });
        appliancesList.appendChild(ul);
        ul.appendChild(liAppliance);
    });
}

/*
 * Met à jour la liste des ustensiles affichés
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
        let icon = document.createElement('img')
        icon.setAttribute("class", "button-appliance")
        icon.setAttribute("src", "/assets/logos/delete.svg")

        const filter = document.createElement('span');
        filter.classList.add('appliance-filter');
        filter.dataset.appliance = applianceName;
        filter.textContent = applianceName;
        filter.addEventListener('click', () => {
            filter.remove();
            updateRecipeList();
        });
        const filterList = document.getElementById('container_buttons_appareils');
        buttonsAppliances.style.display ="flex";
        IsOpenAppliances = false
        filterList.appendChild(filter);
        filter.appendChild(icon);
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
