// --- HTML pages ---
export let aboutPage = `
    <h1>About Us</h1>
    <p>Welcome to our recipe website! We are passionate about sharing delicious and easy-to-make recipes with food enthusiasts around the world. Our mission is to inspire home cooks to explore new flavors and culinary techniques while providing a platform for chefs to showcase their talents.</p>
    <p>Whether you're a beginner in the kitchen or an experienced cook, our website offers a wide variety of recipes to suit every taste and skill level. From quick weeknight dinners to elaborate gourmet dishes, we have something for everyone.</p>
    <h2> Our Top Rating Foods</h2>
    <div id="Hool-Container">
        <hool-card></hool-card>
        <hool-card></hool-card>
        <hool-card></hool-card>
        <hool-card></hool-card>
    </div>
`;

const HoolListPage = `
    <H1>Foods</H1>
    <div id="container">
        <filter-food></filter-food>
        <div id="Hool-Container"></div>
    </div>
`;

const TogoochListPage = `
    <h1>Simple Recipes that easy to make</h1>
    <div id="container">
        <filter-chef></filter-chef>
        <div id="Togooch-Container"></div>
    </div>
`;

const DurtaiPage = `
    <div id="container">
        <div id="Togooch-Container"></div>
        <div id="Hool-Container"></div>
    </div>
`;

const LogInPage = `
    <div id="sign-in-page">
    <div id="sign-in-box">
        <div id="input">
        <section class="sign-in-section" id="username">
            <h1 class="Nevtreh">Нэтврэх</h1>
            <input type="text" class="input" placeholder="Нэвтрэх нэрээ оруулна уу">
        </section>
        <section class="sign-in-section" id="password">
            <h1 class="Nevtreh">Нууц үг</h1>
            <input type="text" class="input" placeholder="Нууц үгээ оруулна уу">
        </section>
         </div>
         <section class="sign-in-section" id="buttons">
        <button id="Nevtreh" class="button">nevtreh</button>
        <button id="Burtgeh-huudas" class="button" onclick="check()">burtguuleh</button>
    </section>
    </div>
    </div>
`
const SignUpPage = `
    <div id="sign-in-page">
    <div id="sign-in-box">
        <div id="input">
        <section class="sign-in-section" id="username">
            <h1 class="Nevtreh">Нэтврэх нэр</h1>
            <input type="text" class="input" placeholder="Нэвтрэх нэрээ оруулна уу">
        </section>
        <section class="sign-in-section" id="password">
            <h1 class="Nevtreh">Нууц үг</h1>
            <input type="text" class="input" placeholder="Нууц үгээ оруулна уу">
        </section>
         </div>
         <section class="sign-in-section" id="buttons">
        <button class="button" id="Burtguuleh">burtguuleh</button>
    </section>
    </div>
    </div>
`

// --- Routes ---
 export const routes = {
    '/home': aboutPage,
    '/hool': HoolListPage,
    '/togooch': TogoochListPage,
    '/durtai': DurtaiPage,
    '/log-in': LogInPage,
    '/log-in/sign-up': SignUpPage
};