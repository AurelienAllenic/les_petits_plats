import { CheckIsOpenFilter} from "./filterButton.js"
import { recipes } from "../data/data.js";

let chars = new Set();
let allInfosCombined = new Set();

export function createListFilter(data, ul){
    let count = 0;
    data.forEach(dt => {
    let li = document.createElement('li');
    li.setAttribute("id", "ing-filter"+ count)
    li.innerHTML = `${dt}`
    ul.appendChild(li)
    count++;
    })
  }
  
  export function changeFilterOnInput(data){
    console.log(data, "DATA")
    let CorrespondingIngredients = []
    for(let i = 0; i < data.length; i++){
      let getIngredients = data[i].ingredients;
      getIngredients.forEach(ing => {
        CorrespondingIngredients.push(ing.ingredient)
        chars = new Set(CorrespondingIngredients)
        CheckIsOpenFilter(chars)
        return chars
      })
    }
    //isInput = false
  }
  
  export function filterByName(data, value, array){
    for(let i =0; i < data.length; i++){
      if(data[i].name.toLowerCase().includes(value)){
          array.push(data[i]);
      }
    }
  }


  export function filterByIngFilter(data){
    let recipesFiltered = [];
    console.log(data)
    for(let dat of data){
      console.log(dat)
      for(let recipe of recipes){    
        for(let ingredients of recipe.ingredients){
            if(ingredients.ingredient.includes(dat)){
              recipesFiltered.push(recipe)
              console.log(recipesFiltered)
            }
          }
      }
    }
    chars = new Set(recipesFiltered)
    filterByIngFilter2(chars)
  }

  export function filterByIngFilter2(data){
    console.log(data)
    let CorrespondingIngredients = []
    for(let dat of data){
      for(let ingredients of dat.ingredients){
        CorrespondingIngredients.push(ingredients.ingredient)
      }
    }
    console.log(CorrespondingIngredients)
    chars = new Set(CorrespondingIngredients)
    CheckIsOpenFilter(chars)
  }