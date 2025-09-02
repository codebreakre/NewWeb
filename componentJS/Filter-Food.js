export class filterFood extends HTMLElement {
constructor() {
    super();
    this.attachShadow({ mode: 'open' });

}
    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <section id="sort-food">
            <h2>Filter and Sort Foods</h2>
    <label for="sort">Sort by likes:</label>
    <select id="sort">
         <option value="asc">More First</option>
         <option value="desc">Less First</option>
    </select>


    <label for="category">Category:</label>
    <select id="category">
    <option value="all">All</option>
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    </select>

    <label for="time">Time:</label>
    <select id="time">
    <option value="all">All</option>
    <option value="10-20">10-20 minut</option>
    <option value="20-40">20-40 minut</option>  
    <option value="40-60">40-60 minut</option>
    <option value="60+">60+ minut</option>
    </select>
        <button onclick="renderFilteredFoods()">Filter</button>
</section>  
<style>
    #sort-food {
        display: flex;
        flex-direction: column;
        width: 200px;
        gap: 0.5rem;
        margin-left: 50px;
                    margin-top: 50px
    }
    
</style>
       ` ;
    }
    

}
customElements.define('filter-food', filterFood);

function filterByCategory(arr) {
    const filterComponent = document.querySelector('filter-food');
    const shadow = filterComponent.shadowRoot;

    const selectedCategory = shadow.getElementById('category').value;

    if (selectedCategory === 'all') {
        return [...arr]; // эх массив бүхлээрээ
    } else {
        return arr.filter(item =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    }
}

function filterByTime(arr) {
    const filterComponent = document.querySelector('filter-food');
    const shadow = filterComponent.shadowRoot;
    const selectedTime = shadow.getElementById('time').value;

    if (selectedTime === '10-20') {
        return arr.filter(item => item.time >= 10 && item.time <= 20);
    } else if (selectedTime === '20-40') {
        return arr.filter(item => item.time > 20 && item.time <= 40);
    } else if (selectedTime === '40-60') {
        return arr.filter(item => item.time > 40 && item.time <= 60);
    } else if (selectedTime === '60+') {
        return arr.filter(item => item.time > 60);
    }
    return arr; // ямар ч сонголт байхгүй бол эх array-г буцаана
}

function sortByLikes(arr) {
    const filterComponent = document.querySelector('filter-food');
    const shadow = filterComponent.shadowRoot;
    const sortOrder = shadow.getElementById('sort').value;

    let sorted = [...arr]; // эх массивыг хуулж аваад sort хийх
    if (sortOrder === 'asc') {
        sorted.sort((a, b) => a.likeCount - b.likeCount);
    } else if (sortOrder === 'desc') {
        sorted.sort((a, b) => b.likeCount - a.likeCount);
    }
    return sorted;
}

export function filterFoods(arr) {
    let result = filterByCategory(arr);
    result = filterByTime(result);
    result = sortByLikes(result);
    return result; // шүүлт хийсэн массивыг буцаана
}



