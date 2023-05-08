"use strict";

import { recipes } from "../data/data.js";
import filters from "./templates.js"
import { displayAllRecipes } from "./displayRecipes.js";
import { deleteFilterIng } from "./deleteElements.js";
import { liPressed } from "./filterButton.js";

let isOpen = false;
let isOpenAppareil = false;
let isOpenUstensils = false;
let isInput = false;

let counterFilters = 0;
let ancientConditions = [];

let isValidatedAncient = false;
let isValidatedNew = false;

let recipesFiltered = [];
let allIngredientsInInput = [];
let allIngredientsAtLAst = []
let recipeCorrespondingIng = [];

let infosCombinedInIngButton = []

let numberOfIngs = 0;

let buttonFilter = document.getElementById('section-filter-ing');
buttonFilter.style.display = "none";
//let filters = document.getElementById('section-filters');
let chars = new Set();
let charsIng = new Set();
let charsUstensiles = new Set();
let charsAppareils = new Set();
let infosFilters = new Set();
let allInfosCombined = new Set();
let findFilter = new Set();
let buttonFilterIng = new Set();

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

// --FUNCTIONS CREATING NEW SET FOR SORT-- //

export function checkFilterMatchRecipes2(){
  console.log("MATCH RECIPES 2")
  console.log(allInfosCombined)
  let recipesFilteredInput = [];
  let recipesWithoutOccurenciesInput = [];
  //if(allInfosCombined.size === 0){
    for(let recipe of allInfosCombined){
        let ingredients = recipe.ingredients
        for(let ing of ingredients){
          if(ing.ingredient.toLowerCase().includes(inputIng.value)){
            recipesFilteredInput.push(ing.ingredient);
            for(let ourRecipe of recipesFilteredInput){
              recipesWithoutOccurenciesInput.push(ourRecipe.toLowerCase())
            }
          chars = new Set(recipesWithoutOccurenciesInput)
          
        }
        }
        redirectFilter(chars)
      }
    }

  export function checkFilterMatchRecipes(){
  console.log(allInfosCombined)
  let recipesFiltered = [];
  let recipesWithoutOccurencies = [];
  //if(allInfosCombined.size === 0){
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
        redirectFilter(chars)
  }
  }

/*-------------------------------------------*/

// --FUNCTIONS REDIRECTING WITH CONDITIONNING-- //

export function checkBeforeopenFilterIng(data){
  console.log(isOpen)
  if(isOpen === false){
    adaptOnInputFilter(data)
    isOpen = true;
  }else{
    deleteFilterIng()
    isOpen = false;
  }
}

export function redirectFilter(data){
  console.log(isInput)
  if(isInput === false){
    CheckIsOpenFilter(data)
  }else{
    deleteFilterIng();
    isOpen = false;
  }
}

export function adaptOnInputFilter(){
  let valueMain = inputSearch.value;
  let valueIng = inputIng.value;
  if(valueMain.length >= 3){
    console.log("VALUEMAIN", valueMain.length)
    let recipesFiltered = []
    filterByName(recipes, valueMain, recipesFiltered)
    changeFilterOnInput(recipesFiltered)
  }
else if(valueIng.length >= 1){
  console.log("VALUEING", valueIng.length)
    let recipesFiltered = []
    filterByName(recipes, valueIng, recipesFiltered)
    changeFilterOnInput(recipesFiltered)
  }
else{
    changeFilterOnInput(recipes)
  }
}

/*-----------------------------------------*/

// --UTILITARY FUNCTIONS TO LOOP THROUGH DATA-- //

export function createListFilter(data, ul){
  let count = 0;
  data.forEach(dt => {
  let li = document.createElement('li');
  li.setAttribute("id", "ing-filter"+ count)
  li.innerHTML = `${dt}`
  ul.appendChild(li)
  count++;
  })
}

export function changeFilterOnInput(data){
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
  //isInput = false
}

export function filterByName(data, value, array){
  for(let i =0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(value)){
        array.push(data[i]);
    }
  }
}

// OTHER LIST OF UTILIATRY FUNCTIONS TO TEST


export function mergeArrays(arrayUst, arrayIng, arrayApp){
  if(arrayUst.size === 0 && arrayIng.size === 0 && arrayApp.size === 0){
    console.log("PAS DE CORRESPONDANCE AVEC UN FILTRE")
  }
  else{
    console.log("rentre")
  let setUstIng = new Set([...arrayUst, ...arrayIng]);
  infosFilters = new Set([...setUstIng, ...arrayApp]);

  }
}
/*------------------------------------------*/

// --SORT FUNCTION-- //

export async function sortAllRecipesAfterFilter(tab) {
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

export function CheckIsOpenFilter(data){
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



/*-------------------------------------------*/

