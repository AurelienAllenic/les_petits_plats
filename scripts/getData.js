"use strict";

import { recipes } from "../data/data.js";

let isOpen = false;
let isOpenAppareil = false;
let isOpenUstensils = false;
let isInput = false;

let counterFilters = 0;
let ancientConditions = [];

let isValidatedAncient = false;
let isValidatedNew = false;

let recipesFiltered = [];

let buttonFilter = document.getElementById('section-filter-ing');
buttonFilter.style.display = "none";
let filters = document.getElementById('section-filters');
let chars = new Set();
let charsIng = new Set();
let charsUstensiles = new Set();
let charsAppareils = new Set();
let infosFilters = new Set();
let allInfosCombined = new Set();

filters.innerHTML = `
<span class="hidden_button">
<button type="button"></button>
</span>
<article class="all-filters">
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down" id="arrow_ingredients">
        <input type="text" class="ingredients btn-filter" placeholder="Ingrédients" id="ingredients"></input>
        <span id="container_hidden_options_ingredients">
        </span>
    </span>
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down" id="arrow_appareils">
    <input type="text" class="appareils btn-filter" placeholder="Appareils" id="appareils"></input>
        <span id="container_hidden_options_appareils">
        </span>
    </span>
    <span class="container_button_arrow">

    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down"id="arrow_ustensils">
    <input type="text" class="ustensiles btn-filter" placeholder="Ustensiles" id="ustensiles"></input>
    <span id="container_hidden_options_ustensils">
    </span>
        </span>
</article>
`
// Redeclaring global variables after creation of others //
let container_hidden_filter = document.querySelectorAll(".container_hidden_filter")
let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
let sectionAppareil = document.getElementById('container_hidden_options_appareils')
let sectionUstensils = document.getElementById('container_hidden_options_ustensils')

let ArrowIngredients = document.getElementById("arrow_ingredients")
let ArrowAppareils = document.getElementById("arrow_appareils")
let ArrowUstensils = document.getElementById("arrow_ustensils")

let inputSearch = document.getElementById('input-search')
let inputIng = document.getElementById('ingredients')
let inputApp = document.getElementById('appareils')
let inputUst = document.getElementById('ustensiles')

/*--------------------------------------------------------------*/

// --ADDEVENTLISTENERS-- //

// ALL RECIPES DISPLAYED AT LOAD //
addEventListener("load", displayAllRecipes(recipes))

// HANDLING MAIN RESEARCH //

inputSearch.addEventListener("input", listenToMainInput)

/*--------------------------------------------------------------*/

// HANDLING ARROWS FILTERS //

ArrowIngredients.addEventListener('click', checkBeforeopenFilterIng)
inputIng.addEventListener('click', checkBeforeopenFilterIng)
inputIng.addEventListener("input", listenToInputIngredients)

/*--------------------------------------------------------------*/

// FUNCTIONS TO DELETE ELEMENTS //

function deleteRecipes(){
  let allRecipes = document.querySelectorAll('.recipe_card');
  allRecipes.forEach(recipe => {
  recipe.remove()
  })
}

function deleteFilterIng(){
  let ourFilter = document.querySelectorAll('.container_hidden_filter');
  ourFilter.forEach(filter => {
    filter.remove()
  })
  isOpen = false
}

/*-----------------------------------*/

// --FUNCTIONS THAT ARE LISTENING FOR INPUT-- //

function listenToInputIngredients(e){
  let value = e.target.value;
  if(value.length > 0){
    checkFilterMatchRecipes(value)
  }else{
    console.log("pas de caractères en input ing")
  }
}

