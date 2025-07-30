import React from 'react';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        textAlign: 'center', 
        py: 6 
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Xamu
          </Typography>
          <Typography variant="h5" paragraph>
            Professional Land Surveying & Soil Inspection Services
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/start-project')}
            sx={{ 
              mt: 2, 
              backgroundColor: 'white', 
              color: '#4CAF50',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            Start a Project
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Our Services
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <BusinessIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Project Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comprehensive project management from initial consultation to final reporting.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <InfoIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Expert Analysis
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Professional soil inspection and land surveying with detailed reporting.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <ContactMailIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Consultation
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get expert advice and consultation for your land development projects.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Contact us today to discuss your project requirements.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/start-project')}
            >
              Start a Project
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
            <Button 
              variant="text" 
              size="large"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;