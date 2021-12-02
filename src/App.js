import React from "react";
import TodoList from "./components/Todo/TodoLits";
import "./index.css"
import Context from "./context";

const AddTodo = React.lazy( () => import('./components/AddTodo/AddTodo.js'))

const App = () => {
  const [todos, setTodos] = React.useState([
    {id: 1, completed:false, title: 'Устроиться на стажировку в компанию ООО "Априкод" '},
    {id: 2, completed:true, title: 'Решить тестовое задание! '},
    {id: 3, completed:false, title: 'MobX не знаю, но знаю Redux, так что легко будет выучить на стажировке. Главное жедлание'},
  ])
  const [loading, setLoading] = React.useState(true)

  // useEffect(() => {
  //          setTimeout(() => {
  //           setTodos(todos)
  //           setLoading(false)
  //          }, 2000)
  // }, [])

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
      <React.Suspense fallback={<p>Loading...</p>}>
         <AddTodo onCreate={addTodo}/> 
      </React.Suspense>
      {/* {loading && <Loader />} */}
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
