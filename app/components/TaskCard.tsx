import { Task } from "../types/type";
import {  Draggable } from '@hello-pangea/dnd';import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";


interface TaskCardProps {
  task:     Task;
  index: number;
  onUpdate: (task: Task) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskCard({ task, index, onUpdate, onDelete }: TaskCardProps) {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const [editedTask, setEditedTask] = useState<Task>(task);

      const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleEdit = () => {
        setEditDialogOpen(true);
        handleMenuClose();
      };

      const handleDelete = async () => {
        await onDelete(task.id);
        handleMenuClose();
      };

      const handleSaveEdit = async () => {
        await onUpdate(editedTask);
        setEditDialogOpen(false);
      };

      return (
        <Draggable draggableId={task.id.toString()} index={index}>
          {(provided, snapshot) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
          sx={{
            mb: 2,
            backgroundColor: snapshot.isDragging ? "#1a3624" : "#254632",
            boxShadow: snapshot.isDragging ? 3 : 1,
            "&:hover": {
              boxShadow: 3,
            },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h3" sx={{ color: "#FFFFFF" }}>
                {task.title}
              </Typography>
              <IconButton size="small" onClick={handleMenuClick} sx={{ color: "#FFFFFF" }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: "#B0C4A0" }}>
              {task.description}
            </Typography>
          </CardContent>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleEdit}>
              <EditIcon fontSize="small" sx={{ ml: 1 }} /> تعديل
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteIcon fontSize="small" sx={{ ml: 1 }} /> حذف
            </MenuItem>
          </Menu>

          <Dialog 
            open={editDialogOpen} 
            onClose={() => setEditDialogOpen(false)}
            PaperProps={{
              sx: {
                bgcolor: "#254632",
                color: "#FFFFFF"
              }
            }}
          >
            <DialogTitle sx={{ color: "#FFFFFF" }}>تعديل المهمة</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="العنوان"
                fullWidth
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                sx={{ 
                  mb: 2,
                  '& .MuiInputBase-input': { color: '#FFFFFF' },
                  '& .MuiInputLabel-root': { color: '#B0C4A0' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#B0C4A0' },
                    '&:hover fieldset': { borderColor: '#2ec56a' },
                    '&.Mui-focused fieldset': { borderColor: '#2ec56a' }
                  }
                }}
              />
              <TextField
                margin="dense"
                label="الوصف"
                fullWidth
                multiline
                rows={3}
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                sx={{ 
                  '& .MuiInputBase-input': { color: '#FFFFFF' },
                  '& .MuiInputLabel-root': { color: '#B0C4A0' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#B0C4A0' },
                    '&:hover fieldset': { borderColor: '#2ec56a' },
                    '&.Mui-focused fieldset': { borderColor: '#2ec56a' }
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)} sx={{ color: "#FFFFFF" }}>إلغاء</Button>
              <Button 
                onClick={handleSaveEdit} 
                variant="contained"
                sx={{
                  bgcolor: "#2ec56a",
                  color: "#FFFFFF",
                  "&:hover": {
                    bgcolor: "#26a558"
                  }
                }}
              >
                حفظ
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </Draggable>
    );
}