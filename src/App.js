import React, {useEffect} from "react";
import TodoList from "./components/Todo/TodoLits";
import "./index.css"
import Context from "./context";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

const AddTodo = React.lazy( () => import('./components/AddTodo/AddTodo.js'))

const App = () => {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
         .then(response => response.json())
         .then(todos => {
           setTimeout(() => {
            setTodos(todos)
            setLoading(false)
           }, 2000)
         })
  }, [])

  const toggleTodo = (id) => {
    setTodos(
    todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    )
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTodo = (title) => {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return(
    <Context.Provider value={{removeTodo}}>
    <div className="wrapper">
      <h1>Расписание на день</h1>
      <Modal/> 
      <React.Suspense fallback={<p>Loading...</p>}>
         <AddTodo onCreate={addTodo}/> 
      </React.Suspense>
      {loading && <Loader />}
      {todos.length ? ( 
      <TodoList todos={todos} onToggle={toggleTodo} /> 
      ):(
        loading 
        ? null
        :<p>На сегодня у вас нет дел!</p>
      )}
    </div>
    </Context.Provider>
  )
}

export default App;
