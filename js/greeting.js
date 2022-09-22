const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const logoutForm = document.querySelector("#logout-form");
const logoutBtn = document.querySelector("#logout-form input");
const todo = document.querySelector(".todo");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function loginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
  logoutForm.classList.remove(HIDDEN_CLASSNAME);
  todo.classList.remove(HIDDEN_CLASSNAME);
}

function paintGreetings(username) {
  greeting.innerText = `어서오시오 ${username}`;
}

function logoutClick() {
  localStorage.removeItem(USERNAME_KEY);
  logoutForm.classList.add(HIDDEN_CLASSNAME);
  todo.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginInput.value = null;
}

//javascript confirm local stroge
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  // show the form
  // submit의 기본 기능은 페이지 새로고침. 새로고침을 하지 않기 위해서는 preventDefault()가 필요
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", loginSubmit);
} else {
  // show the greeting
  paintGreetings(savedUsername);
  todo.classList.remove(HIDDEN_CLASSNAME);
  logoutForm.classList.remove(HIDDEN_CLASSNAME);
}

logoutBtn.addEventListener("click", logoutClick);
