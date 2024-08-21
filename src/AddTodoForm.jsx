import { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
      id: Date.now(),
    });
    console.log(`${todoTitle} added successfully!`);
    setTodoTitle(``);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input
        name="title"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
