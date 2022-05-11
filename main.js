import { Todo } from './todo'

let todos = []

const createTask = () => {
    const todo = new Todo($('.header__input').val())
    const newTodo = todo.render(strikeOutAndReverse, deleteItem, editItem)

    todos = todos.concat(todo)
    $('.main__list').append(newTodo)
    $('.header__input').val('')
}

const strikeOutAndReverse = ($editIcon, $textNode) => {
    if ($textNode.css('textDecoration').match('line-through')) {
        $textNode.css('textDecoration', 'none')
        $editIcon.css('display', 'inline-block')

        return
    }
    $textNode.css('textDecoration', 'line-through')
    $editIcon.css('display', 'none')
}

const deleteItem = ($trashIcon, id, $parentDiv) => {
    $trashIcon.click(() => {
        $parentDiv.remove()
        todos = todos.filter(element => element.getId() !== id)
    })
}

const editItem = ($pencilIcon, id, $parentDiv, $currentListItem, $span) => {
    $pencilIcon.click(() => {
        $parentDiv.removeClass('list-item')
        $currentListItem.removeClass('list-item__li-tag')
        $parentDiv.addClass('edited-list-item')
        $currentListItem.addClass('edited-list-item__li-tag')

        $span.css('display', 'none')
        changeListItem(id, $parentDiv, $currentListItem, $span)
    })
}

const changeListItem = (id, $parentDiv, $li, $span) => {
    const $editionInput = $('<input>').addClass('edition-input')

    $li.text('').append($editionInput)

    $editionInput.change(editionEvent => {
        $li.text(editionEvent.target.value) 
        todos = todos.map(todo => {
            if (id === todo.getId()) {
                todo.setText($li.text())

                return todo
            }

            return todo
        })
        $parentDiv.removeClass('edited-list-item')
        $li.removeClass('edited-list-item__li-tag')
        $parentDiv.addClass('list-item')
        $li.addClass('list-item__li-tag')
        $span.css('display', 'block')
    })
}

const checkList = () => {
    const currentNodeList = todos.map(todo => todo.getRef())
    const finishedTasksIds = todos
        .filter(todo => todo.getIsDone())
        .map(task => task.getRef())

    return { 
        currentNodeList,
        finishedTasksIds 
    }
}

const onShowAllTodos = () => {
    const { currentNodeList } = checkList()

    currentNodeList.forEach($div => $div.css('display', 'flex'))
}

const onShowDoneTodos = () => {
    const { currentNodeList, finishedTasksIds } = checkList()

    currentNodeList.forEach($div => {
        if (finishedTasksIds.includes($div)) {
            $div.css('display', 'none')
            
            return
        }
        $div.css('display', 'flex')
    })
}

const onShowStrokesTodos = () => {
    const { currentNodeList, finishedTasksIds } = checkList()

    currentNodeList.forEach($div => {
        if (!finishedTasksIds.includes($div)) {
            $div.css('display', 'none')

            return
        }
        $div.css('display', 'flex')
    })
}

$('.header__button').click(createTask)
$('#all').click(onShowAllTodos)
$('#todo').click(onShowDoneTodos)
$('#strokes').click(onShowStrokesTodos)

export {
    todos,
    createTask
}