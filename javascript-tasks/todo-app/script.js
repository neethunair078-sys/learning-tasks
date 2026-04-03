let input = document.getElementById('add-todo')
let todoList = document.getElementById('todo-list')

const addTodo = () => {
    let newTodo = input.value
    let listItem = document.createElement('li')
    let todoContent = document.createElement('span')
    let taskStatus = document.createElement('input')
    taskStatus.type = "checkbox"


    todoContent.textContent = newTodo

    todoList.appendChild(listItem)

    input.value = ""

    // Delete list
    let deleteList = document.createElement('button')
    deleteList.textContent = '✖'

    deleteList.onclick = function () {
        listItem.remove()
        taskCount()
        setLocalStorage()
    }


    // Checkbox status change

    taskStatus.onchange = function () {
        if (taskStatus.checked) {
            todoContent.style.textDecoration = "line-through"
            todoContent.style.color = "gray"
        } else {
            todoContent.style.textDecoration = "none"
            todoContent.style.color = "black"
        }

        setLocalStorage()
    }

    listItem.appendChild(taskStatus)
    listItem.append(todoContent)
    listItem.appendChild(deleteList)

    taskCount()
    setLocalStorage()

}

let total = document.getElementById('total')
const taskCount = () => {
    total.innerHTML = todoList.childElementCount
}

//  localStorage.setItem("Todo", )

const filterList = (e) => {
    let list = todoList.children
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let status = item.querySelector('input')

        if (e === 'all') {
            item.style.display = 'block'
        } else if (e === 'completed') {
            item.style.display = status.checked ? 'block' : 'none'
        } else if (e === 'pending') {
            item.style.display = !status.checked ? 'block' : 'none'
        }
    }
}

let setLocalStorage = () => {
    localStorage.setItem('todo', todoList.innerHTML)
}

let getLocalStorage = () => {
    let savedData = localStorage.getItem('todo')

    if (savedData) {
        todoList.innerHTML = savedData
    }
}

const addedItems = () => {
    let items = todoList.children

    for (let li of items) {
        let deleteBtn = li.querySelector('button')
        let checkbox = li.querySelector('input')
        let span = li.querySelector('span')

        deleteBtn.onclick = function () {
            li.remove()
            taskCount()
            setLocalStorage()
        }

        checkbox.onchange = function () {
            if (checkbox.checked) {
                span.style.textDecoration = "line-through"
                span.style.color = "gray"
            } else {
                span.style.textDecoration = "none"
                span.style.color = "black"
            }
            setLocalStorage()
        }
    }
}

window.onload = function () {
    getLocalStorage()
    taskCount()
    addedItems()
}

let button = document.getElementById('add-btn')
const toggleButtonDisable = () => {
  
    if (input.value.trim() === "") {
        button.disabled = true
    } else {
        button.disabled = false
    }
}