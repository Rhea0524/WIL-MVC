import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Box>
      {/* Header Ribbon */}
      <Box sx={{ 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        textAlign: 'center', 
        py: 2 
      }}>
        <Typography variant="h3" component="h1">
          About Us
        </Typography>
      </Box>

      {/* Banner Image Placeholder */}
      <Box sx={{ 
        height: 200, 
        backgroundColor: '#e0e0e0',
        backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" color="text.secondary">
          Image Banner Area
        </Typography>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          {/* Mission Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#333',
                borderBottom: '2px solid #4CAF50',
                pb: 1,
                mb: 2
              }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
              Our mission is to empower businesses with cutting-edge technology and innovative solutions. 
              We strive to deliver exceptional value and foster lasting relationships with our clients.
            </Typography>
          </Box>

          {/* Story Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#333',
                borderBottom: '2px solid #4CAF50',
                pb: 1,
                mb: 2
              }}
            >
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
              Founded in 2024 by a field scientist and a handful of developers, Xamu began with a vision 
              to revolutionize land surveying. Our comprehensive suite of tools—including an Android app, 
              desktop software, a database system, and a website—work seamlessly together. Data is captured 
              on-site using our Android app, then processed on the desktop app to generate detailed reports. 
              We've grown quickly, adapting to the needs of our clients and constantly innovating to stay 
              at the forefront of technology.
            </Typography>
          </Box>

          {/* Contact Section */}
          <Box>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#333',
                borderBottom: '2px solid #4CAF50',
                pb: 1,
                mb: 2
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
              If you have any questions or would like to get in touch, please{' '}
              <a href="/contact" style={{ color: '#4CAF50', fontWeight: 'bold', textDecoration: 'none' }}>
                contact us here
              </a>.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;