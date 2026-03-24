import React from "react";

const NotToDoListHistory = () => {
  // Sample data for the not-to-do list
  const notToDoItems = [
    { id: 1, task: "Checking social media during work hours", priority: "High" },
    { id: 2, task: "Procrastinating important tasks", priority: "Medium" },
    { id: 3, task: "Skipping daily exercise", priority: "Low" },
    { id: 4, task: "Multitasking excessively", priority: "Medium" },
  ];

  const TableList = ()=>{
  return(<div>
      <h2>Not-To-Do List</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {notToDoItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.task}</td>
              <td>{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)
  }

  return <TableList />
  
};

export default NotToDoListHistory;