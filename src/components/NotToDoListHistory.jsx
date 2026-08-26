import {React,useState,useEffect} from "react";
import { getTasks} from "../api/taskApi.js";

const NotToDoListHistory = ({description, priority, userId}) => {

  const [notToDoItems, setNotToDoItems] = useState([]);
  // Sample data for the not-to-do list
  useEffect(() => {
    getTasks(userId)
      .then(data => {
        setNotToDoItems(data);     
       })
      .catch(err1 => {
        console.error("Error fetching tasks:", err1);
      });
  }, [userId]); // empty dependency array = run once on mount

  
  return(<div>
      <h2>Not-To-Do List</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginBottom:"20px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Group Name</th>
          </tr>
        </thead>
        <tbody>
          {notToDoItems?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.priority}</td>
              <td>{item.group?.name}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>)
  }


export default NotToDoListHistory;