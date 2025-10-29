import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PhoneIcon from '@mui/icons-material/Phone';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState([false, false]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Animate sections
    const sectionTimers = [
      setTimeout(() => setSectionVisible(prev => [true, prev[1]]), 600),
      setTimeout(() => setSectionVisible(prev => [prev[0], true]), 900),
    ];

    return () => {
      clearTimeout(timer);
      sectionTimers.forEach(clearTimeout);
    };
  }, []);

  const values = [
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 36 }} />,
      title: "Innovation",
      description: "Cutting-edge technology meets field expertise for revolutionary surveying solutions."
    },
    {
      icon: <GroupIcon sx={{ fontSize: 36 }} />,
      title: "Collaboration",
      description: "Built by scientists and developers working together to solve real-world challenges."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 36 }} />,
      title: "Growth",
      description: "Constantly evolving to meet the changing needs of our clients and industry."
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '60vh',
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
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 2,
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 6px rgba(45,95,141,0.4)',
                letterSpacing: '-0.02em',
              }}
            >
              About Xamu
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 500,
                color: '#ffffff',
                mb: 2,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.4,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              Revolutionizing Land Surveying Through Innovation
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '500px',
                mx: 'auto',
                fontWeight: 400,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.5,
              }}
            >
              Founded by field scientists and developers, transforming surveying across South Africa
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission & Story Combined Section */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              opacity: sectionVisible[0] ? 1 : 0,
              transform: sectionVisible[0] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.15) 0%, rgba(167, 216, 240, 0.15) 100%)',
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 32, color: '#4A9FD5' }} />
                </Box>

                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 700,
                    color: '#4A9FD5',
                    mb: 2,
                    letterSpacing: '-0.01em'
                  }}
                >
                  Our Mission
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    mb: 3
                  }}
                >
                  Empowering construction and development with cutting-edge surveying technology. We deliver exceptional precision, speed, and reliability while fostering lasting client relationships across South Africa.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(137, 207, 240, 0.15) 100%)',
                  }}
                >
                  <RocketLaunchIcon sx={{ fontSize: 32, color: '#8b4513' }} />
                </Box>

                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 700,
                    color: '#4A9FD5',
                    mb: 2,
                    letterSpacing: '-0.01em'
                  }}
                >
                  Our Story
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    mb: 2
                  }}
                >
                  Founded in 2024 by passionate field scientists and developers, Xamu revolutionizes land surveying with an integrated ecosystem: Android app, desktop software, database system, and web platform.
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
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
                      background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                      borderRadius: '12px 12px 0 0',
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      lineHeight: 1.5,
                      fontSize: '0.9rem',
                      fontStyle: 'italic'
                    }}
                  >
                    "Technology should serve the field, not complicate it. Every survey tells a story about the land."
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Values Section */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: 'linear-gradient(180deg, rgba(250,240,230,0.98) 0%, rgba(245,245,220,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              opacity: sectionVisible[1] ? 1 : 0,
              transform: sectionVisible[1] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  fontWeight: 700,
                  color: '#4A9FD5',
                  mb: 2,
                  letterSpacing: '-0.01em'
                }}
              >
                Our Values
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  maxWidth: '500px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  fontSize: { xs: '0.95rem', md: '1rem' }
                }}
              >
                The principles that guide everything we do
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {values.map((value, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                      borderRadius: 3,
                      border: '1px solid rgba(137, 207, 240, 0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                        borderRadius: '12px 12px 0 0',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.5s ease-out',
                      },
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 35px rgba(137, 207, 240, 0.12)',
                        '&::before': {
                          transform: 'scaleX(1)',
                        },
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          mx: 'auto',
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.1) 0%, rgba(167, 216, 240, 0.1) 100%)',
                          color: '#4A9FD5',
                        }}
                      >
                        {value.icon}
                      </Box>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: '#4A9FD5',
                          mb: 1.5,
                          fontSize: { xs: '1.1rem', md: '1.2rem' }
                        }}
                      >
                        {value.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.5,
                          fontSize: '0.9rem'
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: 'linear-gradient(135deg, #4A9FD5 0%, #89CFF0 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.3,
            pointerEvents: 'none',
            animation: 'pulse 3s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.3 },
              '50%': { opacity: 0.5 },
            },
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ContactMailIcon sx={{ fontSize: 32, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                mb: 2,
                letterSpacing: '-0.01em'
              }}
            >
              Get In Touch
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 3,
                lineHeight: 1.5,
                maxWidth: '400px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              If you have any questions or would like to get in touch, please contact us here.
            </Typography>

            <Box
              onClick={() => navigate('/contact')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                borderRadius: 2.5,
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 6px 24px rgba(139, 69, 19, 0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 32px rgba(139, 69, 19, 0.5)',
                }
              }}
            >
              <PhoneIcon sx={{ fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Contact Us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;