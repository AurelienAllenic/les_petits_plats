"use strict";
    let filters = document.getElementById('section-filters');
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
    export default filters