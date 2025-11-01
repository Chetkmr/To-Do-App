<!-- to look this document Ctrl + Shift + P, Markdown: Open Preview  -->
# To‑Do App Code Documentation

## Technical Documentation Overview

This documentation explains the architecture and functionality of the To‑Do web application, focusing on JavaScript logic, DOM events, and LocalStorage data persistence mechanisms. It is written to help developers quickly understand how each component works and interacts.

---

## 🔹 Functional Flow Breakdown

Below is the functional architecture of the To‑Do application, explained based on user actions and internal event flow.

---

### ✅ 1️⃣ Add Todo — Flow & Logic

**Event Trigger:** User clicks the `Add` button.

#### ➤ Steps Executed

1. Read text from input box.
2. Validate non‑empty input.
3. If app is in edit mode → update existing item.
4. Otherwise:

   * Create `<li>` with `<p>` + Edit button + Remove button
   * Append to the list (DOM update)
   * Save to LocalStorage (`saveLocalTodos()`)

#### ➤ Data Flow

```
UI Input → JavaScript (addTodo) → DOM List Update → LocalStorage Update
```

#### Key Code Piece

```js
const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) return alert("write Something!");

    if (addbtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addbtn.value = "Add";
        inputbox.value = "";
        return;
    }

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'editbtn')
    editBtn.innerHTML = "Edit";
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'deletebtn')
    deleteBtn.innerHTML = "Remove";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputbox.value = ""
    saveLocalTodos(inputText);
}
```

---

### 🔄 2️⃣ Edit Todo — Flow & Logic

**Event Trigger:** User clicks on **Edit** button in a list item.

#### ➤ Steps Executed

1. Load current task text into input box.
2. Change button label to `Edit`.
3. Focus cursor for editing.

#### Problem Noted

The code relies on `editTodo.target` (undefined) → **not working**.

✅ Will be fixed in a later section.

#### Current Code

```js
if (e.target.innerHTML === "Edit") {
    inputbox.value = e.target.previousElementSibling.innerHTML;
    inputbox.focus();
    addbtn.value = "Edit";
}
```

---

### ❌ 3️⃣ Remove Todo — Flow & Logic

**Event Trigger:** User clicks on `Remove` button.

#### ➤ Steps Executed

1. Delete `<li>` from DOM
2. Remove corresponding entry from LocalStorage

#### Key Code

```js
if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodo(e.target.parentElement);
}
```

#### LocalStorage Deletion Logic

```js
let todoText = todo.children[0].innerHTML;
let todoIndex = todos.indexOf(todoText);
todos.splice(todoIndex, 1);
localStorage.setItem("todos", JSON.stringify(todos));
```

---

### 🔁 4️⃣ Load Stored Todos (on Refresh)

**Event Trigger:** Browser reloads page → DOMContentLoaded

#### ➤ Steps Executed

1. Read saved todos via `getLocalTodo()`
2. Convert JSON → JS Array
3. Create DOM elements for each task

#### Key Event Binding

```js
document.addEventListener('DOMContentLoaded', getLocalTodo);
```

---

✅ **Next Section:** Fixing Edit Feature + Improving Data Structure 🎯
