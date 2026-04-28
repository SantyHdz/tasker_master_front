const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  priority_id?: number;
  due_date?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority_id?: number;
  due_date?: string;
  is_completed: boolean;
  created_at?: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Registro fallido" }));
    throw new Error(error.detail || "Registro fallido");
  }
  return res.json();
}

export async function getTasks(token: string): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(token: string, task: TaskInput): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function toggleTask(token: string, id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}

export async function updateTask(
  token: string,
  id: string,
  data: Partial<TaskInput & { is_completed: boolean }>
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete task");
}