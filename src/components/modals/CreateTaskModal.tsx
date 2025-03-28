import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      setError('All fields are required');
      return;
    }

    onCreate(title, description);
    setTitle('');
    setDescription('');
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
          Crear nueva tarea
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

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
