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

addEventListener("load", displayAllRecipes(recipes))

function filterByButton(data){
  let conditionToFilter = [];
  if(ancientConditions !== []){
    for(let recipe of recipes){
      let ingArray = recipe.ingredients;
      for(let ing of ingArray){
        let ourIng = ing.ingredient;
        if(ourIng === data){
          conditionToFilter.push(recipe)
          isValidatedNew = true;
        }else if(ourIng === ancientConditions){
          isValidatedAncient = true;
        }
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
  displayAllRecipesAfterFilter(conditionToFilter)
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

function checkInputIng(value){
  console.log(value)
  checkFilterMatchRecipes()
}

inputIng.addEventListener("input", e => {
  let value = e.target.value;
  if(value.length > 0){
    console.log(value, "en input ing")
    checkInputIng(value)
  }else{
    console.log("pas de caractères en input ing")
  }
})
//////////////////////////////////////////////////////

function deleteFilterIng(){
  let ourFilter = document.querySelectorAll('.container_hidden_filter');
  ourFilter.forEach(filter => {
    filter.remove()
  })
  isOpen = false
}

function openFilterIng(data){
  console.log(isOpen)
  if(isOpen === false){
    checkInput(data)
  }else{
    deleteFilterIng()
  }
}

function redirectFilter(data){
  if(isInput === false){
    CheckIsOpenFilter(data)
  }else{
    CheckIsOpenFilterWhenInput(data)
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

function CheckIsOpenFilterWhenInput(){
  deleteFilterIng();
  isOpen = false
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

// HANDLING ARROWS FILTERS //

ArrowIngredients.addEventListener('click', ()=>{openFilterIng()})
inputIng.addEventListener('click', ()=>{openFilterIng()})

//ArrowAppareils.addEventListener('click', ()=>{redirectData('appareils', isInput)})

//ArrowUstensils.addEventListener('click', ()=>{redirectData('ustensiles', isInput)})

//////////////////////////////////////////////////////////////////////////////////////////////////

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

async function displayAllRecipesAfterFilter(tab) {
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

function deleteRecipes(){
  let allRecipes = document.querySelectorAll('.recipe_card');
  allRecipes.forEach(recipe => {
  recipe.remove()
  })
}

function checkInput(){
  console.log(inputSearch.value, "INPUTSEARCH")
  if(inputSearch.value.length >= 3){
    let recipesFiltered = []
    for(let i =0; i < recipes.length; i++){
      if(recipes[i].name.toLowerCase().includes(inputSearch.value)){
          recipesFiltered.push(recipes[i]);
      }
    }
    isOpen = false

  changeFilterOnInput(recipesFiltered)
  }else{
    let recipesFiltered = []
    for(let i =0; i < recipes.length; i++){
          recipesFiltered.push(recipes[i]);
    }
    //isOpen = true

  changeFilterOnInput(recipesFiltered)
  }
  
}

///////////////////////////////////////

  inputSearch.addEventListener("input", e => {
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
    for(let i =0; i < recipes.length; i++){
      if(recipes[i].name.toLowerCase().includes(value)){
          recipesFiltered.push(recipes[i]);
      }
    }
    isInput = true
  displayAllRecipesAfterFilter(recipesFiltered)
  changeFilterOnInput(recipesFiltered)
  }
})

//////////////////////////////////////////////////////////


/*function getTabData(ul){
  console.log(chars)
  for(let value of chars){
    let li = document.createElement('li');
    li.innerHTML = `${value}`
    ul.appendChild(li)
  }  
}*/

// Display all infos in our selected filter

/*function displayFilterTypeIng(){
  if(isOpen === false){ 
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter")
    sectionIngredients.appendChild(ul)
    getTabData(ul)
    sectionAppareil.style.display = "none"
    sectionUstensils.style.display = "none"
    isOpen = true;
  }
  else
  {
    sectionIngredients.style.display = "none"
  }
}*/

// Handling the three filters

// Handling Ingredients filter when something is typed into search bar
/*function CheckIsOpenFilterInput(data){
  if(isOpen === false){
    deleteFilterIng();
  let ul = document.createElement('ul');
  ul.setAttribute("class", "container_hidden_filter")
  sectionIngredients.appendChild(ul)
    sectionIngredients.style.display = "inherit"
    data.forEach(dt => {
    let li = document.createElement('li');
    li.innerHTML = `${dt}`
    ul.appendChild(li)
    sectionAppareil.style.display = "none"
    sectionUstensils.style.display = "none"
    
    })
    isOpen = true;
    return isOpen
  }else{
    isOpen = false;
    return isOpen
  }
  
}*/


// Remove occurencies from arrays of the three filters
/*
function removeOccurencies(array){
  chars = new Set(array)
  return chars
}
*/
///////////////////////////////////////////////////////

//Get data of the filters in global

/*async function displayFilter(data, setFilter){
  let newArrayData = [];
  
  for(let i = 0; i < recipes.length; i++){
    if(data === "ingredients"){
      let recipeData = recipes[i].ingredients;
      recipeData.forEach(item => {
        newArrayData.push(item.ingredient.toLowerCase());        
      })
      removeOccurencies(newArrayData)
    } else if(data === "appareils"){
      let recipeData = recipes[i].appliance;
      newArrayData.push(recipeData.toLowerCase());
      removeOccurencies(newArrayData)
    } else {
      let recipeData = recipes[i].ustensils;
      recipeData.forEach(item => { newArrayData.push(item.toLowerCase());        
    }) 
      removeOccurencies(newArrayData)
    } 
  }
  CheckIsOpen(data)
  }
  */

//////////////////////////////////////////////////////////////////////

///////////////////////////////////////

/*
function testInputSearch(){
  inputSearch.addEventListener("input", e => {
  let value = e.target.value;
  if(value.length < 3 && value.length !== 0){
    deleteRecipes();
    displayAllRecipes(recipes);
    let messageError = document.getElementById("messageError")
    messageError.style.display = "block"
  }
  else{
    messageError.style.display = "none"
    deleteRecipes();
    let recipesFiltered = []
    for(let i =0; i < recipes.length; i++){
      if(recipes[i].name.toLowerCase().includes(value)){
          recipesFiltered.push(recipes[i]);
      }
    }
    isInput = true
  displayAllRecipesAfterFilter(recipesFiltered)
  changeFilterOnInput(recipesFiltered)
  }
})
}



let filterIngredients = document.getElementById("ingredients")
filterIngredients.addEventListener("click", (e) => {
    if(isOpen === false){
      displayFilter('ingredients')
    }
})

let filterAppareils = document.getElementById("appareils")
filterAppareils.addEventListener("click", (e) => {
    if(isOpenAppareil === false){
      displayFilter('appareils')
    }
}) 
let filterUstensiles = document.getElementById("ustensiles")
filterUstensiles.addEventListener("click", (e) => {
    if(isOpenUstensils === false){
        displayFilter('ustensiles')
    }
}) 
*/

/*function displayFilterTypeApp(){
  if(isOpenAppareil === false){
    sectionAppareil.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_appareils")
    sectionAppareil.appendChild(ul)
    getTabData(ul)
    isOpenAppareil = true;
    sectionIngredients.style.display = "none" 
    sectionUstensils.style.display = "none"
    }
    else
    {
      sectionAppareil.style.display = "none"
    }
}
function displayFilterTypeUst(){
  if(isOpenUstensils === false){
    sectionUstensils.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_ustensils")
    sectionUstensils.appendChild(ul)
    getTabData(ul)
    sectionIngredients.style.display = "none"
    sectionAppareil.style.display = "none"
    isOpenUstensils = true
    }
    else
    {
      sectionUstensils.style.display = "none"
    }
}

function CheckIsOpen(data){
  if(data === "ingredients"){
    displayFilterTypeIng()
  }
  else if(data ==="appareils"){
    displayFilterTypeApp()
  }
  else if(data=== "ustensiles"){
    displayFilterTypeUst()
  }
}*/

////////////////////////////////////////////////