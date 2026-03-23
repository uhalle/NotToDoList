import React, { useState } from "react";
import NoToDoForm from "./components/NoToDoForm";
import NoToDoList from "./components/NoToDoList";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (text) => {
    setItems([...items, { id: Date.now(), text, avoided: false }]);
  };

  const toggleStatus = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, avoided: !item.avoided } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>🚫 Not To Do List</h1>
      <NoToDoForm addItem={addItem} />
      <NoToDoList
        items={items}
        toggleStatus={toggleStatus}
        removeItem={removeItem}
      />
    </div>
  );
}

export default App;