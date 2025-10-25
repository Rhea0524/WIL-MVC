import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const EmailSent = () => {
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
              rgba(44, 85, 48, 0.95) 0%,
              rgba(74, 124, 89, 0.9) 50%,
              rgba(107, 142, 107, 0.85) 100%
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
              <CheckCircleIcon sx={{ fontSize: 48, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #d4d4aa 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              Email Sent Successfully!
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.5,
              }}
            >
              Thank you for contacting us
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
              border: '1px solid rgba(44, 85, 48, 0.08)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #2c5530, #4a7c59, #8b4513)',
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
                background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.15) 0%, rgba(212, 212, 170, 0.15) 100%)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <EmailIcon sx={{ fontSize: 56, color: '#2c5530' }} />
            </Box>

            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 700,
                color: '#2c5530',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              We've Received Your Message
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Your email has been sent successfully, and our team will get back to you shortly. 
              We appreciate you reaching out to us and look forward to assisting you.
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
                onClick={() => navigate('/')}
                startIcon={<HomeIcon />}
                sx={{
                  minWidth: 180,
                  background: 'linear-gradient(45deg, #2c5530 30%, #4a7c59 90%)',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 6px 24px rgba(44, 85, 48, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4a7c59 30%, #2c5530 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(44, 85, 48, 0.4)',
                  }
                }}
              >
                Back to Home
              </Button>
              <Button 
                variant="contained"
                onClick={() => navigate('/start-project')}
                startIcon={<RocketLaunchIcon />}
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
                Start a Project
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

export default EmailSent;