function listenToMainInput(e){
  let value = e.target.value;
  if(value.length < 3){
    deleteRecipes();
    displayAllRecipes(recipes);
    deleteFilterIng()
    let messageError = document.getElementById("messageError")
    messageError.style.display = "block"
  }
  else{
    messageError.style.display = "none"
    deleteRecipes();
    let recipesFiltered = []
    let allIngredients = [];
    let allUstensils = [];
    let allAppareils = [];
    loopThroughAllInfosOfRecipes(allIngredients, "ingredients") 
    loopThroughAllInfosOfRecipes(allUstensils, "ustensiles")
    loopThroughAllInfosOfRecipes(allAppareils, "appareils") 
    console.log(charsUstensiles, "charsUstensiles")
    console.log(charsIng, "charsIng")
    console.log(charsAppareils, "charsAppareils")
    console.log(recipesFiltered, "recipesFiltered")
    mergeArrays(charsUstensiles, charsIng, charsAppareils)
    
    filterByName(recipes, value, recipesFiltered)
    allInfosCombined = new Set([...recipesFiltered, ...infosFilters])
    console.log(allInfosCombined)
    //New Set infosFilter concat recipesFiltered
    isInput = true
    sortAllRecipesAfterFilter(allInfosCombined)
    changeFilterOnInput(allInfosCombined)
  }
}

/*-----------------------------------------*/

// --FUNCTIONS REDIRECTING WITH CONDITIONNING-- //

function checkBeforeopenFilterIng(data){
  console.log(isOpen)
  if(isOpen === false){
    adaptOnInputFilter(data)
  }else{
    deleteFilterIng()
  }
}

function redirectFilter(data){
  console.log(isInput)
  if(isInput === false){
    CheckIsOpenFilter(data)
  }else{
    deleteFilterIng();
    isOpen = false
  }
}

// ( check for input length and redirect in function ) //

function adaptOnInputFilter(){
  let valueMain = inputSearch.value;
  let valueIng = inputIng.value;
  console.log(valueMain.length)
  if(valueMain.length >= 3){
    console.log("VALUEMAIN", valueMain.length)
    let recipesFiltered = []
    filterByName(recipes, valueMain, recipesFiltered)
    isOpen = true
    changeFilterOnInput(recipesFiltered)
  }
else if(valueIng.length >= 1){
  console.log("VALUEING", valueIng.length)
    let recipesFiltered = []
    filterByName(recipes, valueIng, recipesFiltered)
    isOpen = true
    changeFilterOnInput(recipesFiltered)
  }else{
    isOpen = true
    changeFilterOnInput(recipes)
  }
}

/*-----------------------------------------*/

// --UTILITARY FUNCTIONS TO LOOP THROUGH DATA-- //

function createListFilter(data, ul){
  let count = 0;
  data.forEach(dt => {
  let li = document.createElement('li');
  li.setAttribute("id", "ing-filter"+ count)
  li.innerHTML = `${dt}`
  ul.appendChild(li)
  count++;
  })
}

function changeFilterOnInput(data){
  let CorrespondingIngredients = []
  for(let i = 0; i < data.length; i++){
    let getIngredients = data[i].ingredients;
    getIngredients.forEach(ing => {
      CorrespondingIngredients.push(ing.ingredient)
      chars = new Set(CorrespondingIngredients)
      redirectFilter(chars)
      return chars
    })
  }
  isInput = false
}

function filterByName(data, value, array){
  for(let i =0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(value)){
        array.push(data[i]);
    }
  }
}

// OTHER LIST OF UTILIATRY FUNCTIONS TO TEST

function mergeArrays(arrayUst, arrayIng, arrayApp){
  if(arrayUst.size === 0 && arrayIng.size === 0 && arrayApp.size === 0){
    console.log("PAS DE CORRESPONDANCE AVEC UN FILTRE")
  }
  else{
    console.log("rentre")
  let setUstIng = new Set([...arrayUst, ...arrayIng]);
  infosFilters = new Set([...setUstIng, ...arrayApp]);

  }
}

function loopThroughAllInfosOfRecipes4(array, data){
  if(data === "ingredients"){
    charsIng = new Set(array);
  }
  if(data === "ustensiles"){
    charsUstensiles = new Set(array);
  }
  if(data === "appareils"){
    charsAppareils = new Set(array);
  }
}

function loopThroughAllInfosOfRecipes3(uniqueFilterLowercase, arrayFilter, recipe, data){
  let valueMain = inputSearch.value;
  if(uniqueFilterLowercase.includes(valueMain.toLowerCase())){
    arrayFilter.push(recipe)
    loopThroughAllInfosOfRecipes4(arrayFilter, data)
  }
}

