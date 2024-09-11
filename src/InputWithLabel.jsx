import React from "react";
import style from "./InputWithLabel.module.css";

const InputWithLabel = (props) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        type="text"
        className={style.Input}
        name="title"
        id={props.id}
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        ref={inputRef}
      ></input>
    </>
  );
};

export default InputWithLabel;
