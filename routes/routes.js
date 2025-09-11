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
const UserProfilePage = `
<div id="chef-profile" style="max-width:600px;margin:auto;padding:16px;background:#fff;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
  <div style="text-align:center;">
    <img id="chef-img" src="https://via.placeholder.com/120" alt="Chef Profile" style="width:120px;height:120px;border-radius:50%;object-fit:cover;">
    <h2 id="chef-name">Chef Name</h2>
    <p id="chef-bio">This is a short description about the chef. Their style, specialties, or fun story goes here.</p>
    <p><strong>Experience:</strong> <span id="chef-exp">5</span> years</p>
    <button id="editChefBtn" style="padding:8px 14px;border:none;border-radius:6px;background:#2196F3;color:white;cursor:pointer;">Edit Profile</button>
  </div>

  <!-- Hidden edit form -->
  <div id="edit-form" style="display:none;margin-top:16px;">
    <label for="editName">Name:</label><br>
    <input type="text" id="editName" style="width:100%;padding:6px;margin:6px 0;"><br>

    <label for="editBio">Bio:</label><br>
    <textarea id="editBio" rows="3" style="width:100%;padding:6px;margin:6px 0;"></textarea><br>

    <label for="editExp">Experience (years):</label><br>
    <input type="number" id="editExp" min="0" style="width:100%;padding:6px;margin:6px 0;"><br>

    <button id="saveChefBtn" style="padding:8px 14px;border:none;border-radius:6px;background:#4CAF50;color:white;cursor:pointer;">Save</button>
    <button id="cancelEditBtn" style="padding:8px 14px;border:none;border-radius:6px;background:#f44336;color:white;cursor:pointer;margin-left:8px;">Cancel</button>
  </div>
</div>
    <a href='/addfood' data-link id='add-food-link'>Хоол нэмэх</a>
`
const addfoodPage = `
  <div id="food-form-container">
    <h2>Хоол нэмэх</h2>
    <form id="food-form">
      <label>Хоолны нэр:</label><br>
      <input type="text" id="food-name" required><br><br>

      <label>Хоолны тайлбар:</label><br>
      <textarea id="food-description" rows="4" required></textarea><br><br>

      <label>Зураг:</label><br>
      <input type="file" id="food-img" accept="image/*"><br><br>

      <label>Хугацаа (min):</label><br>
      <input type="number" id="food-time" min="1" required><br><br>

      <label>Ангилал:</label><br>
      <select id="food-category" required>
        <option value="">--Сонгох--</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select><br><br>

      <button id="addFood" type="submit">Нэмэх</button>
    </form>
  </div>
  <style>
    #food-form-container {
      width: 50%;
      margin: auto;
      padding: 20px;
      border-radius: 15px;
      background: #f9f9f9;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    #food-form label {
      font-weight: bold;
    }
    #food-form input, #food-form textarea, #food-form select {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    #food-form button {
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    #food-form button:hover {
      background: #45a049;
    }
  </style>
`

// --- Routes ---
 export const routes = {
    '/home': aboutPage,
    '/hool': HoolListPage,
    '/togooch': TogoochListPage,
    '/durtai': DurtaiPage,
    '/log-in': LogInPage,
    '/log-in/sign-up': SignUpPage,
    '/userprofile': UserProfilePage,
    '/addfood': addfoodPage,

};