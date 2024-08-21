export default function TodoListItem({ title, id, onRemoveTodo }) {
  const handleRemoveTodo = () => {
    onRemoveTodo(id);
    console.log(`${title} removed successfully`);
  };
  return (
    <li>
      {title}
      <button type="button" onClick={handleRemoveTodo}>
        Remove
      </button>
    </li>
  );
}
