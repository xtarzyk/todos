import { v4 as uuidv4 } from 'uuid'

export class Todo {
    #id
    #ref
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

    getRef() {
        return this.#ref
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

    render(onClick, deleteItem, editItem) {
        const newDiv = document.createElement('div')
        const newListItem = this.#createNewListItem(onClick)
        const newSpan = this.#createSpanBtns(deleteItem, editItem, newDiv, newListItem)

        newDiv.classList.add('list-item')
        newDiv.setAttribute('todo-id', this.#id)
        newListItem.classList.add('list-item__li-tag')
        newListItem.textContent = this.#text
        newDiv.append(newListItem)
        newDiv.append(newSpan)

        this.#ref = newDiv

        return newDiv
    }

    #createNewListItem(onClick) {
        const newListItem = document.createElement('li')

        newListItem.addEventListener('click', () => {
            if (newListItem.textContent !== '') {
                onClick(this.#editIcon, newListItem)
                this.toggleIsDone()
            }
        })

        return newListItem
    }

    #createSpanBtns(deleteItem, editItem, parentDiv, currentListItem) {
        const span = document.createElement('span')
        const trashIcon = document.createElement('i')
        const pencilIcon = document.createElement('i')
    
        trashIcon.classList.add('fa-solid', 'fa-trash-can')
        pencilIcon.classList.add('fa-solid', 'fa-pencil')
    
        deleteItem(trashIcon, this.#id, parentDiv)
    
        editItem(pencilIcon, this.#id, parentDiv, currentListItem, span)
    
        span.append(pencilIcon, trashIcon)
        this.#editIcon = pencilIcon
    
        return span
    }
}
