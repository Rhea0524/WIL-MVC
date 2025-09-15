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
import AdminDashboard from './pages/AdminDashboard';

// Theme
const theme = createTheme({
  palette: { primary: { main: '#4CAF50' } },
});

// Navigation
const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

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
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #2c5530 0%, #4a7c59 50%, #6b8e6b 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 32px rgba(44, 85, 48, 0.15)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212, 212, 170, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }
      }}
    >
      <Toolbar sx={{ py: 1, position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontSize: { xs: '1.5rem', md: '1.8rem' },
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff 30%, #d4d4aa 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }} 
          onClick={() => navigate('/')}
        >
          Xamu
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', md: '1rem' },
              px: { xs: 2, md: 3 },
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#d4d4aa',
                transform: 'translateY(-1px)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #8b4513, #d4d4aa)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateX(-50%)',
              },
              '&:hover::before': {
                width: '80%',
              }
            }}
          >
            Home
          </Button>
          
          {/* Show different navigation based on user role */}
          {user && isAdmin() ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/admin')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  background: 'linear-gradient(45deg, rgba(139, 69, 19, 0.2), rgba(160, 82, 45, 0.2))',
                  border: '1px solid rgba(139, 69, 19, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 69, 19, 0.3)',
                    color: '#d4d4aa',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.2)',
                  }
                }}
              >
                Admin Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/about')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d4d4aa',
                    transform: 'translateY(-1px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #8b4513, #d4d4aa)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::before': {
                    width: '80%',
                  }
                }}
              >
                About Us
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/contact')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d4d4aa',
                    transform: 'translateY(-1px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #8b4513, #d4d4aa)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::before': {
                    width: '80%',
                  }
                }}
              >
                Contact
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={handleStartProjectClick}
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                  boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(139, 69, 19, 0.4)',
                  }
                }}
              >
                Start Project
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/about')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d4d4aa',
                    transform: 'translateY(-1px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #8b4513, #d4d4aa)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::before': {
                    width: '80%',
                  }
                }}
              >
                About Us
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/contact')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d4d4aa',
                    transform: 'translateY(-1px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #8b4513, #d4d4aa)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::before': {
                    width: '80%',
                  }
                }}
              >
                Contact
              </Button>
            </>
          )}

          {user ? (
            <>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  mr: 2,
                  ml: 2,
                  color: '#d4d4aa',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  background: 'rgba(212, 212, 170, 0.1)',
                  border: '1px solid rgba(212, 212, 170, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Welcome, {user.email.split('@')[0]} {isAdmin() && '(Admin)'}
              </Typography>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.4)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.4)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
                sx={{
                  color: '#d4d4aa',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  border: '2px solid #d4d4aa',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 212, 170, 0.15)',
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 16px rgba(212, 212, 170, 0.2)',
                  }
                }}
              >
                Register
              </Button>
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

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
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

            {/* Admin Only Routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;