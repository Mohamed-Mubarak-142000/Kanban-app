import { Task } from "../types/type";

const STORAGE_KEY = "kanban_tasks";

// Initial data
const initialTasks: Task[] = [
  {
    id: 1,
    title: "تصميم الصفحة الرئيسية",
    description: "تصميم الصفحة الرئيسية مع 4 أعمدة",
    column: "BackLog",
  },
  {
    id: 2,
    title: "إضافة drag and drop",
    description: "تنفيذ خاصية السحب والإفلات",
    column: "InProgress",
  },
  {
    id: 3,
    title: "مراجعة الكود",
    description: "مراجعة الكود وإجراء التحسينات",
    column: "Review",
  },
  {
    id: 4,
    title: "اختبار التطبيق",
    description: "اختبار جميع وظائف التطبيق",
    column: "Done",
  },
];

export const localStorageService = {
  getTasks: (): Task[] => {
    if (typeof window === "undefined") return initialTasks;
    
    try {
      const tasks = localStorage.getItem(STORAGE_KEY);
      if (!tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
        return initialTasks;
      }
      return JSON.parse(tasks);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialTasks;
    }
  },

  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  addTask: (task: Omit<Task, "id">): Task => {
    const tasks = localStorageService.getTasks();
    const newTask = {
      ...task,
      id: Date.now(),
    };
    tasks.push(newTask);
    localStorageService.saveTasks(tasks);
    return newTask;
  },

  updateTask: (updatedTask: Task): Task => {
    const tasks = localStorageService.getTasks();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorageService.saveTasks(tasks);
    }
    return updatedTask;
  },

  deleteTask: (id: number): void => {
    const tasks = localStorageService.getTasks();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    localStorageService.saveTasks(filteredTasks);
  },
};
