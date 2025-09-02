export class TogoochCard extends HTMLElement {
    connectedCallback() {
        this.name = this.getAttribute('name') || 'Ner';
        this.description = this.getAttribute('description') || 'Lorem ipsum dolor sit amet...';
        this.likeCount = this.getAttribute('likeCount') || '0';
        this.foodCount = this.getAttribute('foodCount') || '0';
        this.render();
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
                        <p>${this.likeCount}</p>
                    </section>
                </div>
            </div>
        `;
    }
}

customElements.define('togooch-card', TogoochCard);

export function createTogoochCard(item) {
    const container = document.getElementById('Togooch-Container');
    if (!container) return;

        const card = document.createElement('togooch-card');
        card.setAttribute('name', item.name);
        card.setAttribute('description', item.description);
        card.setAttribute('likeCount', item.likeCount);
        card.setAttribute('foodCount', item.foodCount);
        container.appendChild(card);    
} 



