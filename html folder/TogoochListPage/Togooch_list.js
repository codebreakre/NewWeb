import { TogoochCard } from "../../componentJS/Togooch-Card.js";
import { filterChef } from "../../componentJS/Filter-Chef.js";
import { NavComponent } from "../../componentJS/Nav-component.js";
let currentIndex=0;
const itemsPerClick=5;
let Togooch=[];
let filterredTogooch=[];

function filterByLikes() {
    const filterComponent = document.querySelector('filter-chef');
    const shadow=filterComponent.shadowRoot;
    const sortOrder = shadow.getElementById('sortLikes').value;
    if(sortOrder === 'asc') {
        filterredTogooch.sort((a, b) => b.likeCount - a.likeCount);
    }else if(sortOrder === 'desc') {  
        filterredTogooch.sort((a, b) => a.likeCount - b.likeCount);
    }
}
function filterByFoodCount() {
    const filterComponent = document.querySelector('filter-chef');
    const shadow=filterComponent.shadowRoot;
    const sortOrder = shadow.getElementById('sortFoods').value;

    if(sortOrder === 'asc') {
        filterredTogooch.sort((a, b) => b.foodCount - a.foodCount);
    }else if(sortOrder === 'desc') {
        filterredTogooch.sort((a, b) => a.foodCount - b.foodCount);
    }
}
export function renderFilteredChefs() {
    filterByLikes();
    filterByFoodCount();
    del();
    createTogoochCard();
}



window.onload = async function() {
    try {
        const response = await fetch('../../json/Togooch.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        Togooch = await response.json();
        filterredTogooch = Togooch;
        createTogoochCard();    
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
window.renderFilteredChefs = renderFilteredChefs;
window.createTogoochCard = createTogoochCard;



