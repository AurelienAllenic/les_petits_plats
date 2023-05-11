"use strict";

import {recipes} from "../data/data.js"
import { listenToMainInput, listenToInputIngredients } from "./listenToInputs.js"
import { displayAllRecipes } from "./displayRecipes.js";
import { checkIsOpen } from "./redirectingFunctions.js";

// INGREDIENTS

let ArrowIngredients = document.getElementById("arrow_ingredients")

let inputIng = document.getElementById('ingredients')

ArrowIngredients.addEventListener('click', checkIsOpen)
inputIng.addEventListener('click', checkIsOpen)
inputIng.addEventListener("input", listenToInputIngredients)

// APPAREILS

let ArrowAppareils = document.getElementById("arrow_appareils")
let inputAppareil = document.getElementById('appareils')

ArrowAppareils.addEventListener('click', checkIsOpen)
inputAppareil.addEventListener('click', checkIsOpen)
inputAppareil.addEventListener("input", listenToInputIngredients)


// ALL RECIPES DISPLAYED AT LOAD //
addEventListener("load", displayAllRecipes(recipes))

// HANDLING MAIN RESEARCH //
let inputSearch = document.getElementById('input-search')
inputSearch.addEventListener("input", listenToMainInput)

/*--------------------------------------------------------------*/