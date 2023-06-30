export class todoList {
    constructor(list) {
        this.list = list
        this.tasks = []
    }

    createNewElement(item) {
        let li = document.createElement('li')
        li.classList.add('list-element')
        
        let checkboxButton = document.createElement('input') 
        checkboxButton.type = 'checkbox'
        checkboxButton.classList.add('checkbox')

        let liText = document.createElement('span')
        liText.classList.add('task-text')
        liText.textContent = item.value

        let editButton = document.createElement('img')
        editButton.classList.add('edit')
        editButton.src = './img/edit.svg'

        let deleteButton = document.createElement('img')
        deleteButton.classList.add('delete')
        deleteButton.src = './img/delete.svg'
        
        li.append(checkboxButton, liText, editButton, deleteButton)

        return {
            li,
            checkboxButton,
            editButton,
            deleteButton
        }
    }

    renderList() {
        this.list.innerHTML = ''
        localStorage.setItem('todolist', JSON.stringify(this.tasks))
        
        this.tasks.forEach(task => {

        let { li,
              deleteButton,
              checkboxButton,
              editButton } = this.createNewElement(task)

        if(task.checked) {
            checkboxButton.checked = true
            li.children[1].style.textDecoration = 'line-through'
        }

        deleteButton.addEventListener('click', () => this.delete(task))
        checkboxButton.addEventListener('change', () => this.check(task))
        editButton.addEventListener('click', () => {
            li.style.display = 'none'

            let editLi = document.createElement('li')
            editLi.classList.add('list-element', 'list-element-edit')

            let editInput = document.createElement('input')
            editInput.classList.add('input-task', 'input-task-edit')
            editInput.value = task.value
            editInput.maxLength = '25'

            let editSubmit = document.createElement('img')
            editSubmit.classList.add('edit')
            editSubmit.src = './img/ok.svg'

            let editCancel = document.createElement('img')
            editCancel.classList.add('edit')
            editCancel.src = './img/cancel.svg'

            editLi.append(editInput, editSubmit, editCancel)
            li.after(editLi)

            editSubmit.onclick = () => this.edit(task, editInput.value)
            editCancel.onclick = () => this.renderList()

        })

        this.list.append(li)
        
        if(this.list.scrollHeight > this.list.clientHeight) this.list.style.overflowY = 'scroll'
        else this.list.style.overflowY = 'hidden'
        })
    }

    add(task) {
        this.tasks.push(task)
        this.renderList()
    }

    delete(task) {
        this.tasks = this.tasks.filter(t => t !== task)
        this.renderList()
    }

    edit(task, editedText) {
        if(editedText) task.value = editedText
        this.renderList()
    }

    check(task) {
        task.checked = !task.checked
        this.renderList()
    }

    selectAll() {
        this.tasks.forEach(task => task.checked = true)
        this.renderList()
    }
}