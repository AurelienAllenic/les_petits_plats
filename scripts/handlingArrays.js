
import { displayAllRecipes } from "./displayRecipes.js";

let arrayUst = new Set()
let arrayIng = new Set()
let arrayApp = new Set()
let setUstIng = new Set()
let infosFilters = new Set()

export function mergeArrays(arrayUst, arrayIng, arrayApp){
    if(arrayUst.size === 0 && arrayIng.size === 0 && arrayApp.size === 0){
      console.log("PAS DE CORRESPONDANCE AVEC UN FILTRE")
    }
    else{
      console.log("rentre")
    let setUstIng = new Set([...arrayUst, ...arrayIng]);
    infosFilters = new Set([...setUstIng, ...arrayApp]);
  
    }
  }
  /*------------------------------------------*/
  
  // --SORT FUNCTION-- //
  
  export async function sortAllRecipesAfterFilter(tab) {
    var changed;
    do{
      changed = false;
      for(var i=0; i < tab.length-1; i++) {
        if(tab[i] > tab[i+1]) {
          var current = tab[i];
          tab[i] = tab[i+1];
          tab[i+1] = current;
          changed = true;
        }
      }
    } while(changed);
    displayAllRecipes(tab)
  }