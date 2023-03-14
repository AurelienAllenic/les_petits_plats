let filters = document.getElementById('section-filters')

filters.innerHTML = `
<span class="hidden_button">
<button type="button"></button>
</span>
<article class="all-filters">
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down">
        <input type="text" class="ingredients btn-filter" placeholder="Ingrédients"></input>
        
    </span>
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down">
    <input type="text" class="appareils btn-filter" placeholder="Appareils"></input>
        
        </span>
    <span class="container_button_arrow">
    <img src="./assets/logos/arrow-down.svg" alt="extend" class="arrow-down">
    <input type="text" class="ustensiles btn-filter" placeholder="Ustensiles"></input>
        
        </span>
</article>
`