import { todos, createTask } from './main'
import $ from 'jquery'
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const body = `
<div class="app">
    <div class="header">
        <div class="header__title">
            <h1>TODO</h1>
            <h2>App</h2>
        </div>
        <div class="header__interface">
            <input class="header__input" type="text" placeholder="Add task...">
            <button class="header__button">Add task</button>
        </div>
    </div>
    <div class="main">
        <h2 class="main__title">Your tasks:</h2>
        <p class="main__filters-title">Show:</p>
        <div class="main__filter-btns">
            <div class="filter-btns__all">
                <input type="radio" name="filter" id="all" checked>
                <label for="all">All</label>
            </div>
            <div class="filter-btns__todo">
                <input type="radio" name="filter" id="todo">
                <label for="todo">TODO</label>
            </div>
            <div class="filter-btns__stroke-out">
                <input type="radio" name="filter" id="strokes">
                <label for="strokes">Stroke Out</label>
            </div>
        </div>
        <ul class="main__list"></ul>
        </div>
        </div>`
        
        describe('todo app', () => {

            beforeEach(() => $('body').append(body))

            afterEach(() => {
                $('body').empty()
                todos.length = 0
            })
            
            describe('createTask', () => {
                test('should value passed and create newTodo', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
                    
                    const $liTag = $('.list-item__li-tag')
                    
                    expect($liTag.text()).toMatch(inputValue)
                    expect($('.main__list').has().children()).toBeTruthy()
                    expect(todos.length).toBe(1)
                    expect($('.header__input').val()).toBe('')
                })
            })
            
            describe('strokeOutAndReverse', () => {
                test('should strokes text and vanish edit icon', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
                    
                    const $liTag = $('.list-item__li-tag')
                    
                    $liTag.click()
                    
                    expect($liTag.css('text-decoration')).toMatch('line-through')
                    expect($('.pencil').css('display')).toMatch('none')
                })
            })

            describe('deleteItem', () => {
                test('should remove item from DOM and array', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
            
                    const $trashIcon = $('.trash')
                   
                    $trashIcon.click()
                    
                    expect($('.main__list').children().length).toBe(0)
                    expect(todos.length).toBe(0)
                })
            })

            describe('editItem', () => {
                test('should edit item text', () => {
                    const inputValue = 'inputValue'
                    const newValue = 'newValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()

                    $('.pencil').trigger('click')
                    $('.edition-input').val(newValue)
                    $('.edition-input').trigger('change')

                    expect($('.list-item__li-tag').text()).toMatch(newValue)
                })
            })

            describe('filtering items', () => {
                test('should show all todos', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
                    
                    const $liTag = $('.list-item__li-tag')
                    
                    $liTag.click()
                    $('all').click()

                    expect($('.list-item').is(':hidden')).toBeTruthy()
                })

                test('should show only active todos', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
                    
                    const $liTag = $('.list-item__li-tag')
    
                    $liTag.click()
                    $('#todo').click()

                    expect($('.list-item').is(':visible')).toBe(false)
                })

                test('should show only strokes todos', () => {
                    const inputValue = 'inputValue'
                    
                    $('.header__input').val(inputValue)
                    createTask()
                    
                    const $liTag = $('.list-item__li-tag')
                    $liTag.click()
                    console.log($liTag)
                    $('#strokes').trigger('click')

                    expect($('.list-item').is(':visible')).toBe(false)
                })
            })
            
        })