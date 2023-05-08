"use strict"

export function deleteRecipes(){
    let allRecipes = document.querySelectorAll('.recipe_card');
    allRecipes.forEach(recipe => {
    recipe.remove()
    })
}

export function deleteFilterIng(){
    let ourFilter = document.querySelectorAll('.container_hidden_filter');
    ourFilter.forEach(filter => {
        filter.remove()
    })
    //isOpen = false
    }