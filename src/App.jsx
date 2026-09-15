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
  const [group,setGroup] = useState(null);
  const [task,setTask] = useState(null);
  //  // Load tasks on mount
  // useEffect(() => {
  //   getTasks.then(setTasks);
  // }, []);

  const handleLogin = (userData) => {
    setUser(userData); // set user info after successful login
  };

  const addTask = ({description, priority, gdescription,selectedGroup}) => {
    const userId = user.userId;
    createTask({ description, priority, userId,gdescription,selectedGroup})
      .then(newTask => {  
        setTask(newTask);
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

  // const onTaskNewlyAdded = (task) => {
  //   setTask(task);
  // };
  
  return (
    <div className="app-container">
  {!user ? (
    <div className="auth-container">
      <Login onLogin={handleLogin} />
      <SignupPage />
    </div>
  ) : (
    <div className="dashboard-container">
      <NotToDoListHistory
        userId={user.userId}
        newTask = {task}
      />

      <h2 className="not-todo-title" >🚫 Add Not ToDo</h2>

      <NotToDoForm
        addTask={addTask}
        userId={user.userId}
      />
    </div>
  )}
</div>);
}

export default App;