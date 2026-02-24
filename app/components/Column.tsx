"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Task, ColumnType, columns } from "../types/type";

interface ColumnProps {
  columnId: ColumnType;
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => Promise<void>;
  onUpdateTask: (task: Task) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

export default function Column({
  columnId,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ColumnProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  const column = columns.find((col) => col.id === columnId)!;
  const paginatedTasks = tasks.slice(0, page * tasksPerPage);
  const hasMore = tasks.length > page * tasksPerPage;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClearColumn = async () => {
    await Promise.all(tasks.map((task) => onDeleteTask(task.id)));
    handleMenuClose();
  };

  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#254632",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: column.color,
            }}
          />
          <Typography variant="h6" component="h2" sx={{ color: "#FFFFFF" }}>
            {column.title} ({tasks.length})
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" onClick={() => setFormOpen(true)} sx={{ color: "#FFFFFF" }}>
            <AddIcon />
          </IconButton>
          <IconButton size="small" onClick={handleMenuClick} sx={{ color: "#FFFFFF" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleClearColumn}>مسح جميع المهام</MenuItem>
      </Menu>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flex: 1,
              minHeight: 200,
              backgroundColor: snapshot.isDraggingOver ? "#e3f2fd" : "transparent",
              transition: "background-color 0.2s ease",
              overflowY: "auto",
              p: 1,
            }}
          >
            {paginatedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {hasMore && (
        <Button
          onClick={() => setPage(page + 1)}
          sx={{ 
            mt: 2,
            bgcolor: "#2ec56a",
            color: "#FFFFFF",
            "&:hover": {
              bgcolor: "#26a558"
            }
          }}
          variant="contained"
          size="small"
          fullWidth
        >
          تحميل المزيد
        </Button>
      )}

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={async (task) => {
          await onAddTask({ ...task, column: columnId });
          setFormOpen(false);
        }}
        columnId={columnId}
      />
    </Paper>
  );
}