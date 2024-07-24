import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useState, useEffect } from "react";

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
      <TodoList onTodoList={todoList} />
    </>
  );
}

export default App;
