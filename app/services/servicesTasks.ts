import axios from "axios";
import { Task } from "../types/type";

const API_URL = "http://localhost:3000/api/tasks";

const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
};

const updateTask = async (task: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${API_URL}/${task.id}`, task);
    return response.data;
}

const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
}

export { fetchAllTasks, createTask, updateTask, deleteTask };