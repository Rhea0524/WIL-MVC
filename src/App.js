// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import StartProject from './pages/StartProject';
import Completed from './pages/Completed';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import EmailSent from './pages/EmailSent';
import Login from './pages/Login';
import Register from './pages/Register';

// Theme
const theme = createTheme({
  palette: { primary: { main: '#4CAF50' } },
});

// Navigation
const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleStartProjectClick = () => {
    if (!user) {
      // Show alert and redirect to login
      alert('Please log in to start a project');
      navigate('/login');
    } else {
      navigate('/start-project');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Xamu
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={handleStartProjectClick}>
            Start Project
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>

          {user ? (
            <>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                Welcome, {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route 
              path="/start-project" 
              element={
                <PrivateRoute>
                  <StartProject />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/completed" 
              element={
                <PrivateRoute>
                  <Completed />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;