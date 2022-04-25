import { Todo } from './todo'

const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')
const radioBtns = document.querySelectorAll('input[name="filter"]')
let todos = []

const createTask = () => {
    const todo = new Todo(taskName.value)
    const newTodo = todo.render(strikeOutAndReverse, deleteItem, editItem)

    todos = todos.concat(todo)
    mainList.append(newTodo)
    taskName.value = ''
}

const strikeOutAndReverse = (editIcon, textNode) => {
    if (textNode.style.textDecoration === 'line-through') {
        textNode.style.textDecoration = 'none'
        editIcon.style.display = 'inline-block'

        return
    }
        textNode.style.textDecoration = 'line-through'
        editIcon.style.display = 'none'
}

const deleteItem = (trashIcon, id, parentDiv) => {
    trashIcon.addEventListener('click', () => {
        parentDiv.remove()
        todos = todos.filter(element => element.getId() !== id)
    })
}

const editItem = (pencilIcon, id, parentDiv, currentListItem, span) => {
    pencilIcon.addEventListener('click', () => {
        parentDiv.classList.remove('list-item')
        currentListItem.classList.remove('list-item__li-tag')
        parentDiv.classList.add('edited-list-item')
        currentListItem.classList.add('edited-list-item__li-tag')

        span.style.display = 'none'
        changeListItem(id, parentDiv, currentListItem, span)
    })
}

const changeListItem = (id, parentDiv, li, span) => {
    const editionInput = document.createElement('input')

    li.textContent = ''
    editionInput.classList.add('edition-input')
    li.appendChild(editionInput)

    editionInput.addEventListener('change', editionEvent => {
        li.textContent = editionEvent.target.value
        todos = todos.map(todo => {
            if (id === todo.getId()) {
                todo.setText(li.textContent)

                return todo
            }

            return todo
        })
        parentDiv.classList.remove('edited-list-item')
        li.classList.remove('edited-list-item__li-tag')
        parentDiv.classList.add('list-item')
        li.classList.add('list-item__li-tag')
        span.style.display = 'block'
    })
}

const filterList = event => {
    const currentNodeList = document.querySelectorAll('.list-item')
    const finishedTasksIds = todos
        .filter(todo => todo.getIsDone())
        .map(task => task.getId())

    if (event.target.id === 'todo') {
        currentNodeList.forEach(div => {
            if (finishedTasksIds
                .includes(div.getAttribute('todo-id'))) {
                div.style.display = 'none'

                return
            }
                div.style.display = 'flex'
        })
    }

    if (event.target.id === 'strokes') {
        currentNodeList.forEach(div => {
            if (!finishedTasksIds
                .includes(div.getAttribute('todo-id'))) {
                div.style.display = 'none'

                return
            }
                div.style.display = 'flex'
        })
    }

    if (event.target.id === 'all') {
        currentNodeList.forEach(div => div.style.display = 'flex')
    }
}

addTaskButton.addEventListener('click', createTask)

radioBtns.forEach(btn => {
    btn.addEventListener('change', event => filterList(event))
})