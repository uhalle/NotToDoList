import React from "react";
import NotToDoItem from "./NotToDoItem";

function NotToDoList({ item, toggleStatus, removeItem }) {
  return (
    <ul>
        <NotToDoItem
          key={item.id}
          item={item}
          toggleStatus={toggleStatus}
          removeItem={removeItem}
        />
    </ul>
  );
}

export default NotToDoList;