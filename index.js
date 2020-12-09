// selectors

let todoinput = document.querySelector(".todo-input");
let todobutton = document.querySelector(".todo-button");
let alltodo = document.querySelector(".todo-list");
let filter = document.querySelector(".filter");

// adding eventlisteners
todoinput.addEventListener("change", addtodo);
filter.addEventListener("click", filtertodo);
document.addEventListener("DOMContentLoaded", getlocalstorage);

// functions

function addtodo() {
  // creating elements
  todo = document.createElement("div");
  li = document.createElement("li");
  completeli = document.createElement("i");
  trashli = document.createElement("i");
  updateli = document.createElement("i");
  complete = document.createElement("button");
  trash = document.createElement("button");
  update = document.createElement("button");

  // the todo text
  text = todoinput.value;
  li.innerHTML = text;

  // adding classes
  todo.classList.add("todo");
  trashli.classList.add("fas");
  trashli.classList.add("fa-trash");
  completeli.classList.add("fas");
  completeli.classList.add("fa-check-circle");
  trash.classList.add("trash-btn");
  complete.classList.add("complete-btn");
  update.classList.add("complete-btn");
  updateli.classList.add("fas");
  updateli.classList.add("fa-plus-square");

  //   appending elements
  complete.appendChild(completeli);
  trash.appendChild(trashli);
  update.appendChild(updateli);
  todo.appendChild(li);
  todo.appendChild(complete);
  todo.appendChild(trash);
  todo.appendChild(update);
  alltodo.appendChild(todo);

  //   adding event listeners
  trash.addEventListener("click", remove);
  complete.addEventListener("click", done);
  update.addEventListener("click", updatetodo);

  // adding to local storage
  savetolocal(text);

  // reseting

  todoinput.value = "";
}

function remove(e) {
  this.parentElement.classList.add("away");
  this.parentElement.addEventListener("transitionend", function () {
    this.remove();
  });
  index = this.parentElement.firstChild.innerHTML;
  removefromlocalstorage(index);
}

function done() {
  this.parentElement.classList.toggle("done");
}

function filtertodo(e) {
  value = e.target.value;
  stuffs = alltodo.childNodes;
  stuffs.forEach(function (x) {
    if (value === "all") {
      x.style.display = "flex";
    } else if (value === "completed") {
      if (x.classList.contains("done")) {
        x.style.display = "flex";
      } else {
        x.style.display = "none";
      }
    } else if (value === "uncompleted") {
      if (!x.classList.contains("done")) {
        x.style.display = "flex";
      } else {
        x.style.display = "none";
      }
    }
  });
}

// function filtertodo(e) {
//   value = e.target.value;
//   stuffs = alltodo.childNodes;
//   stuffs.forEach(function (x) {
//     switch (value) {
//       case "all":
//         x.style.display = "flex";
//         break;
//       case "completed":
//         if (x.classList.contains("done")) {
//           x.style.display = "flex";
//         } else {
//           x.style.display = "none";
//         }
//         break;
//       case "uncompleted":
//         if (!x.classList.contains("done")) {
//           x.style.display = "flex";
//         } else {
//           x.style.display = "none";
//         }
//         break;
//     }
//   });
// }

// updating todos with new ones from prompt

function updatetodo() {
  newtodo = prompt("enter new todo");
  this.parentElement.firstChild.innerHTML = newtodo;
}

// saving the todos to local storage

function savetolocal(todo) {
  let todolist;

  if (localStorage.getItem("todolist") === null) {
    todolist = [];
  } else {
    thelist = localStorage.getItem("todolist");
    todolist = JSON.parse(thelist);
  }

  todolist.push(todo);
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

// getting and setting added todos when the page loads

function getlocalstorage() {
  console.log("hello");
  let todolist;
  if (localStorage.getItem("todolist") === null) {
    todolist = [];
  } else {
    thelist = localStorage.getItem("todolist");
    todolist = JSON.parse(thelist);
  }

  todolist.forEach(function (x) {
    // creating elements
    todo = document.createElement("div");
    li = document.createElement("li");
    completeli = document.createElement("i");
    trashli = document.createElement("i");
    updateli = document.createElement("i");
    complete = document.createElement("button");
    trash = document.createElement("button");
    update = document.createElement("button");

    // the todo text
    text = x;
    li.innerHTML = text;

    // adding classes
    todo.classList.add("todo");
    trashli.classList.add("fas");
    trashli.classList.add("fa-trash");
    completeli.classList.add("fas");
    completeli.classList.add("fa-check-circle");
    trash.classList.add("trash-btn");
    complete.classList.add("complete-btn");
    update.classList.add("complete-btn");
    updateli.classList.add("fas");
    updateli.classList.add("fa-plus-square");

    //   appending elements
    complete.appendChild(completeli);
    trash.appendChild(trashli);
    update.appendChild(updateli);
    todo.appendChild(li);
    todo.appendChild(complete);
    todo.appendChild(trash);
    todo.appendChild(update);
    alltodo.appendChild(todo);

    //   adding event listeners
    trash.addEventListener("click", remove);
    complete.addEventListener("click", done);
    update.addEventListener("click", updatetodo);
  });
}

// this removes the todo from the localstorage
function removefromlocalstorage(index) {
  thelist = localStorage.getItem("todolist");
  thelist = JSON.parse(thelist);
  i = thelist.indexOf(index);
  thelist.splice(i, 1);
  todolist = thelist;
  localStorage.setItem("todolist", JSON.stringify(todolist));
}
