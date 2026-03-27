import React, { useState } from "react";
import NotToDoForm from "./components/NotToDoForm";
import NotToDoList from "./components/NotToDoList";
import NotToDoListHistory from "./components/NotToDoListHistory";
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi.js";

function App() {
  const [tasks, getTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");

  //  // Load tasks on mount
  // useEffect(() => {
  //   getTasks.then(setTasks);
  // }, []);

  const addTask = ({description, priority}) => {
    const task = {}
    createTask({ description, priority})
      .then(newTask => {
        setDescription(newTask.description);
        setPriority(newTask.priority);
      });
  };

  const removeTask = (id) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };
  
  return (
    <div>
      <div>
        <NotToDoListHistory/>
      </div>
      <h1>🚫 Not To Do List</h1>
      <NotToDoForm addTask={addTask} />
      {/* <NotToDoList
        tasks={tasks}
        removeTask={removeTask}
      /> */}
    </div>
  );
}

export default App;