import { v4 as uuidv4 } from 'uuid'

export class Todo {
    #id
    #isDone
    #text

    constructor() {
        this.#id = uuidv4()
        this.#isDone = false
        this.#text = ''
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

    getText() {
        return this.#text
    }

    setText(value) {
        this.#text = value
    }
}