function loopThroughAllInfosOfRecipes2(recipe, arrayFilter, data){
  let recipeIngredients = recipe.ingredients;
  if(data === "ingredients"){
    for(let recipeIngs of recipeIngredients){
      let recipeIngUnique = recipeIngs.ingredient;
      let recipeIngUniqueLowercase = recipeIngUnique.toLowerCase();
      loopThroughAllInfosOfRecipes3(recipeIngUniqueLowercase, arrayFilter, recipe, data)
  }
  } else if(data === "ustensiles"){
    let ustensils = recipe.ustensils;
    for(let ust of ustensils){
      let ustensilsLowercase = ust.toLowerCase();
      loopThroughAllInfosOfRecipes3(ustensilsLowercase, arrayFilter, recipe, data)
    }
  } else if(data === "appareils"){
    let appareil = recipe.appliance;
    let appareilLowercase = appareil.toLowerCase();
    loopThroughAllInfosOfRecipes3(appareilLowercase, arrayFilter, recipe, data)
  }
}

function loopThroughAllInfosOfRecipes(arrayFilter, data){
  for(let recipe of recipes){
    loopThroughAllInfosOfRecipes2(recipe, arrayFilter, data)
  }
}

/*------------------------------------------*/

// --FUNCTIONS CREATING NEW SET FOR SORT-- //

function checkFilterMatchRecipes(){
  let recipesFiltered = [];
  let recipesWithoutOccurencies = [];
  for(let recipe of recipes){
    let ingredients = recipe.ingredients
    for(let ing of ingredients){
      if(ing.ingredient.toLowerCase().includes(inputIng.value)){
        recipesFiltered.push(ing.ingredient);
        for(let ourRecipe of recipesFiltered){
          recipesWithoutOccurencies.push(ourRecipe.toLowerCase())
        }
      chars = new Set(recipesWithoutOccurencies)
    }
    }
    
  //redirectFilter(recipesFiltered)
  }
  redirectFilter(chars)
}

/*-------------------------------------------*/

// --SORT FUNCTION-- //

async function sortAllRecipesAfterFilter(tab) {
  var changed;
  do{
    changed = false;
    for(var i=0; i < tab.length-1; i++) {
      if(tab[i] > tab[i+1]) {
        var current = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = current;
        changed = true;
      }
    }
  } while(changed);
  displayAllRecipes(tab)
}

/*--------------------------------------------*/

// --FUNCTION TO DISPLAY FILTERS ING-- //

function CheckIsOpenFilter(data){
  deleteFilterIng();
  let ul = document.createElement('ul');
  ul.setAttribute("class", "container_hidden_filter")
  sectionIngredients.appendChild(ul)
    sectionIngredients.style.display = "inherit"
    createListFilter(data, ul)
    sectionAppareil.style.display = "none"
    sectionUstensils.style.display = "none"
    isOpen = true
    const elementsLiIng = document.querySelectorAll(`[id^="ing-filter"]`);
    for(let el of elementsLiIng){
      el.addEventListener("click", () => liPressed(el.textContent))
      /*if(el.click()){
        liPressed(el)
      }*/
      
    }
}

/*------------------------------------------*/

// --STEPS TO DISPLAY RECIPES-- //

