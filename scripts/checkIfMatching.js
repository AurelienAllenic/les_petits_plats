// --FUNCTIONS CREATING NEW SET FOR SORT-- //

import { checkIsInput } from "./redirectingFunctions.js";
import { recipes } from "../data/data.js";

let inputIng = document.getElementById('ingredients')
let chars = new Set()
let allInfosCombined = new Set()

export function checkFilterMatchRecipes2(data){
    let recipesFilteredInput = [];
    let recipesWithoutOccurenciesInput = [];
    console.log(data)
        for(let recipe of data){
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
    checkIsInput(chars)
    }
}

export function checkFilterMatchRecipes(){
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
    checkIsInput(chars)
    }
}

/*-------------------------------------------*/