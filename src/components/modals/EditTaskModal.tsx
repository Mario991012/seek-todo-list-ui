import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: any;
  onSave: (id: string, title: string, description: string, completed: boolean) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
  }, [task]);

  const handleSubmit = () => {
    if (!title || !description) {
      setError('All fields are required');
      return;
    }
    onSave(task.id, title, description, completed);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          p: 4, 
          boxShadow: 24, 
          borderRadius: 2
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Editar tarea
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          fullWidth
          label="Título"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Descripción"
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado</InputLabel>
          <Select
            value={completed.toString()}
            onChange={(e) => setCompleted(e.target.value === 'true')}
            label="Estado"
          >
            <MenuItem value="false">Por hacer</MenuItem>
            <MenuItem value="true">Completada</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
