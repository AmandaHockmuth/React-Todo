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

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")),
            },
          });
        } catch (error) {
          reject(error);
        }
      }, 2000);
    })
      .then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
