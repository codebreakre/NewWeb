import { navigateTo, renderHoolDetail } from "../htmlFolder/StartPage/MainJS.js";    
export class HoolCard extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute('id'); 
        console.log(this.id);
        this.name = this.getAttribute('name') || 'Хоолны нэр';
        this.count = parseInt(this.getAttribute('count')) || 0;
        this.render();
        this.addEvents();
    }
      
    
    render() {
         this.innerHTML = `
 <div id="Hool-Card">
        <div id="Hool-zurag">
            <img src="../../zuragnuud/Food-zurag.jpg" alt="">
        </div>
        <section id="Hool-Info">
            <p id="Hool-ner">${this.name}</p>
            <section id="Like-Count">
                <button id="like-btn">❤️</button>
                <p id="count">${this.count}</p>
            </section>
        </section>
    </div>
    <style>
        #count {
            background-color: orchid;
            color: aliceblue;
            padding: 2px 15px 2px 15px;
            border-radius: 10px;
            font-size: 15px;
           
        }
            #Hool-Card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    height: auto;
    background-color: lightgrey;
    align-items: center;
    border-radius: 20px;
}
#Hool-zurag {
    width: 100%;
    height: 80%;
}
#Hool-zurag img {
    width: 100%;
    height: 90%;
    border-radius: 20px 20px 0 0;
}
#Hool-Info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
}
#gadaa{
    width: 15%;
}
#Hool-Container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10%;
    gap: 20px;
    
}
#container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2rem;
}
h1 {
    text-align: center;
    font-size: 30px;
    margin-top: 1rem;
}
    #like-btn {
        background-color: white;
        border: none;
    }
    </style>
    `;
    }
addEvents() {
    const likeBtn = this.querySelector('#like-btn');
    const foodId = parseInt(this.id); 

    // Like-ийн өнгө эхний төлөв
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.liked_foods.includes(foodId)) {
        likeBtn.style.backgroundColor = "red";
    } else {
        likeBtn.style.backgroundColor = "white";
    }

    // === Like товч ===
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 👈 card click рүү дамжуулахгүй
        loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Эхлээд нэвтэрнэ үү!");
            return;
        }

        if (!Array.isArray(loggedInUser.liked_foods)) {
            loggedInUser.liked_foods = [];
        }

        if (loggedInUser.liked_foods.includes(foodId)) {
            loggedInUser.liked_foods = loggedInUser.liked_foods.filter(fid => fid !== foodId);
            this.count--;
            likeBtn.style.backgroundColor = "white";
        } else {
            loggedInUser.liked_foods.push(foodId);
            this.count++;
            likeBtn.style.backgroundColor = "red";
        }

        this.querySelector('#count').textContent = this.count;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    });
    this.addEventListener('click', () => {
        // navigateTo ашиглаж болно
        navigateTo(`/hool/${foodId}`);
        // Энд detail renderer-ээ дуудна
        renderHoolDetail(foodId);
    });
}
};
   
        removeEventListener
customElements.define('hool-card' , HoolCard);

export function createHoolCard(item) {
    const container = document.getElementById('Hool-Container');
    if (!container) return;
        const card = document.createElement('hool-card');
        card.setAttribute('id', item.food_id); 
        card.setAttribute('name', item.name);
        card.setAttribute('count', item.likeCount);
        container.appendChild(card);    
}
