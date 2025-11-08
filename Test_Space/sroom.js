// // https://github.com/devmode-on/Animated-Dark-Mode-Button/blob/main/Miniatura.png

// const body = document.querySelector('body');
// const btn = document.querySelector('.btn');
// const icon = document.querySelector('.btn__icon');

// //to save the dark mode use the object "local storage".

// //function that stores the value true if the dark mode is activated or false if it's not.
// function store(value){
//   localStorage.setItem('darkmode', value);
// }

// //function that indicates if the "darkmode" property exists. It loads the page as we had left it.
// function load(){
//   const darkmode = localStorage.getItem('darkmode');

//   //if the dark mode was never activated
//   if(!darkmode){
//     store(false);
//     icon.classList.add('fa-sun');
//   } else if( darkmode == 'true'){ //if the dark mode is activated
//     body.classList.add('darkmode');
//     icon.classList.add('fa-moon');
//   } else if(darkmode == 'false'){ //if the dark mode exists but is disabled
//     icon.classList.add('fa-sun');
//   }
// }


// load();

// btn.addEventListener('click', () => {

//   body.classList.toggle('darkmode');
//   icon.classList.add('animated');

//   //save true or false
//   store(body.classList.contains('darkmode'));

//   if(body.classList.contains('darkmode')){
//     icon.classList.remove('fa-sun');
//     icon.classList.add('fa-moon');
//   }else{
//     icon.classList.remove('fa-moon');
//     icon.classList.add('fa-sun');
//   }

//   setTimeout( () => {
//     icon.classList.remove('animated');
//   }, 500)
// })


const inputbox = document.querySelector('#inputbox');
const addbtn = document.querySelector('#addbtn');
const todoList = document.querySelector('#todoList');

let editableTodo = null;


// add function
const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) {
        alert("write Somthing!...")
        return inputText;
    }

    //edit function // some bug is there it is not working
    if (addbtn.value === "Edit") {
        editableTodo.target.previousElementSibling.innerHTML = inputText;
        addbtn.value = "Add";
        inputbox.value = "";
    }
    else {

        // creating  p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        // adding Edit butten
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'editbtn')
        editBtn.innerHTML = "Edit";
        li.appendChild(editBtn);

        // adding delete butten
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'deletebtn')
        deleteBtn.innerHTML = "Remove";
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputbox.value = "" //it can be blank after addig the task

        saveLocalTodos(inputText);
    }

}

// updating todo {removeEventListener, edit}
const updateTodo = (e) => {
    // remove function
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement); // e.target.parentElement means task name, edit, removethese are all chilld of oone parent, meand these are 3  siblings we can remove the theat parent it can be deleted;
        deleteLocalTodo(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";
        editableTodo = e;

    }

}

// saving todos into localStorage
const saveLocalTodos = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

// geting saved todos into every time refreash
const getLocalTodo = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = todo;
            li.appendChild(p);

            // adding Edit butten
            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'editbtn')
            editBtn.innerHTML = "Edit";
            li.appendChild(editBtn);

            // adding delete butten
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'deletebtn')
            deleteBtn.innerHTML = "Remove";
            li.appendChild(deleteBtn);

            todoList.appendChild(li);

        });
    }
}

// till now when we remove the tasks, but refresh the page it come directlyy to the localStorag
// deleting localStorage when remove the tasks
const deleteLocalTodo = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    // console.log(todoText.children[0].innerHTML); // todoText.children[0] this index is about in li>[0]p,[1]button,[2]button
    let todoIndex = todos.indexOf(todoText) //index of saved of tasks 
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // array function slice / splice
    console.log(todoIndex);


}

document.addEventListener('DOMContentLoaded', getLocalTodo); // DOMContentLoaded means when page is reloded
addbtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
