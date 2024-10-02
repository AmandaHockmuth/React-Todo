import "./App.css";
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // const ascSort = "?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc"
    // const desSort = "?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=desc"

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }/?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
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

      console.log("todos: ", todos);

      // SORTING
      const sortedTodos = todos.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        } else if (a.title > b.title) {
          return -1;
        } else {
          return 0;
        }
      });
      //

      setTodoList(sortedTodos);
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

  const deleteTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    const options = {
      method: "DELETE",
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

      console.log("Todo deleted from Airtable successfully!");
    } catch (error) {
      console.error("Error deleting todo from Airtable:", error.message);
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todoItem) => todoItem.id !== id)
    );
    fetchData();
  };

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List:</h1>
              <p>{}</p>
              {isLoading ? (
                <p>{"Loading..."}</p>
              ) : (
                <div className="TodoContainer">
                  <TodoList onTodoList={todoList} onRemoveTodo={removeTodo} />
                  <AddTodoForm onAddTodo={addTodo} />
                </div>
              )}
            </>
          }
        ></Route>
        <Route path="/new" element={<h1>New Todo List:</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
