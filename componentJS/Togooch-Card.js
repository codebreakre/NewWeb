import { navigateTo } from "../htmlFolder/StartPage/MainJS.js"; 

export class TogoochCard extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute('chefId');
        this.name = this.getAttribute('name') || 'Ner';
        this.description = this.getAttribute('description') || 'Lorem ipsum dolor sit amet...';
        this.likeCount = this.getAttribute('likeCount') || '0';
        this.foodCount = this.getAttribute('foodCount') || '0';
        this.render();
        this.addEvents();
    }

    render() {
        this.innerHTML = `
            <div id="Togooch-Card">
                <img src="../../zuragnuud/Togooch-zurag.jpg" alt="">
                <div id="Togooch-Info">
                    <section id="Togooch-Tuhai">
                        <p id="Togooch-Card-Name">${this.name}</p>
                        <p id="Togooch-Article">${this.description}</p>
                    </section>
                    <section id="Like-Count">
                        <button id="like-btn">❤️</button>
                        <p id="count">${this.likeCount}</p>
            </section>
                </div>
            </div>
        `;
    }
    addEvents() {
    const likeBtn = this.querySelector('#like-btn');
    const chefId = parseInt(this.id); // 👈 id-г нэг мөр тоо болгож авна

    // Хэрэглэгчийн өмнөх like-ийг шалгаад өнгө өөрчилнө
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.liked_chefs.includes(chefId)) {
        likeBtn.style.backgroundColor = "red";
    } else {
        likeBtn.style.backgroundColor = "white";
    }

    likeBtn.addEventListener('click', () => {
        loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Эхлээд нэвтэрнэ үү!");
            return;
        }

        if (!Array.isArray(loggedInUser.liked_chefs)) {
            loggedInUser.liked_chefs = [];
        }

        // Like → Unlike
        if (loggedInUser.liked_chefs.includes(chefId)) {
            loggedInUser.liked_chefs = loggedInUser.liked_chefs.filter(fid => fid !== chefId);
            this.likeCount--;
            likeBtn.style.backgroundColor = "white";
        } else {
            // Unlike → Like
            loggedInUser.liked_chefs.push(chefId); // 👈 заавал number push хийж байна
            this.likeCount++;
            likeBtn.style.backgroundColor = "red";
        }

        this.querySelector('#count').textContent = this.likeCount;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    });
}
};

customElements.define('togooch-card', TogoochCard);

export function createTogoochCard(item) {
    const container = document.getElementById('Togooch-Container');
    if (!container) return;

        const card = document.createElement('togooch-card');
        card.setAttribute('chefId', item.chefId);
        card.setAttribute('name', item.name);
        card.setAttribute('description', item.description);
        card.setAttribute('likeCount', item.likeCount);
        card.setAttribute('foodCount', item.foodCount);
        container.appendChild(card);    
} 



