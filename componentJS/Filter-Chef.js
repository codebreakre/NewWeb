export class filterChef extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.getElementById("applyFilter").addEventListener("click", () => {
            
         window.renderFilteredChefs();
           
        });
      
    }

    render() {
        this.shadowRoot.innerHTML = `
             <section id="sort-chef">
                <h2>Filter and Sort Chefs</h2>

                <!-- Sort by likes -->
                <label for="sortLikes">Sort by likes:</label>
                <select id="sortLikes">
                    <option value="none">None</option>
                    <option value="asc">More Likes First</option>
                    <option value="desc">Less Likes First</option>
                </select>

                <!-- Sort by food count -->
                <label for="sortFoods">Sort by food count:</label>
                <select id="sortFoods">
                    <option value="none">None</option>
                    <option value="asc">More Foods First</option>
                    <option value="desc">Less Foods First</option>
                </select>

                <button id="applyFilter">Apply</button>
            </section>  

            <style>
                #sort-chef {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background: #fafafa;
                    width: 200px;    
                    height: 100%;
                    margin-left: 50px;
                    margin-top: 50px
                }
            </style>
        `;
    }

}

customElements.define('filter-chef', filterChef);

function filterByLikes(arr) {
    const filterComponent = document.querySelector('filter-chef');
    if (!filterComponent) return arr;
    const sortOrder = filterComponent.shadowRoot.getElementById('sortLikes').value;

    if (sortOrder === 'asc') return arr.slice().sort((a, b) => b.likeCount - a.likeCount);
    if (sortOrder === 'desc') return arr.slice().sort((a, b) => a.likeCount - b.likeCount);
    return arr;
}

function filterByFoodCount(arr) {
    const filterComponent = document.querySelector('filter-chef');
    if (!filterComponent) return arr;
    const sortOrder = filterComponent.shadowRoot.getElementById('sortFoods').value;

    if (sortOrder === 'asc') return arr.slice().sort((a, b) => b.foodCount - a.foodCount);
    if (sortOrder === 'desc') return arr.slice().sort((a, b) => a.foodCount - b.foodCount);
    return arr;
}

export function filterchefs(arr) {
    let filtered = filterByLikes(arr);
    filtered = filterByFoodCount(filtered);
    return filtered;
}
