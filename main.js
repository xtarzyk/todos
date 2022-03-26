const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')
const trashIcon = '<i class="fa-solid fa-trash-can"></i>'
const pencilIcon = '<i class="fa-solid fa-pencil"></i>'


addTaskButton.addEventListener('click', () => {
    const newDiv = document.createElement('div')
    const newListItem = document.createElement('li')
    const newSpan = document.createElement('span')

    newSpan.innerHTML += pencilIcon + trashIcon
    newDiv.classList.add('list-item')
    newListItem.classList.add('list-item__li-tag')
    newListItem.textContent = `${taskName.value}`

    mainList.append(newDiv)
    newDiv.append(newListItem)
    newDiv.append(newSpan)
})

function editListItem(event) {
    const li = event.target.parentNode.previousSibling
    taskName.addEventListener('change', e => {
        li.textContent = e.target.value
    })
    mainList.removeEventListener('click', handleChange)
    taskName.removeEventListener('change', editListItem)
}

function handleChange(event) {
    if (event.target.tagName === 'LI') {
        event.target.style.textDecoration = 'line-through'
    }
    if (event.target.className === 'fa-solid fa-pencil') {
        editListItem(event);
    }
    if (event.target.className === 'fa-solid fa-trash-can') {
        event.target.parentNode.parentNode.remove()
    }
    mainList.removeEventListener('click', handleChange)
}


mainList.addEventListener('click', event => {
    handleChange(event);
})



