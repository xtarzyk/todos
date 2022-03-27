const addTaskButton = document.querySelector('.header__button')
const taskName = document.querySelector('.header__input')
const mainList = document.querySelector('.main__list')
const trashIcon = '<i class="fa-solid fa-trash-can"></i>'
const pencilIcon = '<i class="fa-solid fa-pencil"></i>'
const radioBtns = document.querySelectorAll('input[name="filter"]')


addTaskButton.addEventListener('click', () => {
        const newDiv = document.createElement('div')
        const newListItem = document.createElement('li')
        const newSpan = document.createElement('span')

        newSpan.innerHTML = pencilIcon + trashIcon
        newDiv.classList.add('list-item')
        newListItem.classList.add('list-item__li-tag')
        newListItem.textContent = `${taskName.value}`

        mainList.append(newDiv)
        newDiv.append(newListItem)
        newDiv.append(newSpan)
})

const editListItem = event => {
    const li = event.target.parentNode.previousSibling
    taskName.addEventListener('change', e => {
        li.textContent = e.target.value
    })
}

const handleChange = event => {
    if (event.target.tagName === 'LI') {
        event.target.style.textDecoration = 'line-through'
    }
    if (event.target.className === 'fa-solid fa-pencil') {
        editListItem(event);
    }
    if (event.target.className === 'fa-solid fa-trash-can') {
        event.target.parentNode.parentNode.remove()
    }
}

const filterList = event => {
    const currentNodeList = document.querySelectorAll('.list-item__li-tag')
    const currentList = Array.from(currentNodeList)
    if(event.target.id === 'todo') {
        let noLineList = currentList.filter(li => li.style.textDecoration !== 'line-through')
        console.log(noLineList)
    }
}


mainList.addEventListener('click', event => {
    handleChange(event)
})

radioBtns.forEach( btn => {
    btn.addEventListener('change', event => filterList(event))
})


