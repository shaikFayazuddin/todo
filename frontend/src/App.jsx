import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import TodosList from "./components/TodoList"
import axios from "axios"

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://todo-xg2n.onrender.com/todo")
      .then((response) => setTodos(response.data.todos))
      .catch(() => {
        alert("Error loading Todos");
      });
  },[]);

  console.log(todos)
  return (
    <div>
      <CreateTodo></CreateTodo>
      <TodosList todos={todos}></TodosList>
    </div>
  )
}

export default App;
