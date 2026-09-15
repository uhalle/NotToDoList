import {React,useState,useEffect} from "react";
import { getTasks} from "../api/taskApi.js";

const NotToDoListHistory = ({userId, newTask}) => {

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


  useEffect(() => {

    if (newTask) {
      setNotToDoItems(prevItems => [
        ...prevItems,
        newTask
      ]);
    }

  }, [newTask]);

  
  return(<div>
      <h2>Not-To-Do List</h2>
      <table borderc="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginBottom:"20px"}}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Task</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Priority</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Group Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {notToDoItems?.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.description}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.priority}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.group?.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.createdDate}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>)
  }


export default NotToDoListHistory;