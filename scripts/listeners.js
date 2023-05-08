"use strict";

import {recipes} from "../data/data.js"
import { listenToMainInput, listenToInputIngredients } from "./listenToInputs.js"
import { displayAllRecipes } from "./displayRecipes.js";
import { checkBeforeopenFilterIng } from "./getData.js";

let ArrowIngredients = document.getElementById("arrow_ingredients")
let inputSearch = document.getElementById('input-search')
let inputIng = document.getElementById('ingredients')

ArrowIngredients.addEventListener('click', checkBeforeopenFilterIng)
inputIng.addEventListener('click', checkBeforeopenFilterIng)
inputIng.addEventListener("input", listenToInputIngredients)

// ALL RECIPES DISPLAYED AT LOAD //
addEventListener("load", displayAllRecipes(recipes))

// HANDLING MAIN RESEARCH //

inputSearch.addEventListener("input", listenToMainInput)

/*--------------------------------------------------------------*/