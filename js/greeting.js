const loginForm = document.querySelector("#login-form");
const logoutForm = document.querySelector("#logout-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
    logoutForm.classList.remove(HIDDEN_CLASSNAME);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function logoutClick() {
    localStorage.removeItem(USERNAME_KEY);
    greeting.classList.add(HIDDEN_CLASSNAME);
    logoutForm.classList.add(HIDDEN_CLASSNAME);
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginInput.value = null;
}

//javascript confirm local stroge
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
    // show the form
    // submit의 기본 기능은 페이지 새로고침. 새로고침을 하지 않기 위해서는 preventDefault()가 필요
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // show the greeting
    paintGreetings(savedUsername);
    logoutForm.classList.remove(HIDDEN_CLASSNAME);
}

logoutForm.addEventListener("click", logoutClick);