import React, { useState } from "react";
import NotToDoForm from "./components/NotToDoForm";
import NotToDoList from "./components/NotToDoList";
import NotToDoListHistory from "./components/NotToDoListHistory";
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
      <div>
        <NotToDoListHistory/>
      </div>
      <h1>🚫 Not To Do List</h1>
      <NotToDoForm addItem={addItem} />
      <NotToDoList
        items={items}
        toggleStatus={toggleStatus}
        removeItem={removeItem}
      />
    </div>
  );
}

export default App;