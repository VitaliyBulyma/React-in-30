// https://www.youtube.com/watch?v=hQAHSlTtcmY
import React, { useState, useRef, useEffect, Component } from 'react';
import TodoList from './TodoList';
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
     setTodos(prevTodos =>{
       return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
     })
     todoNameRef.current.value =null
     
  }

    function handleClearTodos(){
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }
  return (
    <>
      <TodoList  todos={todos} toggleTodo ={toggleTodo} />
      <div className="form-group ml-4">
      <input className="mt-4" ref={todoNameRef} type="text" /><br/>
      <button className="btn btn-primary mt-2"  onClick = {handleAddTodo}>Add Todo</button>
      <button className="btn btn-danger mt-2 ml-2" onClick = {handleClearTodos}>Clear Completed </button>
      <div>{todos.filter(todo => !todo.complete).length} Left todo</div>
      </div>
    </>
   )
}

export default App;
