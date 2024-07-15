import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  return (
    <ul>
      {props.onTodoList.map(function ({ id, title }) {
        return <TodoListItem key={id} title={title} />;
      })}
    </ul>
  );
};

export default TodoList;
