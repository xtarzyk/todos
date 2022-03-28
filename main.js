const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')
const radioBtns = document.querySelectorAll('input[name="filter"]')
let todos = []


const createTask = () => {
    const newId = Date.now().toString()
    const newDiv = document.createElement('div')
    const newListItem = createNewListItem(newId)
    const newSpan = createSpanBtns(newId)

    newDiv.classList.add('list-item')
    newListItem.classList.add('list-item__li-tag')
    newListItem.textContent = taskName.value

    newDiv.append(newListItem)
    newDiv.append(newSpan)
    todos = todos.concat({
        text: taskName.value,
        isDone: false,
        id: newId
    })
    newDiv.setAttribute("todo-id", newId.toString())
    mainList.append(newDiv)
    taskName.value = ""
    console.log(todos)
    console.log(newDiv)
}

const createNewListItem = id => {
    const newListItem = document.createElement('li')
    newListItem.addEventListener('click', event => strikeOut(event, id))

    return newListItem
}


const strikeOut = (event, id) => {
    event.target.style.textDecoration = 'line-through'
    todos = todos.map(todo => {
        if (id === todo.id) {
            todo.isDone = true
            return todo
        }
        return todo
    })
}

const createSpanBtns = id => {
    const span = document.createElement('span')
    const trashIcon = document.createElement('i')
    const pencilIcon = document.createElement('i')

    trashIcon.classList.add("fa-solid", "fa-trash-can")
    pencilIcon.classList.add("fa-solid", "fa-pencil")

    trashIcon.addEventListener('click', event => {
        event.target.parentNode.parentNode.remove()
        todos = todos.filter(element => element.id === id)
    })
    pencilIcon.addEventListener('click', event => {
        // span.style.display = 'none'
        event.stopPropagation()
        editListItem(event, id)
    })
    span.append(pencilIcon, trashIcon)
    return span
}

const editListItem = (event, id) => {
    const li = event.target.parentNode.previousSibling
    const editionInput = document.createElement('input')
    li.textContent = ''
    editionInput.classList.add('edition-input')
    li.appendChild(editionInput)
    editionInput.addEventListener('change', editionEvent => {
        editionEvent.stopPropagation()

        li.textContent = editionEvent.target.value
        todos = todos.map(todo => {
            if (id === todo.id) {
                todo.text = li.textContent
                return todo
            }
            return todo
        })
    })

}


const filterList = event => {
    const currentNodeList = document.querySelectorAll('.list-item__li-tag')
    const currentList = Array.from(currentNodeList)
    if (event.target.id === 'todo') {
        let noLineList = currentList.filter(li => li.style.textDecoration !== 'line-through')
        console.log(noLineList)
    }
}

addTaskButton.addEventListener('click', createTask)

radioBtns.forEach(btn => {
    btn.addEventListener('change', event => filterList(event))
})