function checkInfos(ing, container_ingredients){
  //Si tout OK
    if(ing.quantity !== undefined && ing.ingredient !== undefined && ing.unit !== undefined){
        let li = document.createElement('li');        
        li.innerHTML = `
            <span class="important">${ing.ingredient}</span>: ${ing.quantity} ${ing.unit}`
        container_ingredients.appendChild(li)
    }
  // Si pas de quantité et unit
    else if(ing.quantity == undefined && ing.ingredient !== undefined && ing.unit == undefined){
      let li = document.createElement('li');        
      li.innerHTML = `
      <span class="important">
        ${ing.ingredient}
      </span>`
      container_ingredients.appendChild(li)
    }
    // Si unit undefined 
    else if(ing.quantity !== undefined && ing.ingredient !== undefined && ing.unit == undefined){
      let li = document.createElement('li');        
      li.innerHTML = `
      <span class="important"> ${ing.ingredient}</span>: ${ing.quantity}`
      container_ingredients.appendChild(li)
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
  
function displayAllRecipes(elementIterable){
    let recipesSection = document.getElementById('section-recipes');
    elementIterable.forEach(recipe => {
      let container = document.createElement('article')
      container.setAttribute("class", "recipe_card")
      recipesSection.appendChild(container)
      container.innerHTML = `
        <span class="container_entire_card"><span class="container_grey_back"></span><span class="container_name_time"><p class="name">${recipe.name}</p><span class="container-time"><svg class="time_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg><p class="time">${recipe.time} min</p></span></span></span>`
      
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
      
      containerDescIng.appendChild(containerDescription)
      let recipeIngredients = recipe.ingredients;
      recipeIngredients.forEach(ing => {
        checkInfos(ing, container_ingredients)
      })
    });
  }

/*-------------------------------------------*/

// --HANDLING FILTER CHOOSED INTO FILTER INGREDIENTS LIST-- //

function liPressed(filter){
  counterFilters++
  console.log(filter)
  let span = document.createElement('span')
  span.setAttribute("class", "container_button_cross")
  span.setAttribute("data-number", counterFilters)
  let icon = document.createElement('img')
  icon.setAttribute("class", "img-button-ing")
  icon.setAttribute("data-number", counterFilters)
  icon.setAttribute("src", "/assets/logos/delete.svg")
  let p = document.createElement('p')
  p.setAttribute("id", "test")
  buttonFilter.appendChild(span)
  span.appendChild(p)
  span.appendChild(icon)
  p.innerHTML = filter;
  buttonFilter.style.display = "inherit";
  deleteFilterIng()
  inputIng.value = null
  filterByButton(filter)
  
  //Handling Deletion of button

  let listIcon = document.getElementsByClassName('img-button-ing')
  let listSpan = document.getElementsByClassName('container_button_cross')
  for(let icon of listIcon){ 
    let ourSpan = icon.getAttribute("data-number")
    icon.onclick = function() {
      for(let span of listSpan){
        let ourCross = span.getAttribute("data-number")
        if(ourCross === ourSpan){
          span.remove();
        
        }
      
      }
      
      //To Modify, don't fulfill entirely it's mission
      
      displayAllRecipes(recipes)
  }
  }
}

function pushIngredientIntoAncientConditions(conditionToFilter, ourIng, recipe, data){
  if(ourIng === data){
    conditionToFilter.push(recipe)
    isValidatedNew = true;
  }else if(ourIng === ancientConditions){
    isValidatedAncient = true;
  }
}

function loopThroughIngredients(ingArray, conditionToFilter, recipe, data){
  for(let ing of ingArray){
    let ourIng = ing.ingredient;
    pushIngredientIntoAncientConditions(conditionToFilter, ourIng, recipe, data)
  }
}

function conditionningIngredients(conditionToFilter, data){
  if(ancientConditions !== []){
    for(let recipe of recipes){
      let ingArray = recipe.ingredients;
    loopThroughIngredients(ingArray, conditionToFilter, recipe, data)
    }
  }else{
    for(let recipe of recipes){
      let ingArray = recipe.ingredients;
      for(let ing of ingArray){
        let ourIng = ing.ingredient;
        if(ourIng === data){
          conditionToFilter.push(recipe)
        }
      }
    }
  }
  console.log(conditionToFilter)
}

function filterByButton(data){
  let conditionToFilter = [];
  conditionningIngredients(conditionToFilter, data)
  ancientConditions.push(data)
  deleteRecipes()
  sortAllRecipesAfterFilter(conditionToFilter)
  changeFilterOnInput(conditionToFilter)
  deleteFilterIng()
  return ancientConditions
}

/*--------------------------------------------------------*/

// --TO CHECK LATER-- //

function getIngredients(data, value, array){
  for(let i =0; i < data.length; i++){
    if(data[i].toLowerCase().includes(value)){
        array.push(data[i]);
    }
  }
}

// Function to merge both arrays : recipes selected and filters selected




/*let logo =document.getElementById('main-logo')
logo.addEventListener('click', applyFiltering)
function applyFiltering(){
  let mainInput = inputSearch.value
  let inputIngredients = inputIng.value
  console.log(mainInput)
  console.log(inputIngredients)
  if(mainInput !== "" ){
    console.log("passe")
  }
}*/
/*--------------------------------------------------------------*/
