"use strict"

import { mergeArrays, filterByName, sortAllRecipesAfterFilter, checkFilterMatchRecipes, checkFilterMatchRecipes2} from "./getData.js"
import { recipes } from "../data/data.js";
import { displayAllRecipes } from "./displayRecipes.js";
import { deleteFilterIng, deleteRecipes } from "./deleteElements.js";
import { loopThroughAllInfosOfRecipes } from "./getInfos.js";

let chars = new Set();
let charsIng = new Set();
let charsUstensiles = new Set();
let charsAppareils = new Set();
let infosFilters = new Set();
let allInfosCombined = new Set();
let findFilter = new Set();
let inputSearch = document.getElementById('input-search')

export function listenToMainInput(e){
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
        mergeArrays(charsUstensiles, charsIng, charsAppareils)
        
        filterByName(recipes, value, recipesFiltered)
        allInfosCombined = new Set([...recipesFiltered, ...infosFilters])
        //New Set infosFilter concat recipesFiltered
        //isInput = true
        sortAllRecipesAfterFilter(allInfosCombined)
        //changeFilterOnInput(charsIng)
        return allInfosCombined
    }
}

export function listenToInputIngredients(e){
    let mainValue = inputSearch.value;
    console.log(mainValue, "MainValue")
    let value = e.target.value;
    if(value.length > 0 && mainValue.length === 0){
        console.log("value !!== 0")
        checkFilterMatchRecipes()
    }else{
        console.log("value === 0")
        findFilter.clear()
        checkFilterMatchRecipes2()
    }
}