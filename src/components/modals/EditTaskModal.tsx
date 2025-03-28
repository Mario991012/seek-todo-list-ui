import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TASK_STATUS } from '../../common/enums/task';

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: any;
  onSave: (_id: string, title: string, description: string, status: TASK_STATUS) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TASK_STATUS>(task.status || TASK_STATUS.PENDING);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status || TASK_STATUS.PENDING);
  }, [task]);

  const handleSubmit = () => {
    if (!title || !description) {
      setError('All fields are required');
      return;
    }
    onSave(task._id, title, description, status);
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
            value={status}
            onChange={(e) => setStatus(e.target.value as TASK_STATUS)}
            label="Estado"
          >
            {Object.values(TASK_STATUS).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
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
