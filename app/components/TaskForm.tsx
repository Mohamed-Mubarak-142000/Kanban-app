"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Task, ColumnType } from "../types/type";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => Promise<unknown>;
  initialData?: Task | null;
  columnId?: ColumnType;
}

export default function TaskForm({
  open,
  onClose,
  onSubmit,
  initialData,
  columnId,
}: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    column: columnId || "BackLog",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        column: initialData.column,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        column: columnId || "BackLog",
      });
    }
  }, [initialData, columnId, open]);

  const handleSubmit = async () => {
    if (formData.title.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        onClose();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#254632",
          color: "#FFFFFF"
        }
      }}
    >
      <DialogTitle sx={{ color: "#FFFFFF" }}>{initialData ? "تعديل المهمة" : "إضافة مهمة جديدة"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="العنوان"
          fullWidth
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          sx={{ 
            mb: 2, 
            mt: 1,
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
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
        <Button onClick={onClose} sx={{ color: "#FFFFFF" }} disabled={isSubmitting}>إلغاء</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={isSubmitting || !formData.title.trim()}
          sx={{
            bgcolor: "#2ec56a",
            color: "#FFFFFF",
            "&:hover": {
              bgcolor: "#26a558"
            },
            "&.Mui-disabled": {
              bgcolor: "#1a5a3a",
              color: "#6B7C6F"
            }
          }}
        >
          {isSubmitting ? "جاري الحفظ..." : (initialData ? "حفظ" : "إضافة")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}