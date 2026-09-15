const API_BASE_URL = "http://localhost:8080";

const TASKS_URL = `${API_BASE_URL}/tasks/byUserAndGroup`;
const BASE_URL = `${API_BASE_URL}/tasks`;
const GROUPS_URL = `${API_BASE_URL}/tasks/groups`;

// Fetch all tasks
export async function getTasks(userId) {
  const TASKS_FINAL_URL = `${BASE_URL}/${userId}`;
  const res = await fetch(TASKS_FINAL_URL);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch tasks: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}

export async function getGroups(userId) {
  const GROUPS_FINAL_URL = `${GROUPS_URL}/${userId}`;
  const res = await fetch(GROUPS_FINAL_URL);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch tasks: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}

// Create a new task
export async function createTask({description, priority, userId, gdescription,selectedGroup }) {
  const user = {id : userId};
  const group = gdescription ? {name : gdescription} : {name:selectedGroup}
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({description, priority, user, group})
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch tasks: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
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