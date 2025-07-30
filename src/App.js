import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import all your pages
import Home from './pages/Home';
import StartProject from './pages/StartProject';
import Completed from './pages/Completed';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import EmailSent from './pages/EmailSent';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
  },
});

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Xamu
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/start-project')}>
            Start Project
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/email-sent" element={<EmailSent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;