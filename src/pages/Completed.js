import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Completed = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        
        <Typography variant="h3" component="h2" gutterBottom color="success.main">
          Thank You!
        </Typography>
        
        <Typography variant="h6" paragraph sx={{ mb: 3 }}>
          Thank you for submitting your information. We will get back to you shortly.
        </Typography>
        
        <Typography variant="body1" paragraph>
          If you have any questions, feel free to contact us.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/contact')}
            sx={{ minWidth: 150 }}
          >
            Contact Us
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            sx={{ minWidth: 150 }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Completed;