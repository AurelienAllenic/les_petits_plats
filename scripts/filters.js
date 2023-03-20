import { recipes } from "../data/data.js"

let filters = document.getElementById('section-filters')

filters.innerHTML = `
<span class="hidden_button">
<button type="button"></button>
</span>
<article class="all-filters">
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down" id="arrow_ingredients">
        <input type="text" class="ingredients btn-filter" placeholder="Ingrédients"></input>
        <span id="container_hidden_options_ingredients">

        </span>
    </span>
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down" id="arrow_appareils">
    <input type="text" class="appareils btn-filter" placeholder="Appareils"></input>
        <span id="container_hidden_options_appareils">

        </span>
    </span>
    <span class="container_button_arrow">

    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down"id="arrow_ustensils">
    <input type="text" class="ustensiles btn-filter" placeholder="Ustensiles"></input>
    <span id="container_hidden_options_ustensils">

    </span>
        </span>
</article>
`
let isOpen = false;
function displayIngredients(){
    if(isOpen === false){
    let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
    sectionIngredients.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter")
    sectionIngredients.appendChild(ul)
    for(let i = 0; i < recipes.length; i++){
        let recipeIngredients = recipes[i].ingredients;
        recipeIngredients.forEach(ing => {
            let li = document.createElement('li');
            li.innerHTML = `${ing.ingredient}`
            ul.appendChild(li)
            isOpen = true

            let sectionAppareil = document.getElementById('container_hidden_options_appareils')
            sectionAppareil.style.display = "none"
            let sectionUstensils = document.getElementById("container_hidden_options_ustensils")
            sectionUstensils.style.display = "none"
        });
    }
    }else {
        let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
        sectionIngredients.style.display = "none"
        isOpen = false
    }
}

let ArrowIngredients = document.getElementById("arrow_ingredients")
ArrowIngredients.addEventListener('click', displayIngredients)

let isOpenAppareil = false;
function displayAppareils(){
    if(isOpenAppareil === false){
    let sectionAppareil = document.getElementById('container_hidden_options_appareils')
    sectionAppareil.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_appareils")
    sectionAppareil.appendChild(ul)
    for(let i = 0; i < recipes.length; i++){
        let recipeAppareils = recipes[i].appliance;
        console.log(recipeAppareils)
        let li = document.createElement('li');
        li.innerHTML = `${recipeAppareils}`
        ul.appendChild(li)
        isOpenAppareil = true

        let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
        sectionIngredients.style.display = "none"
        let sectionUstensils = document.getElementById("container_hidden_options_ustensils")
        sectionUstensils.style.display = "none"
    }
    }else {
        let sectionAppareils = document.getElementById('container_hidden_options_appareils')
        sectionAppareils.style.display = "none"
        isOpenAppareil = false
    }
}
let ArrowAppareils = document.getElementById("arrow_appareils")
ArrowAppareils.addEventListener('click', displayAppareils)

let isOpenUstensils = false;
function displayUstensils(){
    if(isOpenUstensils === false){
    let sectionUstensils = document.getElementById('container_hidden_options_ustensils')
    sectionUstensils.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_ustensils")
    sectionUstensils.appendChild(ul)
    for(let i = 0; i < recipes.length; i++){
        let recipeIngredients = recipes[i].ustensils;
        recipeIngredients.forEach(ust => {
            let li = document.createElement('li');
            li.innerHTML = `${ust}`
            ul.appendChild(li)
            

            let sectionIngredients = document.getElementById("container_hidden_options_ingredients")
            sectionIngredients.style.display = "none"
            let sectionAppareils = document.getElementById("container_hidden_options_appareils")
            sectionAppareils.style.display = "none"
            isOpenUstensils = true
        });
    }
    }else {
        let sectionUstensils = document.getElementById('container_hidden_options_ustensils')
        sectionUstensils.style.display = "none"
        isOpenUstensils = false
    }
}

let ArrowUstensils = document.getElementById("arrow_ustensils")
ArrowUstensils.addEventListener('click', displayUstensils)
