const BASE_URL = "http://localhost:8080/tasks";

// Fetch all tasks
export async function getTasks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// Create a new task
export async function createTask({description, priority, userId}) {
  const user = {id : userId};
  const group = {id : 1};
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({description, priority, user, group})
  });
  return res.json();
}

// Update a task
export async function updateTask(id, updatedTask) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
}

// Delete a task
export async function deleteTask(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}