import { navigateTo } from "../htmlFolder/StartPage/MainJS.js";

export function logIn(arr) {
    
        const username = document.querySelector('#username input').value;
        const password = document.querySelector('#password input').value;
        const user= arr.find(u => u.username === username && u.password === password);
       if(user) {
        prompt("Амжилттай нэвтэрлээ!");
        
        // signed in state хадгалах (localStorage ашиглана)
        localStorage.setItem("loggedInUser", JSON.stringify(user));
         // Навигацийн холбоосыг шинэчлэх
        navigateTo('/home');
        updateLoginState();
        
        // жишээ нь дараагийн хуудас руу үсрүүлж болно
        // window.location.href = "profile.html";
    } else {
        document.getElementById("main-page").innerText = `Нэр эсвэл нууц үг буруу байна!, Ахиад нэвтэр`;
        }

    }

export  function signUp(arr) {
    let newUserName = document.querySelector('#username input').value;
    let newPassword = document.querySelector('#password input').value;

    let userExists = arr.some(u => u.username === newUserName);
    if (userExists) {
        document.getElementById("loginMessage").innerText = "Энэ нэр аль хэдийн ашиглагдсан байна!";
        return;
    }
    let newUser = {
        id: arr.length + 1,
        username: newUserName,
        password: newPassword,
        liked_foods: [],
        liked_chefs: []
    };
    console.log(newUser);
    arr.push(newUser);
    document.getElementById("main-page").innerText = "Амжилттай бүртгэгдлээ! Одоо нэвтэрч орно уу.";
};

export function updateLoginState() {
    let isLoggedIn = false;
    isLoggedIn = !!localStorage.getItem("loggedInUser");
    const durtai = document.querySelector("nav-component").shadowRoot.getElementById("durtai");
    durtai.style.display = isLoggedIn ? "inline" : "none";
    const username= document.querySelector("nav-component").shadowRoot.getElementById("username-display");
    const profileSection = document.querySelector("nav-component").shadowRoot.getElementById("profile-section");
    profileSection.style.display = isLoggedIn ? "block" : "none";
    const logInLink = document.querySelector("nav-component").shadowRoot.getElementById("log-in");
    logInLink.style.display = isLoggedIn ? "none" : "inline";
    if (isLoggedIn) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        username.textContent = loggedInUser.username;
        const logoutButton = document.querySelector("nav-component").shadowRoot.getElementById("logout-button");
        logoutButton.onclick = logOut;
        
    }
}
    
export function logOut() {
    localStorage.removeItem("loggedInUser");
    updateLoginState();
    navigateTo('/home');
}
