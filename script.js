const inputbox = document.querySelector('#inputbox');
const addbtn = document.querySelector('#addbtn');
const todoList = document.querySelector('#todoList');


let editTodo = () => {

}
// add function
const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) {
        alert("write Somthing!...")
        return inputText;
    }

    //edit function // some bug is there it is not working
    if (addbtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
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
    todos.splice(todoIndex,1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // array function slice / splice
    console.log(todoIndex);
    
    
}

document.addEventListener('DOMContentLoaded', getLocalTodo); // DOMContentLoaded means when page is reloded
addbtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
