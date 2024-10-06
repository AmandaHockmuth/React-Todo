import "./App.css";
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortState, setSortState] = useState(0); // 0: Chronological Descending 1: Title Ascending, 2: Title Descending, 3: Chronological Ascending

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/?view=Grid%20view&sort`;
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
          createdTime: todo.createdTime,
        };
        return newTodo;
      });

      const sortedTodos = handleSortTodos(todos);
      console.log("sortedTodos: ", sortedTodos);

      setTodoList(sortedTodos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SORTING
  const handleSortTodos = (todos) => {
    return todos.sort((a, b) => {
      if (sortState === 0) {
        // Chronologically Descending
        return new Date(b.createdTime) - new Date(a.createdTime);
      } else if (sortState === 1) {
        // Alphabetically Ascending
        return a.title.localeCompare(b.title);
      } else if (sortState === 2) {
        // Alphabetically Descending
        return b.title.localeCompare(a.title);
      } else {
        // Chronologically Ascending
        return new Date(a.createdTime) - new Date(b.createdTime);
      }
    });
  };

  const handleToggle = () => {
    setSortState((sortState) => (sortState + 1) % 4);
  };

  useEffect(() => {
    setTodoList((prevTodoList) => handleSortTodos(prevTodoList.slice()));
  }, [sortState]);
  //

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
                  <button onClick={handleToggle}>
                    {sortState === 0
                      ? "Sort A-Z"
                      : sortState === 1
                      ? "Sort Z-A"
                      : sortState === 2
                      ? "Sort Oldest"
                      : "Sort Newest"}
                  </button>
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
