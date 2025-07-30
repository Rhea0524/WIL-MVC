import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const EmailSent = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <EmailIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        
        <Typography variant="h3" component="h2" gutterBottom color="success.main">
          Email Sent Successfully!
        </Typography>
        
        <Typography variant="h6" paragraph sx={{ mb: 3 }}>
          Thank you for contacting us. Your email has been sent successfully, and we will get back to you shortly.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ minWidth: 150 }}
          >
            Back to Home
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/start-project')}
            sx={{ minWidth: 150 }}
          >
            Start a Project
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmailSent;