
// --FUNCTIONS REDIRECTING WITH CONDITIONNING-- //

import { deleteFilterIng } from "./deleteElements.js";
import { changeFilterOnInput, filterByName } from "./loopThroughData.js";
import { recipes } from "../data/data.js";
import { CheckIsOpenFilter} from "./filterButton.js"

let isOpen = false;
let isInput = false;
let inputSearch = document.getElementById('input-search');
let inputIng = document.getElementById('ingredients')

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
  
  export function checkIsInput(data){
    console.log(isInput)
    if(isInput === false){
      CheckIsOpenFilter(data)
    }else{
      deleteFilterIng();
      isOpen = false;
    }
  }
  
  export function adaptOnInputFilter(){
    let valueMain = inputSearch.value;
    let valueIng = inputIng.value;
    if(valueMain.length >= 3){
      console.log("VALUEMAIN", valueMain.length)
      let recipesFiltered = []
      filterByName(recipes, valueMain, recipesFiltered)
      changeFilterOnInput(recipesFiltered)
    }
  else if(valueIng.length >= 1){
    console.log("VALUEING", valueIng.length)
      let recipesFiltered = []
      filterByName(recipes, valueIng, recipesFiltered)
      changeFilterOnInput(recipesFiltered)
    }
  else{
      changeFilterOnInput(recipes)
    }
  }
  
  /*-----------------------------------------*/