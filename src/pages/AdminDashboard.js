// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, get } from 'firebase/database';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchProjects();
    }
  }, [user, isAdmin]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsRef = ref(database, 'clientInfo');
      const snapshot = await get(projectsRef);
      
      if (snapshot.exists()) {
        const projectsData = snapshot.val();
        const projectsList = Object.entries(projectsData).map(([id, data]) => ({
          id,
          ...data
        }));
        
        // Sort by most recent first
        projectsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setProjects(projectsList);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  if (!user || !isAdmin()) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Projects
              </Typography>
              <Typography variant="h4">
                {projects.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recent Projects (This Week)
              </Typography>
              <Typography variant="h4">
                {projects.filter(p => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(p.timestamp) > weekAgo;
                }).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unique Companies
              </Typography>
              <Typography variant="h4">
                {new Set(projects.map(p => p.Company_Name)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Submissions
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Loading projects...</Typography>
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No projects submitted yet.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      {project.First_Name} {project.Last_Name}
                    </TableCell>
                    <TableCell>{project.Company_Name}</TableCell>
                    <TableCell>{project.Email_Address}</TableCell>
                    <TableCell>
                      {formatDate(project.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewDetails(project)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Project Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Project Details
        </DialogTitle>
        <DialogContent>
          {selectedProject && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Personal Information
                  </Typography>
                  <Typography><strong>Name:</strong> {selectedProject.First_Name} {selectedProject.Last_Name}</Typography>
                  <Typography><strong>Email:</strong> {selectedProject.Email_Address}</Typography>
                  <Typography><strong>Mobile:</strong> {selectedProject.Mobile_Number}</Typography>
                  {selectedProject.Phone_Number && (
                    <Typography><strong>Phone:</strong> {selectedProject.Phone_Number}</Typography>
                  )}
                  <Typography><strong>Address:</strong> {selectedProject.Physical_Address}</Typography>
                  {selectedProject.PO_Box && (
                    <Typography><strong>PO Box:</strong> {selectedProject.PO_Box}</Typography>
                  )}
                  {selectedProject.Postal_Code && (
                    <Typography><strong>Postal Code:</strong> {selectedProject.Postal_Code}</Typography>
                  )}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Company Information
                  </Typography>
                  <Typography><strong>Company Name:</strong> {selectedProject.Company_Name}</Typography>
                  {selectedProject.Company_Type && (
                    <Typography><strong>Company Type:</strong> {selectedProject.Company_Type}</Typography>
                  )}
                  {selectedProject.VAT_Number && (
                    <Typography><strong>VAT Number:</strong> {selectedProject.VAT_Number}</Typography>
                  )}
                  {selectedProject.Company_Registration_Number && (
                    <Typography><strong>Registration Number:</strong> {selectedProject.Company_Registration_Number}</Typography>
                  )}
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Submission Details
                    </Typography>
                    <Typography><strong>Submitted:</strong> {formatDate(selectedProject.timestamp)}</Typography>
                    {selectedProject.userEmail && (
                      <Typography><strong>User Account:</strong> {selectedProject.userEmail}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;