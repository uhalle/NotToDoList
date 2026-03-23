import React from "react";
import NoToDoItem from "./NoToDoItem";

function NoToDoList({ items, toggleStatus, removeItem }) {
  return (
    <ul>
      {items.map((item) => (
        <NoToDoItem
          key={item.id}
          item={item}
          toggleStatus={toggleStatus}
          removeItem={removeItem}
        />
      ))}
    </ul>
  );
}

export default NoToDoList;