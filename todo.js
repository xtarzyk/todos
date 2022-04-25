import { v4 as uuidv4 } from 'uuid'

export class Todo {
    #id
    #isDone
    #text
    #editIcon

    constructor(text) {
        this.#id = uuidv4()
        this.#isDone = false
        this.#text = text
    }

    getId() {
        return this.#id
    }

    getIsDone() {
        return this.#isDone
    }

    toggleIsDone() {
        this.#isDone = !this.#isDone
    }

    setText(value) {
        this.#text = value
    }

    render(onClick, deleteItem, editListItem) {
        const newDiv = document.createElement('div')
        const newListItem = this.#createNewListItem(onClick)
        const newSpan = this.#createSpanBtns(deleteItem, editListItem)

        newDiv.classList.add('list-item')
        newDiv.setAttribute('todo-id', this.#id)
        newListItem.classList.add('list-item__li-tag')
        newListItem.textContent = this.#text
        newDiv.append(newListItem)
        newDiv.append(newSpan)

        return newDiv
    }

    #createNewListItem(onClick) {
        const newListItem = document.createElement('li')

        newListItem.addEventListener('click', event => {
            if (newListItem.textContent !== '') {
                onClick(this.#editIcon, newListItem)
                this.toggleIsDone()
            }
        })

        return newListItem
    }

    #createSpanBtns(deleteItem, editListItem) {
        const span = document.createElement('span')
        const trashIcon = document.createElement('i')
        const pencilIcon = document.createElement('i')
    
        trashIcon.classList.add('fa-solid', 'fa-trash-can')
        pencilIcon.classList.add('fa-solid', 'fa-pencil')
    
        deleteItem(trashIcon, this.#id)
    
        pencilIcon.addEventListener('click', event => {
            const currentDiv = event.target.parentNode.parentNode
            const currentListItem = event.target.parentNode.previousSibling
    
            currentDiv.classList.remove('list-item')
            currentListItem.classList.remove('list-item__li-tag')
            currentDiv.classList.add('edited-list-item')
            currentListItem.classList.add('edited-list-item__li-tag')
    
            span.style.display = 'none'
            editListItem(event, this.#id)
        })
    
        span.append(pencilIcon, trashIcon)
        this.#editIcon = pencilIcon
    
        return span
    }
}
