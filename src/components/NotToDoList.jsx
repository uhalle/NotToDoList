import React from "react";
import NotToDoItem from "./NotToDoItem";

function NotToDoList({ items, toggleStatus, removeItem }) {
  return (
    <ul>
      {items.map((item) => (
        <NotToDoItem
          key={item.id}
          item={item}
          toggleStatus={toggleStatus}
          removeItem={removeItem}
        />
      ))}
    </ul>
  );
}

export default NotToDoList;