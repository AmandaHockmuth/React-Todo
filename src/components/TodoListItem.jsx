import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

export default function TodoListItem({ title, id, onRemoveTodo }) {
  const handleRemoveTodo = () => {
    onRemoveTodo(id);
    console.log(`${title} removed successfully`);
  };
  return (
    <li className={style.ListItem}>
      {title}
      <button
        type="button"
        className={style.CompleteButton}
        onClick={handleRemoveTodo}
      >
        ✔ Complete?
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  onRemoveTodo: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
};
