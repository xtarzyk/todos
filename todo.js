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
        const $newDiv = $('<div>').addClass('list-item').attr('todo-id', this.#id)
        const $newListItem = $(this.#createNewListItem(onClick)).addClass('list-item__li-tag').text(this.#text)
        const newSpan = this.#createSpanBtns(deleteItem, editItem, $newDiv, $newListItem)

        $newDiv.append($newListItem, newSpan)
        this.#ref = $newDiv

        return $newDiv
    }

    #createNewListItem(onClick) {
        const $newListItem = $('<li>').click(() => {
            if ($newListItem.text() !== '') {
                onClick(this.#editIcon, $newListItem)
                this.toggleIsDone()
            }
        })

        return $newListItem
    }

    #createSpanBtns(deleteItem, editItem, $parentDiv, $currentListItem) {
        const $span = $('<span>').addClass('span-btns')
        const $trashIcon = $('<img>').addClass('trash').attr('background', "url('icons/trash.png')")
        const $pencilIcon = $('<img>').addClass('pencil').attr('background', "url('icons/pencil.png')")
    
        $span.append($pencilIcon, $trashIcon)
        deleteItem($trashIcon, this.#id, $parentDiv)
        editItem($pencilIcon, this.#id, $parentDiv, $currentListItem, $span)
        this.#editIcon = $pencilIcon
    
        return $span
    }
}
