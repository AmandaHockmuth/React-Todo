import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState(
    //  ||
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const todos = data.records.map((todo) => {
        const newTodo = {
          title: todo.fields.Title,
          id: todo.id,
        };
        return newTodo;
      });
      console.log(todos);
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const removeTodo = (id) => {
    const filteredList = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(filteredList);
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
      {isLoading ? (
        <p>{"Loading..."}</p>
      ) : (
        <TodoList onTodoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;


// Attempted Stretch Goal in AddTodoForm