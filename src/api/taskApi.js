const TASKS_URL = "http://localhost:8080/tasks/byUserAndGroup";
const BASE_URL = "http://localhost:8080/tasks";
const GROUPS_URL = "http://localhost:8080/groups";

// Fetch all tasks
export async function getTasks(userId) {
  const TASKS_FINAL_URL = `${TASKS_URL}/${userId}/${1}`;
  const res = await fetch(TASKS_FINAL_URL);
  return res.json();
}

export async function getGroups(userId) {
  const GROUPS_FINAL_URL = `${GROUPS_URL}/${userId}`;
  const res = await fetch(GROUPS_FINAL_URL);
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