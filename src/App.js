import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  palette: { primary: { main: '#4A9FD5' } },
});

// Navigation
const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMobileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleStartProjectClick = () => {
    setMobileOpen(false);
    if (!user) {
      alert('Please log in to start a project');
      navigate('/login');
    } else {
      navigate('/start-project');
    }
  };

  const handleNavigate = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  // Mobile drawer menu
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(180deg, #2D5F8D 0%, #3B7FB8 100%)',
        color: 'white',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Xamu
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1, py: 2 }}>
        {user && (
          <>
            <ListItem sx={{ 
              mb: 2, 
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: 1.5
            }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mb: 0.5 }}>
                Logged in as
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.email.split('@')[0]}
              </Typography>
              {isAdmin() && (
                <Typography variant="caption" sx={{ 
                  color: '#d4d4aa', 
                  mt: 0.5,
                  px: 1,
                  py: 0.25,
                  background: 'rgba(212, 212, 170, 0.2)',
                  borderRadius: 1
                }}>
                  Admin
                </Typography>
              )}
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
          </>
        )}

        <ListItem 
          button 
          onClick={() => handleNavigate('/')}
          sx={{
            borderRadius: 2,
            mb: 1,
            '&:hover': { background: 'rgba(255,255,255,0.1)' }
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>

        {user && isAdmin() ? (
          <>
            <ListItem 
              button 
              onClick={() => handleNavigate('/admin')}
              sx={{
                borderRadius: 2,
                mb: 1,
                background: 'rgba(139, 69, 19, 0.3)',
                '&:hover': { background: 'rgba(139, 69, 19, 0.4)' }
              }}
            >
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigate('/about')}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigate('/contact')}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              onClick={handleStartProjectClick}
              sx={{
                borderRadius: 2,
                mb: 1,
                background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                '&:hover': { background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)' }
              }}
            >
              <ListItemText 
                primary="Start Project" 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigate('/about')}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigate('/contact')}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </>
        )}

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

        {user ? (
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': { background: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem 
              button 
              onClick={() => handleNavigate('/login')}
              sx={{
                borderRadius: 2,
                mb: 1,
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigate('/register')}
              sx={{
                borderRadius: 2,
                border: '2px solid white',
                '&:hover': { background: 'rgba(255,255,255,0.2)' }
              }}
            >
              <ListItemText 
                primary="Register" 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, #2D5F8D 0%, #3B7FB8 50%, #4A9FD5 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 6px 20px rgba(45, 95, 141, 0.3)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }
        }}
      >
        <Toolbar sx={{ py: 1, position: 'relative', zIndex: 1 }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: 'block', md: 'none' },
              color: 'white'
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
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
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 1, 
            alignItems: 'center'
          }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{
                color: 'rgba(255,255,255,0.95)',
                fontWeight: 500,
                fontSize: '1rem',
                px: 3,
                py: 1,
                minWidth: 'auto',
                borderRadius: 2,
                textTransform: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  transform: 'translateY(-1px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #8b4513, #ffffff)',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    background: 'linear-gradient(45deg, rgba(139, 69, 19, 0.2), rgba(160, 82, 45, 0.2))',
                    border: '1px solid rgba(139, 69, 19, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 69, 19, 0.3)',
                      color: '#ffffff',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      transform: 'translateY(-1px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #8b4513, #ffffff)',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      transform: 'translateY(-1px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #8b4513, #ffffff)',
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
                    fontSize: '1rem',
                    px: 3,
                    py: 1.5,
                    minWidth: 'auto',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      transform: 'translateY(-1px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #8b4513, #ffffff)',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      transform: 'translateY(-1px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #8b4513, #ffffff)',
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
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    mr: 2,
                    ml: 2,
                    color: '#ffffff',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Welcome, {user.email.split('@')[0]} {isAdmin() && '(Admin)'}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.5)',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.5)',
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
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    border: '2px solid #ffffff',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      borderColor: '#ffffff',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)',
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
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

// App Content - This component is inside AuthProvider so it can use useAuth
function AppContent() {
  return (
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
  );
}

// App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;