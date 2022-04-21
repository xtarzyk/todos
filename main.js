import { Todo } from './todo'

const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')
const radioBtns = document.querySelectorAll('input[name="filter"]')
let todos = []

const createTask = () => {
    const todo = new Todo(taskName.value)
    const newId = todo.getId()
    const newTodo = todo.render(strikeOutAndReverse, todos, taskName)

    todos = todos.concat(todo)
    newTodo.setAttribute('todo-id', newId)
    mainList.append(newTodo)
    console.log(todos)
    taskName.value = ''
}


const strikeOutAndReverse = (event, id) => {
    const editIcon = event.target.nextSibling.firstChild
    if (event.target.style.textDecoration === 'line-through') {
        event.target.style.textDecoration = 'none'
        editIcon.style.display = 'inline-block'
    } else {
        event.target.style.textDecoration = 'line-through'
        editIcon.style.display = 'none'
    }
    console.log(todos)
    todos.forEach(todo => {
        if (id === todo.getId()) {
            todo.setIsDone(!todo.getIsDone())
        }
    })
}

// const createSpanBtns = id => {
//     const span = document.createElement('span')
//     const trashIcon = document.createElement('i')
//     const pencilIcon = document.createElement('i')
//
//     trashIcon.classList.add('fa-solid', 'fa-trash-can')
//     pencilIcon.classList.add('fa-solid', 'fa-pencil')
//
//     trashIcon.addEventListener('click', event => {
//         event.target.parentNode.parentNode.remove()
//         todos = todos.filter(element => element.getId() !== id)
//     })
//     pencilIcon.addEventListener('click', event => {
//         const currentDiv = event.target.parentNode.parentNode
//         const currentListItem = event.target.parentNode.previousSibling
//
//         currentDiv.classList.remove('list-item')
//         currentListItem.classList.remove('list-item__li-tag')
//         currentDiv.classList.add('edited-list-item')
//         currentListItem.classList.add('edited-list-item__li-tag')
//
//         span.style.display = 'none'
//         editListItem(event, id)
//     })
//     span.append(pencilIcon, trashIcon)
//     return span
// }

// const editListItem = (event, id) => {
//     const li = event.target.parentNode.previousSibling
//     const div = li.parentNode
//     const editionInput = document.createElement('input')
//     const span = event.target.parentNode
//
//     li.textContent = ''
//     editionInput.classList.add('edition-input')
//     li.appendChild(editionInput)
//
//     editionInput.addEventListener('change', editionEvent => {
//         li.textContent = editionEvent.target.value
//         todos = todos.map(todo => {
//             if (id === todo.getId()) {
//                 // todo.text = li.textContent
//                 todo.setText(li.textContent)
//                 console.log(todo)
//                 return todo
//             }
//             return todo
//         })
//         div.classList.remove('edited-list-item')
//         li.classList.remove('edited-list-item__li-tag')
//         div.classList.add('list-item')
//         li.classList.add('list-item__li-tag')
//         span.style.display = 'block'
//     })
// }
//
//
const filterList = event => {
    const currentNodeList = document.querySelectorAll('.list-item')
    console.log(todos)
    const finishedTasksList = todos.filter(todo => todo.getIsDone())
    const finishedId = finishedTasksList.map(task => task.getId())

    if (event.target.id === 'todo') {
        currentNodeList.forEach(div => {
            if (finishedId.includes(div.getAttribute('todo-id'))) {
                div.style.display = 'none'
            } else {
                div.style.display = 'flex'
            }
        })
    }
    if (event.target.id === 'strokes') {
        currentNodeList.forEach(div => {
            if (!finishedId.includes(div.getAttribute('todo-id'))) {
                div.style.display = 'none'
            } else {
                div.style.display = 'flex'
            }
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


