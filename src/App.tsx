import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import Tasks from './pages/Tasks';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div style={{ width: '100%', height: '100%' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
