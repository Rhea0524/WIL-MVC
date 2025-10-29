import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import CelebrationIcon from '@mui/icons-material/Celebration';

const Completed = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '35vh',
          display: 'flex',
          alignItems: 'center',
          background: `
            linear-gradient(
              135deg,
              rgba(137, 207, 240, 0.95) 0%,
              rgba(167, 216, 240, 0.9) 50%,
              rgba(186, 225, 245, 0.85) 100%
            )
          `,
          color: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(212, 212, 170, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite'
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(2deg)' },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CelebrationIcon sx={{ fontSize: 48, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 6px rgba(45,95,141,0.4)',
                letterSpacing: '-0.02em',
              }}
            >
              Thank You!
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                fontWeight: 500,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.5,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              Your project has been submitted successfully
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
              borderRadius: 3,
              border: '1px solid rgba(137, 207, 240, 0.08)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #4A9FD5, #89CFF0, #8b4513)',
                borderRadius: '12px 12px 0 0',
              }
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.15) 0%, rgba(167, 216, 240, 0.15) 100%)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 56, color: '#4A9FD5' }} />
            </Box>

            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 700,
                color: '#4A9FD5',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Project Submitted Successfully!
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 2,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Thank you for submitting your project information. Our team has received your details 
              and will review them carefully. We'll get back to you shortly with next steps.
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1rem',
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              If you have any questions in the meantime, please don't hesitate to contact us.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2, 
                justifyContent: 'center',
                mt: 4 
              }}
            >
              <Button 
                variant="contained" 
                onClick={() => navigate('/contact')}
                startIcon={<EmailIcon />}
                sx={{
                  minWidth: 180,
                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 6px 24px rgba(139, 69, 19, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(139, 69, 19, 0.4)',
                  }
                }}
              >
                Contact Us
              </Button>
              <Button 
                variant="contained"
                onClick={() => navigate('/')}
                startIcon={<HomeIcon />}
                sx={{
                  minWidth: 180,
                  background: 'linear-gradient(45deg, #4A9FD5 30%, #89CFF0 90%)',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 6px 24px rgba(74, 159, 213, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #89CFF0 30%, #4A9FD5 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(74, 159, 213, 0.4)',
                  }
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Completed;