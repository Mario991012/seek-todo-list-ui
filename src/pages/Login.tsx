import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/user.service';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);

      if(response.return_code === "0") {
        navigate('/tasks');
      }
    } catch (err: any) {
      setError('Error during login. Please, check credentials.');
    }
  };

  return (
    <Container
      maxWidth={false}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inicio de sesión
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
