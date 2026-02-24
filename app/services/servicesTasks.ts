import { Task } from "../types/type";
import { localStorageService } from "./localStorageService";

const fetchAllTasks = async (): Promise<Task[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return localStorageService.getTasks();
};

const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return localStorageService.addTask(task);
};

const updateTask = async (task: Task): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return localStorageService.updateTask(task);
};

const deleteTask = async (id: number): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  localStorageService.deleteTask(id);
};

export { fetchAllTasks, createTask, updateTask, deleteTask };