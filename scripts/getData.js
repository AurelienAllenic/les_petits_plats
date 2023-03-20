import { recipes } from "../data/data.js";

function getData(){
    recipes.forEach(recipe => {
       console.log(recipe.name) 
    });
    
}
//getData()

function getIngredients(){
    let recipesSection = document.getElementById('section-recipes');
    recipes.forEach(recipe => {
        let container = document.createElement('article')
        container.setAttribute("class", "recipe_card")
        recipesSection.appendChild(container)
        container.innerHTML = `<span class="container_entire_card">
        <span class="container_grey_back"></span>
            <span class="container_name_time">
            <p class="name">${recipe.name}</p>
            <span class="container-time">
            <svg class="time_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
            <p class="time">${recipe.time} min</p>
            </span>
        </span>
        </span>`
        
        let containerDescIng = document.createElement('span')
        containerDescIng.setAttribute("class", "container_desc_ing")
        let container_ingredients = document.createElement('ul')
        container_ingredients.setAttribute("class", "container_ingredients")
        container.appendChild(containerDescIng)
        containerDescIng.appendChild(container_ingredients)
        let containerDescription = document.createElement('p')
        containerDescription.setAttribute('class', 'description_card')
        containerDescription.innerHTML = `${recipe.description}`
        containerDescIng.appendChild(containerDescription)
        let recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach(ing => {
        let count = recipeIngredients.length;
        let sectionRecipes = document.getElementById('section-recipes');
            

        //Si tout OK
        if(ing.quantity !== undefined && ing.ingredient !== undefined && ing.unit !== undefined){
            let li = document.createElement('li');        
            li.innerHTML = `
                <span class="important">${ing.ingredient}</span>: ${ing.quantity}${ing.unit}`
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
            <span class="important">
                ${ing.ingredient}</span>: ${ing.quantity}`
                container_ingredients.appendChild(li)
        }
        else{
            console.log(`${ing.ingredient}: ${ing.quantity}, ${ing.unit}`)
        }   
    
    })
    });
}
getIngredients();
