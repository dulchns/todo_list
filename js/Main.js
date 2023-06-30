import { todoList } from "/js/TodoList.js"

const list = new todoList(document.querySelector('.list'))
const addForm = document.querySelector('.controls')
const selectAll = document.querySelector('.select-all')

if (localStorage.getItem('todolist')) {
    list.tasks = JSON.parse(localStorage.getItem('todolist'))
    list.renderList()
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let inputField = document.querySelector('.input-task')
    let item = {
        value: inputField.value,
        checked: false
    }

    list.add(item)
    inputField.value = ''
})

selectAll.addEventListener('click', () => list.selectAll())