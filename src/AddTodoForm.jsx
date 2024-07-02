const AddTodoForm = () => {
  function handleAddTodo(event) {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const inputValue = input.value;
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input name="title" id="todoTitle"></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
