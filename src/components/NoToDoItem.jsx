import React from "react";

function NoToDoItem({ item, toggleStatus, removeItem }) {
  return (
    <li>
      <span style={{ textDecoration: item.avoided ? "line-through" : "none" }}>
        {item.text}
      </span>
      <button onClick={() => toggleStatus(item.id)}>
        {item.avoided ? "Undo" : "Avoided"}
      </button>
      <button onClick={() => removeItem(item.id)}>Delete</button>
    </li>
  );
}

export default NoToDoItem;