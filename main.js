const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')


addTaskButton.addEventListener('click', () => {
    const newDiv = document.createElement('div')
    const newListItem = document.createElement('li')
    const newTrash = document.createElement('span')

    newTrash.innerHTML += '<i class="fa-solid fa-trash-can"></i>'
    newDiv.classList.add('list-item')
    newListItem.classList.add('list-item__li-tag')
    newListItem.textContent = `${taskName.value}`

    mainList.append(newDiv)
    newDiv.append(newListItem)
    newDiv.append(newTrash)
})

mainList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        event.target.style.textDecoration = 'line-through'
    }
    if (event.target.className === 'fa-solid fa-trash-can') {
        event.target.parentNode.parentNode.remove()
    }
})