import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

// This gets rendered in the main.jsx file which gets rendered in index.html



function App() {

  // Stateful variable changes with user interaction 
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    setTodos(newTodoList)
  }
  
  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    if (!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])



  return (
    <>
      <>
        {/* React components (note capitalization) */}
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos = {handleAddTodos}/> 
        <TodoList handleEditTodo = {handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
      </>
    </>
  )
}

export default App
