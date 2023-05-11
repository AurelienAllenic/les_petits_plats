"use strict"

import { deleteFilterIng, deleteRecipes } from "./deleteElements.js";
import { recipes } from "../data/data.js";
import { sortAllRecipesAfterFilter } from "./handlingArrays.js";
import { displayAllRecipes } from "./displayRecipes.js";
import { changeFilterOnInput } from "./loopThroughData.js";
import { createListFilter } from "./loopThroughData.js";

let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
let sectionAppareil = document.getElementById('container_hidden_options_appareils')
let sectionUstensils = document.getElementById('container_hidden_options_ustensils')
let counterFilters = 0;
let buttonFilter = document.getElementById('section-filter-ing');
buttonFilter.style.display = "none";
let inputIng = document.getElementById('ingredients')
let inputMain = document.getElementById('input-search')
let allInfosCombined = new Set();
let ancientConditions = [];
let isValidatedAncient = false;
let isValidatedNew = false;
let isOpen = false;
let allIngredients = new Set();

// --HANDLING FILTER CHOOSED INTO FILTER INGREDIENTS LIST-- //

export function liPressed(filter){
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
            deleteRecipes()
            console.log(ourSpan, ourCross)
            displayAllRecipes(recipes)
          }
        }
        //To Modify, don't fulfill entirely it's mission
        
    }
    }
}
  
export function pushIngredientIntoAncientConditions(conditionToFilter, ourIng, recipe, data){
    if(ourIng === data){
      conditionToFilter.push(recipe)
      isValidatedNew = true;
    }else if(ourIng === ancientConditions){
      isValidatedAncient = true;
    }
}
  
export function loopThroughIngredients(ingArray, conditionToFilter, recipe, data){
    for(let ing of ingArray){
      let ourIng = ing.ingredient;
      pushIngredientIntoAncientConditions(conditionToFilter, ourIng, recipe, data)
    }
}
  
export function conditionningIngredients(conditionToFilter, data){
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
  
export function filterByButton(data){
    console.log(allInfosCombined, "ALLLLL")
    if(allInfosCombined.size === 0){
      let conditionToFilter = [];
    conditionningIngredients(conditionToFilter, data)
    ancientConditions.push(data)
    deleteRecipes()
    allIngredients = new Set(ancientConditions)
    console.log(ancientConditions)
    sortAllRecipesAfterFilter(conditionToFilter)
    deleteFilterIng()
    changeFilterOnInput(allIngredients)
    
    return ancientConditions
    }else{
      console.log("des infos à compléter")
    }
}
  
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
    let count = 0;
    for(let el of elementsLiIng){
      el.setAttribute('data-number', count)
      el.addEventListener("click", () => liPressed(el.textContent))
      count++;
    }
}