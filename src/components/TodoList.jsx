import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

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

TodoList.propTypes = {
  onTodoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
};
