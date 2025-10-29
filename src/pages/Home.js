import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import TerrainIcon from '@mui/icons-material/Terrain';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [serviceCardsVisible, setServiceCardsVisible] = useState([false, false, false]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Animate service cards one by one
    const cardTimers = [
      setTimeout(() => setServiceCardsVisible(prev => [true, prev[1], prev[2]]), 600),
      setTimeout(() => setServiceCardsVisible(prev => [prev[0], true, prev[2]]), 800),
      setTimeout(() => setServiceCardsVisible(prev => [prev[0], prev[1], true]), 1000),
    ];

    return () => {
      clearTimeout(timer);
      cardTimers.forEach(clearTimeout);
    };
  }, []);

  const services = [
    {
      icon: <TerrainIcon sx={{ fontSize: 48 }} />,
      title: "Speed",
      description: "Our scientists use a customized app to quickly capture information, allowing for faster turnaround times on reports.",
      features: ["Quick Data Capture", "Customized Mobile App", "Faster Turnaround", "Streamlined Process"]
    },
    {
      icon: <EngineeringIcon sx={{ fontSize: 48 }} />,
      title: "Efficiency",
      description: "With our desktop software, data is seamlessly synced and analyzed, maximizing efficiency and minimizing delays.",
      features: ["Seamless Data Sync", "Desktop Integration", "Automated Analysis", "Minimized Delays"]
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 48 }} />,
      title: "Accuracy",
      description: "Precision is key in our surveys, ensuring that all data collected is accurate and reliable for your construction needs.",
      features: ["Precise Measurements", "Reliable Data", "Quality Assurance", "Construction Ready"]
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
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
          '&::after': {
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
            opacity: 0.2,
            pointerEvents: 'none',
            animation: 'twinkle 4s ease-in-out infinite'
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px) rotate(0deg)',
            },
            '50%': {
              transform: 'translateY(-20px) rotate(2deg)',
            },
          },
          '@keyframes twinkle': {
            '0%, 100%': {
              opacity: 0.2,
            },
            '50%': {
              opacity: 0.4,
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 800,
                mb: 3,
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 6px rgba(45,95,141,0.4)',
                letterSpacing: '-0.02em',
                animation: isVisible ? 'slideInFromTop 1s ease-out 0.3s both' : 'none',
                '@keyframes slideInFromTop': {
                  '0%': {
                    transform: 'translateY(-100px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              Welcome to Xamu
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                fontWeight: 500,
                color: '#ffffff',
                mb: 3,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
                animation: isVisible ? 'slideInFromLeft 1s ease-out 0.6s both' : 'none',
                '@keyframes slideInFromLeft': {
                  '0%': {
                    transform: 'translateX(-100px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateX(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              Professional Land Surveying & Soil Inspection Services
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 5,
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
                animation: isVisible ? 'slideInFromRight 1s ease-out 0.9s both' : 'none',
                '@keyframes slideInFromRight': {
                  '0%': {
                    transform: 'translateX(100px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateX(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              Precision-driven surveys and geotechnical analysis for construction projects across South Africa
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 6,
                animation: isVisible ? 'fadeInUp 1s ease-out 1.2s both' : 'none',
                '@keyframes fadeInUp': {
                  '0%': {
                    transform: 'translateY(50px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/start-project')}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4)',
                  textTransform: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    transition: 'all 0.5s',
                    borderRadius: '50%',
                  },
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 15px 60px rgba(139, 69, 19, 0.6)',
                    background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                    '&::before': {
                      width: '300px',
                      height: '300px',
                      marginLeft: '-150px',
                      marginTop: '-150px',
                    },
                  }
                }}
              >
                Start Your Project
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  borderWidth: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    transform: 'translateY(-2px)',
                    '&::before': {
                      left: '100%',
                    },
                  }
                }}
              >
                Get Consultation
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: '#4A9FD5',
                mb: 3,
                letterSpacing: '-0.01em',
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both',
                '@keyframes fadeInUp': {
                  '0%': {
                    transform: 'translateY(30px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              Why Choose Xamu
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease-out 0.4s both',
              }}
            >
              Advanced technology meets professional expertise to deliver exceptional land surveying and geotechnical services
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                    borderRadius: 4,
                    border: '1px solid rgba(137, 207, 240, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'visible',
                    opacity: serviceCardsVisible[index] ? 1 : 0,
                    transform: serviceCardsVisible[index] ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                      borderRadius: '16px 16px 0 0',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.6s ease-out',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(137, 207, 240, 0.2)',
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                      '& .service-icon': {
                        transform: 'scale(1.15) rotate(8deg)',
                        background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.15) 0%, rgba(167, 216, 240, 0.15) 100%)',
                      },
                      '& .service-icon-inner': {
                        color: '#4A9FD5'
                      },
                      '& .feature-item': {
                        transform: 'translateX(5px)',
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      className="service-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.1) 0%, rgba(167, 216, 240, 0.1) 100%)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <Box
                        className="service-icon-inner"
                        sx={{
                          color: '#4A9FD5',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {service.icon}
                      </Box>
                    </Box>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: '#4A9FD5',
                        mb: 2,
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666',
                        mb: 3,
                        lineHeight: 1.7,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Box sx={{ textAlign: 'left' }}>
                      {service.features.map((feature, idx) => (
                        <Box
                          key={idx}
                          className="feature-item"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                            transition: 'transform 0.3s ease-out',
                            transitionDelay: `${idx * 0.1}s`
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: '#8b4513',
                              fontSize: 20,
                              mr: 2,
                              flexShrink: 0
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#666',
                              fontSize: '0.95rem',
                              fontWeight: 500
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
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
              '0%, 100%': {
                opacity: 0.3,
              },
              '50%': {
                opacity: 0.5,
              },
            },
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 700,
                mb: 3,
                letterSpacing: '-0.01em',
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both',
              }}
            >
              Ready to Start Your Project?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 5,
                lineHeight: 1.7,
                maxWidth: '550px',
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease-out 0.4s both',
              }}
            >
              Get professional land surveying and soil analysis services with detailed reporting. 
              Contact us today for a free consultation and project quote.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                justifyContent: 'center',
                flexWrap: 'wrap',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease-out 0.6s both',
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/start-project')}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4)',
                  textTransform: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    transition: 'all 0.5s',
                    borderRadius: '50%',
                  },
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 48px rgba(139, 69, 19, 0.5)',
                    '&::before': {
                      width: '300px',
                      height: '300px',
                      marginLeft: '-150px',
                      marginTop: '-150px',
                    },
                  }
                }}
              >
                Start Project
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  borderWidth: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Contact Us
              </Button>

              <Button
                variant="text"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)',
                  textTransform: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;