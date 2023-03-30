import { recipes } from "../data/data.js"

let filters = document.getElementById('section-filters')
let chars = new Set()
let charsAppareil = new Set()
let charsUstensil = new Set()

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
function removeOccurenciesIngredients(){
    let newArrayIng = [];
    for(let i = 0; i < recipes.length; i++){
        let recipeIngredients = recipes[i].ingredients;
        recipeIngredients.forEach(ing => {
            newArrayIng.push(ing.ingredient.toLowerCase());
        })      
    }
    chars = new Set(newArrayIng)
    return chars
}

function removeOccurenciesAppareils(){
    let newArrayAppareil = [];
    for(let i = 0; i < recipes.length; i++){
        let recipeAppareils = recipes[i].appliance;
        newArrayAppareil.push(recipeAppareils.toLowerCase())
    }
    charsAppareil = new Set(newArrayAppareil)
    return charsAppareil
}

function removeOccurenciesUstensils(){
    let newArrayUstensil = [];
    for(let i = 0; i < recipes.length; i++){
        let recipeUstensils = recipes[i].ustensils;

        recipeUstensils.forEach(ust => {
            newArrayUstensil.push(ust.toLowerCase())
        })
        charsUstensil = new Set(newArrayUstensil)   
    }
    
    return charsUstensil
}

let isOpen = false;
async function displayIngredients(){
    await removeOccurenciesIngredients(chars)
    if(isOpen === false){
    let sectionIngredients = document.getElementById('container_hidden_options_ingredients')
    sectionIngredients.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter")
    sectionIngredients.appendChild(ul)
    for(let value of chars){
        let li = document.createElement('li');
        li.innerHTML = `${value}`
        ul.appendChild(li)
        let sectionAppareil = document.getElementById('container_hidden_options_appareils')
            sectionAppareil.style.display = "none"
            let sectionUstensils = document.getElementById("container_hidden_options_ustensils")
            sectionUstensils.style.display = "none"
            isOpen = true;
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
async function displayAppareils(){
    await removeOccurenciesAppareils(charsAppareil)
    if(isOpenAppareil === false){
    let sectionAppareil = document.getElementById('container_hidden_options_appareils')
    sectionAppareil.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_appareils")
    sectionAppareil.appendChild(ul)
    for(let value of charsAppareil){
        

        let li = document.createElement('li');
        li.innerHTML = `${value}`
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
async function displayUstensils(){ 
    await removeOccurenciesUstensils(charsUstensil)
    if(isOpenUstensils === false){
    let sectionUstensils = document.getElementById('container_hidden_options_ustensils')
    sectionUstensils.style.display = "inherit"
    let ul = document.createElement('ul');
    ul.setAttribute("class", "container_hidden_filter_ustensils")
    sectionUstensils.appendChild(ul)
            for(let value of charsUstensil){
                let li = document.createElement('li');
                li.innerHTML = `${value}`
                ul.appendChild(li)
                
    
                let sectionIngredients = document.getElementById("container_hidden_options_ingredients")
                sectionIngredients.style.display = "none"
                let sectionAppareils = document.getElementById("container_hidden_options_appareils")
                sectionAppareils.style.display = "none"
                isOpenUstensils = true
        }
    
        } else {
            let sectionUstensils = document.getElementById('container_hidden_options_ustensils')
            sectionUstensils.style.display = "none"
            isOpenUstensils = false
        }
    }
    
   


let ArrowUstensils = document.getElementById("arrow_ustensils")
ArrowUstensils.addEventListener('click', displayUstensils)

    let filterIngredients = document.getElementById("ingredients")
    filterIngredients.addEventListener("click", (e) => {
        if(isOpen === false){
            displayIngredients()
        }
    })

let filterAppareils = document.getElementById("appareils")
filterAppareils.addEventListener("click", (e) => {
    if(isOpenAppareil === false){
        displayAppareils()
    }
}) 
let filterUstensiles = document.getElementById("ustensiles")
filterUstensiles.addEventListener("click", (e) => {
    if(isOpenUstensils === false){
        displayUstensils()
    }
}) 