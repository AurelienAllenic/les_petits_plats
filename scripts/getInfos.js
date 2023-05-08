"use strict"

import { recipes } from "../data/data.js";

let inputSearch = document.getElementById('input-search')
let charsIng = new Set();
let charsUstensiles = new Set();

export function loopThroughAllInfosOfRecipes4(array, data){
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

export function loopThroughAllInfosOfRecipes3(uniqueFilterLowercase, arrayFilter, recipe, data){
    let valueMain = inputSearch.value;
    if(uniqueFilterLowercase.includes(valueMain.toLowerCase())){
        arrayFilter.push(recipe)
        loopThroughAllInfosOfRecipes4(arrayFilter, data)
    }
}

export function loopThroughAllInfosOfRecipes2(recipe, arrayFilter, data){
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

export function loopThroughAllInfosOfRecipes(arrayFilter, data){
    for(let recipe of recipes){
        loopThroughAllInfosOfRecipes2(recipe, arrayFilter, data)
    }
}