
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchAllTasks, updateTask } from "../services/servicesTasks";

export const useTasks = () => {
    const queryKey = useQueryClient();

    const allTasks = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchAllTasks,
    })

    const addTask = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryKey.invalidateQueries({queryKey:["tasks"]})
        }
    })

    const editTask = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryKey.invalidateQueries({queryKey:["tasks"]})
        }
    })

    const removeTask = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryKey.invalidateQueries({queryKey:["tasks"]})
        }
    })

    return {
        allTasks,
        addTask,
        editTask,
        removeTask
    }

}