import { checkIsInput } from "./redirectingFunctions.js";

let chars = new Set();

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
    let CorrespondingIngredients = []
    for(let i = 0; i < data.length; i++){
      let getIngredients = data[i].ingredients;
      getIngredients.forEach(ing => {
        CorrespondingIngredients.push(ing.ingredient)
        chars = new Set(CorrespondingIngredients)
        checkIsInput(chars)
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