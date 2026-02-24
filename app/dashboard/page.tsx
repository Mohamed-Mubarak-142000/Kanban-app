/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Grid from '@mui/material/Grid';

import { useState, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Fab,
  AppBar,
  Toolbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import SearchBar from "../components/SearchBar";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import useTaskStore from "../store/useTaskStore";
import { columns, ColumnType } from "../types/type";

export default function Dashboard() {
  const [formOpen, setFormOpen] = useState(false);
  const { addTask, allTasks, editTask, removeTask } = useTasks();
  const { searchKey, setSelectedTask } = useTaskStore();

  const isLoading = addTask.isPending || editTask.isPending || removeTask.isPending;



  const filteredTasks = useMemo(() => {
    return allTasks?.data?.filter(
      (task) =>
        task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        task.description.toLowerCase().includes(searchKey.toLowerCase()),
    );
  }, [allTasks, searchKey]);

  const tasksByColumn = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc[column.id] = filteredTasks?.filter(
          (task) => task.column === column.id,
        );
        return acc;
      },
      {} as Record<ColumnType, typeof allTasks.data>,
    );
  }, [filteredTasks, allTasks]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const task = allTasks?.data?.find((t) => t.id.toString() === draggableId);
      if (task) {
        editTask.mutateAsync({
          ...task,
          column: destination.droppableId as ColumnType,
        });
      }
    }
  };

  if (allTasks?.isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: "#0b1610" }}
      >
        <Typography sx={{ color: "#FFFFFF" }}>جاري التحميل...</Typography>
      </Box>
    );
  }

  if (allTasks?.isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: "#0b1610" }}
      >
        <Typography sx={{ color: "#2ec56a" }}>حدث خطأ: {allTasks.error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#0b1610", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#254632" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFFFFF" }}>
            لوحة كانبان للمهام
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <SearchBar
          onSearch={(key) => {
            setSelectedTask(null);
            useTaskStore.setState({ searchKey: key });
          }}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={2}>
            {columns.map((column, index) => {
            
              return (
                <Grid size={{ xs: 6, md: 3 }} key={`column-${index}`}>
                  <Column
                    columnId={column.id}
                    tasks={tasksByColumn[column.id] || []}
                    onAddTask={addTask.mutateAsync}
                    onUpdateTask={editTask.mutateAsync}
                    onDeleteTask={removeTask.mutateAsync}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DragDropContext>

        <Fab
          aria-label="add"
          sx={{ 
            position: "fixed", 
            bottom: 16, 
            right: 16,
            bgcolor: "#2ec56a",
            color: "#FFFFFF",
            "&:hover": {
              bgcolor: "#26a558"
            }
          }}
          onClick={() => {
            setSelectedTask(null);
            setFormOpen(true);
          }}
        >
          <AddIcon />
        </Fab>

        <TaskForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={addTask.mutateAsync}
        />
      </Container>

      <Backdrop
        sx={{ 
          color: '#2ec56a', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'rgba(11, 22, 16, 0.8)'
        }}
        open={isLoading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography sx={{ mt: 2, color: '#FFFFFF' }}>جاري المعالجة...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
