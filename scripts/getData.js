"use strict";

import { recipes } from "../data/data.js";

let isOpen = false;
let isOpenAppareil = false;
let isOpenUstensils = false;
let isInput = false

let counterFilters = 0;
let ancientConditions = []

let isValidatedAncient = false;
let isValidatedNew = false;

let buttonFilter = document.getElementById('section-filter-ing');
buttonFilter.style.display = "none"
let filters = document.getElementById('section-filters')
let chars = new Set()

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
// Redeclaring global variables after their creation //
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



//////////////////////////////////////////////////////

// Function to merge both arrays : recipes selected and filters selected

function mergeArrays(array1, array2){

}

addEventListener("load", displayAllRecipes(recipes))
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

function filterByButton(data){
  console.log(data, "ANCIENT")
  let conditionToFilter = [];
  if(ancientConditions !== []){
    console.log(ancientConditions, "CONDITIONS")
    for(let recipe of recipes){
      let ingArray = recipe.ingredients;
      for(let ing of ingArray){
        let ourIng = ing.ingredient;
        /*if(ourIng === data){
          conditionToFilter.push(recipe)
          isValidatedNew = true;
        }else if(ourIng === ancientConditions){
          isValidatedAncient = true;
        }*/
      }
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
  ancientConditions.push(data)
  deleteRecipes()
  sortAllRecipesAfterFilter(conditionToFilter)
  changeFilterOnInput(conditionToFilter)
  deleteFilterIng()
  return ancientConditions
}

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

function listenToInputIngredients(e){
  let value = e.target.value;
  if(value.length > 0){
    checkFilterMatchRecipes(value)
  }else{
    console.log("pas de caractères en input ing")
  }
}

inputIng.addEventListener("input", listenToInputIngredients)

//////////////////////////////////////////////////////

///////// HANDLING ARROWS FILTERS ///////////////////////////

ArrowIngredients.addEventListener('click', checkBeforeopenFilterIng)
inputIng.addEventListener('click', checkBeforeopenFilterIng)

//ArrowAppareils.addEventListener('click', ()=>{redirectData('appareils', isInput)})

//ArrowUstensils.addEventListener('click', ()=>{redirectData('ustensiles', isInput)})

//////////////////////////////////////////////////////////////////////////////////////////////////

///// CHECK FOR INFOS AS QUANTITY, INGREDIENTS AND ADAPT THE CARD WITH THESE DATAS ////////
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
/////////////////////////////////////////////////////

///// UTILITARY FUNCTION TO REDUCE LENGTH OF RECIPES DESCRIPTIONS //////
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
/////////////////////////////////////////////////////////

//////// FUNCTION TO DISPLAY ALL RECIPES //////////
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
///////////////////////////////////////////////////

////////// FUNCTION TO DISPLAY RECIPES AFTER A FILTER WAS ADDED 
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
////////////////////////////////////////////////////////////////

///// UTILITARY FUNCTION TO DELETE ALL RECIPES //////
function deleteRecipes(){
  let allRecipes = document.querySelectorAll('.recipe_card');
  allRecipes.forEach(recipe => {
  recipe.remove()
  })
}
/////////////////////////////////////////

/* SECTION FILTER INGREDIENT*/



function deleteFilterIng(){
  let ourFilter = document.querySelectorAll('.container_hidden_filter');
  ourFilter.forEach(filter => {
    filter.remove()
  })
  isOpen = false
}

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

function CheckIsOpenFilter(data){
  deleteFilterIng();
  let ul = document.createElement('ul');
  ul.setAttribute("class", "container_hidden_filter")
  sectionIngredients.appendChild(ul)
    sectionIngredients.style.display = "inherit"
    let count = 0;
    data.forEach(dt => {
    let li = document.createElement('li');
    li.setAttribute("id", "ing-filter"+ count)
    li.innerHTML = `${dt}`
    ul.appendChild(li)
    sectionAppareil.style.display = "none"
    sectionUstensils.style.display = "none"
    count++;
    })
    isOpen = true
    const elementsLiIng = document.querySelectorAll(`[id^="ing-filter"]`);
    for(let el of elementsLiIng){
      el.addEventListener("click", () => liPressed(el.textContent))
      /*if(el.click()){
        liPressed(el)
      }*/
      
    }
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


////////// CHECK FOR INPUT LENGTH AND REDIRECT IN FUNCTION /////////

function adaptOnInputFilter(){
  let valueMain = inputSearch.value;
  let valueIng = inputIng.value;
  console.log(valueMain.length)
  if(valueMain.length >= 3){
    console.log("VALUEMAIN", valueMain.length)
    let recipesFiltered = []
    filterWithInclude(recipes, valueMain, recipesFiltered)
    isOpen = true
    changeFilterOnInput(recipesFiltered)
  }
else if(valueIng.length >= 3){
  console.log("VALUEING", valueIng.length)
    let recipesFiltered = []
    filterWithInclude(recipes, valueIng, recipesFiltered)
    isOpen = true
    changeFilterOnInput(recipesFiltered)
  }else{
    isOpen = true
    changeFilterOnInput(recipes)
    
  }
}

//////////////////////////////////////////////////////////

//////// UTILITARY FUNCTION TO GET DATA INTO ARRAY ///////
function filterWithInclude(data, value, array){
  for(let i =0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(value)){
        array.push(data[i]);
    }
  }
}
//////////////////////////////////////////////////////////

////// FUNCTION TRIGGERED BY INPUT IN FILTER INGREDIENTS //////////
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
    filterWithInclude(recipes, value, recipesFiltered)
    isInput = true
    sortAllRecipesAfterFilter(recipesFiltered)
    changeFilterOnInput(recipesFiltered)
  }
}
///////////////////////////////////////////////////////////////////

/////// ADDEVENTLISTENER ON INPUT FILTER INGREDIENTS ////////
inputSearch.addEventListener("input", listenToMainInput)
///////////////////////////////////////////////////////////

/* UTILITY FUNCTION : TO CHECK LATER */

//////////////////////////////////////////////////////////
function getIngredients(data, value, array){
  for(let i =0; i < data.length; i++){
    if(data[i].toLowerCase().includes(value)){
        array.push(data[i]);
    }
  }
}
//////////////////////////////////////////////////////////