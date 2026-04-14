import { useState } from "react";
import NotToDoForm from "./components/NotToDoForm";
import NotToDoListHistory from "./components/NotToDoListHistory";
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi.js";
import Login from "./components/Login.jsx";
import SignupPage from "./components/Signup.jsx";

function App() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [user, setUser] = useState(null);
  //  // Load tasks on mount
  // useEffect(() => {
  //   getTasks.then(setTasks);
  // }, []);

  const handleLogin = (userData) => {
    setUser(userData); // set user info after successful login
  };

  const addTask = ({description, priority}) => {
    const task = {}
    const userId = user.userId;
    createTask({ description, priority, userId})
      .then(newTask => {
        setDescription(newTask.description);
        setPriority(newTask.priority);
      });
  };

   const getTask = () => {
    const task = {}
    getTasks()
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
      {!user ? ( <div><Login onLogin={handleLogin}/> <SignupPage/> </div>) :
      (<div>
        <NotToDoListHistory description={description} priority={priority} userId={user.userId}/>
      <h1>🚫 Not To Do List</h1>
      <NotToDoForm addTask={addTask}/>
      </div>)}      
    </div>);
}

export default App;