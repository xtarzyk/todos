import { v4 as uuidv4 } from 'uuid'

export class Todo {
    #id
    #isDone
    #text

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

    render(onClick, createSpanBtns) {
        const newDiv = document.createElement('div')
        const newListItem = this.#createNewListItem(onClick)
        const newSpan = createSpanBtns(this.#id)

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
                onClick(event, this.#id)
                this.toggleIsDone()
            }
        })

        return newListItem
    }

}
