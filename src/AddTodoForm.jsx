const AddTodoForm = (props) => {
  function handleAddTodo(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const todoTitle = input.value;
    console.log(todoTitle);
    props.onAddTodo(todoTitle);
    form.reset();
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
