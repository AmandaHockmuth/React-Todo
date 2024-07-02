import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Finish Studying" },
  { id: 2, title: "Complete Homework" },
  { id: 3, title: "Complete Mindset Assignment" },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map(function (todo) {
        return <TodoListItem key={todo.id} title={todo.title} />;
      })}
    </ul>
  );
};

export default TodoList;
