// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
const todoList = [
  { id: 1, title: "Finish Studying" },
  { id: 2, title: "Complete Homework" },
  { id: 3, title: "Complete Mindset Assignment" },
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
