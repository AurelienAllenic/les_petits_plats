"use strict"

export function checkInfos(ing, container_ingredients){
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
    
export function ReduceDescription(tab, containerDescription){
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
    
export function displayAllRecipes(elementIterable){
    let recipesSection = document.getElementById('section-recipes');
    elementIterable.forEach(recipe => {
    let container = document.createElement('article')
    container.setAttribute("class", "recipe_card")
    recipesSection.appendChild(container)
    container.innerHTML = `
        <span class="container_entire_card"><span class="container_grey_back"></span><span class="container_name_time"><p class="name">${recipe.name}</p><span class="container-time"><svg class="time_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg><p class="time">${recipe.time} min</p></span></span></span>
    `
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