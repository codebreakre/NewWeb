export class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
         this.shadowRoot.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                history.pushState(null, null, e.target.getAttribute("href"));
                window.dispatchEvent(new Event("popstate")); // SPA rerender
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
           <h1 id="Ehleliin-bar">Хоолны жорын сайт</h1>
    <div id="Logo-Navigation">
        <p id="Logo">QWERTYU</p>
        <nav><li>
            <a href="/home" data-link >Нүүр</a>
            <a href="/hool" data-link >Хоолнууд</a>
            <a href="/togooch" data-link >Тогооч</a>
            <a href="/durtai" id="durtai" data-link >Миний дуртай</a>
            <a href="/log-in" id="log-in" data-link >Нэвтрэх</a>
            <div id="profile-section" style="display: none;">
                <span id="username-display"></span>
                <button id="logout-button">Гарах</button>
            </div>
            
        </li></nav>
    </div>
   <style>
   #durtai {
    display: none;
}
   #Ehleliin-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightcoral;
    padding-top: 2px;
    margin: 0;
    font-size: 100%;
}
#Logo-Navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    padding: 10px;
    width : 100%;
     margin: 0 auto;
}
#Logo {
    font-size: 30px;
    font-weight: bold;
    margin-right: 20%;
}
nav li {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    }

    <style>

        `;
    }
}
customElements.define('nav-component', NavComponent);