import React, { useEffect, useState } from "react";
import NotToDoListHistory from "./NotToDoListHistory";
import { getGroups, getTasks } from "../api/taskApi";

function NotToDoForm({ addTask, userId }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [gdescription, setGDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(()=>{
   getGroups(userId).then((data)=>{
      setGroups(data);
   }).catch((err)=>{
        console.error("Error fetching groups:", err);
   })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    addTask({description,priority,gdescription,selectedGroup}); 
    setDescription(" ");
    setPriority("Low")
  };

  return (
  <div style={{ display : "flex", justifyContent : "center", minHeight : "100vh", margin : "100 px"}}>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <select value = {selectedGroup} 
      onChange={e => setSelectedGroup(e.target.value)} 
      style={{ padding: "8px", width: "100%" }}>
        {groups.map(group => (
          <option key={group.id}>{group.name || group}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter if new group"
        value={gdescription}
        onChange={e => setGDescription(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      />

      <button type="submit" style={{ padding: "10px", width: "100%" }}>
        Add Task
      </button>
    </form>
  </div>
  );
  }

export default NotToDoForm;