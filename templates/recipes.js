

function getRecipes(){
    let sectionRecipes = document.getElementById('section-recipes');
    
    sectionRecipes.innerHTML = `
<article>
    <span class="grey-back"></span>
    <span class="infos_recipe">
        <span class="name_time">
            <p class="name"><p>
            <p class="time"></p>
        </span>
        <span>
            <ul class="details">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <p class="description_recipe"></p>
        </span>
    </span>
</article>`
}
