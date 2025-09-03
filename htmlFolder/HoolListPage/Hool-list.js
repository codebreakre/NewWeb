import { HoolCard } from "../../componentJS/Hool-Card.js";  
import { filterFood } from "../../componentJS/Filter-Food.js";
import { NavComponent } from "../../componentJS/Nav-component.js";
let currentPage = 0;
const  itemsPerClick = 20;
let Hool= [];
let filterredHool = [];

function filterByCategory() {
    const filterComponent = document.querySelector('filter-food');
    const shadow=filterComponent.shadowRoot;

    const selectedCategory = shadow.getElementById('category').value;
    if(selectedCategory === 'all') {
        currentPage = 0;
        filterredHool = Hool;
    }else{
        filterredHool=Hool.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
        currentPage = 0;
    }
}

function filterByTime() {
    const filterComponent = document.querySelector('filter-food');
    const shadow=filterComponent.shadowRoot;
    const selectedTime = shadow.getElementById('time').value;

    if(selectedTime ==='10-20') {
        filterredHool = filterredHool.filter(item => item.time >=10 && item.time <=20);
    }else if(selectedTime ==='20-40') {
        filterredHool = filterredHool.filter(item => item.time >20 && item.time <=40);
    }else if(selectedTime ==='40-60') {
        filterredHool = filterredHool.filter(item => item.time >40 && item.time <=60);
    }else if(selectedTime ==='60+') {       
        filterredHool = filterredHool.filter(item => item.time >60);
    }
}
function sortByLikes() {
    const filterComponent = document.querySelector('filter-food');
    const shadow=filterComponent.shadowRoot;
    const sortOrder = shadow.getElementById('sort').value;

    if(sortOrder === 'asc') {
        filterredHool.sort((a, b) => b.likeCount - a.likeCount);
    }else if(sortOrder === 'desc') {
        filterredHool.sort((a, b) => a.likeCount - b.likeCount);
    }
}
export function renderFilterredFoods() {
    filterByCategory();
    filterByTime();
    sortByLikes();
    del();
    createHoolCard();
}
function del() {
    document.getElementById('Hool-Container').innerHTML = '';
    currentPage = 0;
}

function createHoolCard() {
    const container = document.getElementById('Hool-Container');
    const end = currentPage + itemsPerClick;
    const slicedData = filterredHool.slice(currentPage, end);

    slicedData.forEach(item => {
        const card = document.createElement('hool-card');
        card.setAttribute('name', item.name);
        card.setAttribute('count', item.likeCount);
        container.appendChild(card);
    });

    currentPage += itemsPerClick;
    if (currentPage >= filterredHool.length) {
        document.getElementById('see-more').style.display = 'none';
    }
}

window.onload = async function() {
    try {
        const response = await fetch('../../json/Hool.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        Hool = await response.json();
        filterredHool = Hool;
        createHoolCard();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
window.renderFilterredFoods = renderFilterredFoods;
window.createHoolCard = createHoolCard;
window.del = del;
