import { useState } from "react";
import InputWithLabel from "./InputWithLabel.jsx";
import style from "./InputWithLabel.module.css";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const postTodo = async (todo) => {
    if (!todo) {
      const message = `Error has ocurred: Please enter a Todo Item Title.`;
      throw new Error(message);
    }
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
      const formattedData = {
        title: dataResponse.fields.Title,
        id: dataResponse.id,
      };
      return formattedData;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const returnedTodo = await postTodo(todoTitle);
    onAddTodo(returnedTodo);
    setTodoTitle(``);
  };

  return (
    <form onSubmit={handleAddTodo} className={style.InputGroup}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        New Item
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;

//HANDLED EMPTY ENTRY - Was adding an empty item when a blank form was submitted,
// now handled with an if block to return an error in the console.
