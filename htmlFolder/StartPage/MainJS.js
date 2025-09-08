import { TogoochCard, createTogoochCard } from "../../componentJS/Togooch-Card.js"; 
import { HoolCard , createHoolCard} from "../../componentJS/Hool-Card.js";
import { filterFood, filterFoods } from "../../componentJS/Filter-Food.js";
import { filterChef, filterchefs } from "../../componentJS/Filter-Chef.js";
import { NavComponent } from "../../componentJS/Nav-component.js";
import { logIn, signUp, logOut, updateLoginState } from "../../functnionsJS/signUp.js";
import {routes} from "../../routes/routes.js";


// --- Navigation functions ---
export function navigateTo(path) {
    history.pushState(null, null, path);
    render();
}

function check() {
    console.log("clicked");
}


function render() {
    const path = window.location.pathname;
    document.getElementById('main-page').innerHTML = routes[path] || aboutPage;
    currentIndexFood = 0;
    currentIndexChef = 0;
    // Only render chefs if we are on the Togooch page
    if (path === '/togooch') {
        renderTogoochCards(filteredTogooch);
    }
    if (path === '/hool') {
        console.log('Rendering foods...');
        renderHoolCards(filteredHool);
    }
    if (path === '/log-in') {
        document.getElementById("Burtgeh-huudas").onclick = () => {
            navigateTo('/log-in/sign-up');
            };   
    
        document.getElementById("Nevtreh").onclick = () => {
            logIn(Hereglegch);
        };
    }
    if (path === '/log-in/sign-up') {
        document.getElementById("Burtguuleh").onclick = () => {
    signUp(Hereglegch);
    };
}
}
   

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.getAttribute("href"));
    }
});

window.addEventListener("popstate", render);

// --- Data and pagination ---
let currentIndexFood = 0;
let currentIndexChef = 0;
const itemsPerClick = 8;
let Togooch = [];
let filteredTogooch = [];
let Hool = [];
let Hereglegch = [];
let filteredHool = [];




// --- Load JSON data ---
window.onload = async function() {
    try {
        // Load Togooch
        const resTogooch = await fetch('http://localhost:3000/chefs');
        if (!resTogooch.ok) throw new Error('Network response was not ok (Togooch)');
        Togooch = await resTogooch.json();
        filteredTogooch = [...Togooch];
        console.log(Togooch.length);

        //Load users
        const resUsers = await fetch('http://localhost:3000/users');
        if (!resUsers.ok) throw new Error('Network response was not ok (Hereglegch)');
        Hereglegch = await resUsers.json();
        console.log(Hereglegch);


        // Load Hool
        const resHool = await fetch('http://localhost:3000/foods');
        if (!resHool.ok) throw new Error('Network response was not ok (Hool)');
        Hool = await resHool.json();
        filteredHool = [...Hool];
        console.log(Hool);
         console.log(Hool[0].foodname);
        
        navigateTo(`/home`);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};




function del() {
    const TogoochContainer = document.getElementById('Togooch-Container');
    if (TogoochContainer) TogoochContainer.innerHTML = '';
    const HoolContainer = document.getElementById('Hool-Container');
    if (HoolContainer) HoolContainer.innerHTML = '';
    currentIndexChef = 0;
    currentIndexFood = 0;
}


// --- Filtering ---
function renderFilteredChefs() {
    filteredTogooch = filterchefs([...Togooch]); // always filter from full array
    del();
    renderTogoochCards(filteredTogooch);
}
function renderFilteredFoods() {
    filteredHool = filterFoods([...Hool]); // always filter from full array
    
    del();
    renderHoolCards(filteredHool);
}



window.renderFilteredFoods = renderFilteredFoods;
window.renderFilteredChefs = renderFilteredChefs;
window.check = check;

function renderHoolCards(arr) {
    const container = document.getElementById('Hool-Container');
    if (!container) return;

    const end = currentIndexFood + itemsPerClick;
    const slicedData = arr.slice(currentIndexFood, end);
    slicedData.forEach(item => {
        createHoolCard(item); // single-item create
    });
    currentIndexFood += itemsPerClick;

    const seeMoreBtn = document.getElementById('see-more-food');
    if (seeMoreBtn) {
        seeMoreBtn.style.display = currentIndexFood >= arr.length ? 'none' : 'block';
    }
}

function renderTogoochCards(arr) {
    const container = document.getElementById('Togooch-Container');
    if (!container) return;

    const end = currentIndexChef + itemsPerClick;
    const slicedData = arr.slice(currentIndexChef, end);

    slicedData.forEach(item => {
        createTogoochCard(item); // single-item create
    });

    currentIndexChef += itemsPerClick;

    const seeMoreBtn = document.getElementById('see-more');
    if (seeMoreBtn) {
        seeMoreBtn.style.display = currentIndexChef >= arr.length ? 'none' : 'block';
    }
}

export function renderHoolDetail(foodId) {
    const food = Hool.find(f => f.food_id === foodId);
    const chef = Togooch.find(c => c.chefId === food.chef_id);
    if (!chef) {
    console.error("Chef not found for food:", food);
    return;
}
    
    const mainPage = document.getElementById('main-page');
    mainPage.innerHTML = `
        <div id="container">
       
        <div id="Togooch-Container"></div>
         </div>
        <h1>${food.name}</h1>
        <p>${food.description}</p>
        `;
        createTogoochCard(chef);
}




    



