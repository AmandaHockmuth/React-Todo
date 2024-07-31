import React from "react";

const InputWithLabel = (props) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      <input
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
