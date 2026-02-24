import { create } from "zustand";
import { Task } from "../types/type";

interface TaskStore {
    searchKey:string;
    setSearchKey:(key:string)=>void;
    selectTask:Task |null;
    setSelectedTask:(task:Task | null) =>void;
    isFormOpen:boolean;
    setIsFormOpen:(isOpen:boolean)=>void
}

const useTaskStore = create<TaskStore>((set)=>({
    searchKey:"",
    setSearchKey:(key)=>set({searchKey:key}),
    selectTask:null,
    setSelectedTask:(task)=>set({selectTask:task}),
    isFormOpen:false,
    setIsFormOpen:(isOpen)=>set({isFormOpen:isOpen})
}))

export default useTaskStore;