import React, { useState } from "react";
import NotToDoListHistory from "./NotToDoListHistory";

function NotToDoForm({ addTask }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [gdescription, setGDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    addTask({description,priority}); 
    setDescription(" ");
    setPriority("Low")
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ToDo List</h2>
     <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
       <select value={priority} onChange={e => setPriority(e.target.value)}>
         <option value="LOW">LOW</option>
         <option value="MEDIUM">MEDIUM</option>
         <option value="HIGH">HIGH</option>
       </select>
       <input
        type="text"
        placeholder="Group name"
        value={gdescription}
        onChange={e => setGDescription(e.target.value)}
      />
        <button type="submit">Add Task</button>      
       </form>
      {
      /* <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px"
              }}
            >
              {task.description} ({task.priority})
            </span>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default NotToDoForm;