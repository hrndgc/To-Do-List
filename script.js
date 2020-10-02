//Variables
const entry = document.querySelector(".input");
const buttonAdd = document.querySelector(".add");
const container = document.querySelector(".container");
//addEventListeners
buttonAdd.addEventListener("click", createItem);
buttonAdd.addEventListener("click", createRemoveAll);

//Check Local Storage
var dataFromLocal = JSON.parse(localStorage.getItem("items"));
var arr;
if (dataFromLocal == null) {
  arr = [];
} else {
  arr = dataFromLocal;
}

load();

entry.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    createItem();
    createRemoveAll();
  }
});
// Item functions
function createItem() {
  core(entry.value);
  arr.push(entry.value);
  localStorage.setItem("items", JSON.stringify(arr));
  entry.value = "";
}

function removeItem(event) {
  arr = [];
  event.target.parentElement.remove();
  document.querySelectorAll("#text").forEach((paragraph) => {
    arr.push(paragraph.innerHTML);
  });
  localStorage.setItem("items", JSON.stringify(arr));
  if (document.body.children[2].childElementCount == 1) {
    container.innerHTML = "";
  }
}
//Function for Clear All button
function createRemoveAll() {
  if (document.body.children[2].childElementCount < 3) {
    const deleteAll = document.createElement("button");
    deleteAll.className = "removeAll";
    deleteAll.innerHTML = "Clear All";
    container.appendChild(deleteAll);
    deleteAll.addEventListener("click", function (e) {
      var result = confirm("Are you sure? All work list will delete?")
      console.log(result);
      if(result){
        e.target.parentElement.innerHTML = "";
        localStorage.clear();
        arr = [];
      }
    });
  }
}
//Load function after reloading the page
function load() {
  if (arr.length !== 0) {
    createRemoveAll();
  }
  arr.forEach((x) => {
    core(x);
  });
}

function core(y) {
  entry.focus();
  const item = document.createElement("div");
  item.className = "toDo";
  const paragraph = document.createElement("p");
  paragraph.id = "text";
  paragraph.innerHTML = y;
  const deleteButton = document.createElement("button");
  deleteButton.className = "remove";
  deleteButton.innerHTML = "&#128473;";
  deleteButton.addEventListener("click", removeItem);
  item.appendChild(paragraph);
  item.appendChild(deleteButton);
  container.appendChild(item);
}
