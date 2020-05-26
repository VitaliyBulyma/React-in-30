import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input className="ml-4"  type="checkbox" checked = {todo.complete} onChange =
                {handleTodoClick}/>
                {todo.name}
            </label>
            
        </div>
    )
}
