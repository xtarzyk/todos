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

    setIsDone(value) {
        this.#isDone = value
    }

    setText(value) {
        this.#text = value
    }

    render(onClick, todos, taskName) {
        const newDiv = document.createElement('div')
        const newListItem = this.#createNewListItem(onClick)
        const newSpan = this.#createSpanBtns(todos)

        newDiv.classList.add('list-item')
        newListItem.classList.add('list-item__li-tag')
        newListItem.textContent = taskName.value
        newDiv.append(newListItem)
        newDiv.append(newSpan)

        return newDiv
    }

    #createNewListItem(onClick) {
        const newListItem = document.createElement('li')

        newListItem.addEventListener('click', event => {
            if (newListItem.textContent !== '') {
                onClick(event, this.#id)
            }
        })

        return newListItem
    }

    #createSpanBtns(todos) {
        const span = document.createElement('span')
        const trashIcon = document.createElement('i')
        const pencilIcon = document.createElement('i')

        trashIcon.classList.add('fa-solid', 'fa-trash-can')
        pencilIcon.classList.add('fa-solid', 'fa-pencil')

        trashIcon.addEventListener('click', event => {
            event.target.parentNode.parentNode.remove()
            todos = todos.filter(element => element.getId() !== this.#id)
        })
        pencilIcon.addEventListener('click', event => {
            const currentDiv = event.target.parentNode.parentNode
            const currentListItem = event.target.parentNode.previousSibling

            currentDiv.classList.remove('list-item')
            currentListItem.classList.remove('list-item__li-tag')
            currentDiv.classList.add('edited-list-item')
            currentListItem.classList.add('edited-list-item__li-tag')

            span.style.display = 'none'
            this.#editListItem(event, todos)
        })
        span.append(pencilIcon, trashIcon)
        return span
    }

    #editListItem(event, todos) {
        const li = event.target.parentNode.previousSibling
        const div = li.parentNode
        const editionInput = document.createElement('input')
        const span = event.target.parentNode

        li.textContent = ''
        editionInput.classList.add('edition-input')
        li.appendChild(editionInput)

        editionInput.addEventListener('change', editionEvent => {
            li.textContent = editionEvent.target.value
            todos = todos.map(todo => {
                if (this.#id === todo.getId()) {
                    // todo.text = li.textContent
                    todo.setText(li.textContent)
                    console.log(todo)
                    return todo
                }
                return todo
            })
            div.classList.remove('edited-list-item')
            li.classList.remove('edited-list-item__li-tag')
            div.classList.add('list-item')
            li.classList.add('list-item__li-tag')
            span.style.display = 'block'
        })
    }
}
