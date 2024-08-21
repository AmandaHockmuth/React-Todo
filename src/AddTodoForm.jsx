import { useState } from "react";
import InputWithLabel from "./InputWithLabel.jsx";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          Title: todo,
        },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/Default`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const message = `Error has ocurred:${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(
      postTodo(todoTitle)
    );
    setTodoTitle(``);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;

// Stretch Goal: sends to Airtable but only shows an additional blank item until the page is refreshed
// possible issue within TodoList.jsx?