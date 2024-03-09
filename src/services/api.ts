import Response from "../models/Respone";
import Task from "../models/Task";

export const fetchTasks = async (
  user: string,
  page: number
) : Promise<Response>=> {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tasks?userId=${user}&_page=${page}&_per_page=${process.env.REACT_APP_LIMIT}_sort=priority`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
};

export const fetchTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task number " + id);
  }
  return response.json();
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
};

export const editTask = async (id: string, task: Task): Promise<Task> => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tasks/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to edit task number " + id);
  }
  return response.json();
};

export const patchTask = async (id: string, status: string): Promise<Task> => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tasks/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        status: status,
        updatedAt: Date.now(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to patch task number " + id);
  }
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete task number " + id);
  }
};
