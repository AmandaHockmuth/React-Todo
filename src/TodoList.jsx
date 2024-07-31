import TodoListItem from "./TodoListItem";

export default function TodoList({ onTodoList, onRemoveTodo }) {
  return (
    <ul>
      {onTodoList.map((item) => (
        <TodoListItem
          key={item.id}
          id={item.id}
          title={item.title}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}
