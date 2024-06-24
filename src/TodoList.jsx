const todoList = [
  { id: 1, title: "Finish Studying" },
  { id: 2, title: "Complete Homework" },
  { id: 3, title: "Complete Mindset Assignment" },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map(function (item) {
        return (
          <li key={item.id}>
            <span>{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
