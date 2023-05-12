"use strict"
// --FUNCTIONS REDIRECTING WITH CONDITIONNING-- //

import { deleteFilterIng } from "./deleteElements.js";
import { changeFilterOnInput, filterByName, filterByIngFilter } from "./loopThroughData.js";
import { recipes } from "../data/data.js";

let isOpen = false;
let isInput = false;
let inputSearch = document.getElementById('input-search');
let inputIng = document.getElementById('ingredients')
let allIngredients = new Set();
let ancientButtons = new Set();
let allButtonsIngFilter = []

export function checkIsOpen(data){
    console.log(isOpen)
    if(isOpen === false){
        adaptOnInputFilter(data)
        isOpen = true;
    }else{
        deleteFilterIng()
        isOpen = false;
    }
}

export function adaptOnInputFilter(){
    let ourSpan = document.getElementsByClassName('container_button_cross');
    let valueMain = inputSearch.value;
    let valueIng = inputIng.value;
    if(valueMain.length >= 3 && ourSpan.length === 0){
        console.log("VALUEMAIN", valueMain.length)
        let recipesFiltered = []
        filterByName(recipes, valueMain, recipesFiltered)
        changeFilterOnInput(recipesFiltered)
    }
    else if(valueIng.length >= 1 && ourSpan.length === 0){
        console.log("VALUEING", valueIng.length)
        let recipesFiltered = []
        filterByName(recipes, valueIng, recipesFiltered)
        changeFilterOnInput(recipesFiltered)
    }
    else if(ourSpan.length >= 1 && valueMain.length === 0){
        let recipesFiltered = []
        //var text = ('p').contents().last()[0].nodeValue;
        console.log(ourSpan, "ourSpan")
        for(let span of ourSpan){
            console.log(span)
            console.log(span.firstChild.textContent)
            allButtonsIngFilter.push(span.firstChild.textContent)
        }
        ancientButtons = new Set(allButtonsIngFilter)
        //filterByIngFilter(allIngredients)
        console.log(ancientButtons)
        filterByIngFilter(ancientButtons)
        changeFilterOnInput(recipesFiltered)
    }
    else{
        changeFilterOnInput(recipes)
    }
}
/*-----------------------------------------*/