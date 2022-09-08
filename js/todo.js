const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const removeli = event.target.parentElement;
  // localStorage에서 지울 li를 제외한 li들의 리스트
  removeli.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(removeli.id));
  saveTodos();
}

// newTodo에 들어가는건 handleToDoSubmit의 newTodObj 따라서 innerText를 newToDoj의 키값 text를 이용해서 해당 값을 불러와 바꿔준다
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodObj);
  paintToDo(newTodObj);
  saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedToDos = JSON.parse(savedTodos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
