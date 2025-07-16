import axios from "axios";
import { useState } from "react";

function CreateTodo() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Todo"
        onChange={(e) => setTodoTitle(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Todo Description"
        onChange={(e) => setTodoDescription(e.target.value)}
      />

      <br />

      <button
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/todo",
              {
                todo: todoTitle,
                description: todoDescription,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => alert("Todo added"));
        }}
      >
        Submit
      </button>

      <br />
      
    </div>
  );
}

export default CreateTodo;
