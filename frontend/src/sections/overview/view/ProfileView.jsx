import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProfileView() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    password: '',
    medicalHistory: '',
    specialty: ''
  });
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (!storedAuthState) {
      navigate('/login');
      return;
    }

    const authState = JSON.parse(storedAuthState);
    setUserRole(authState.user.role);
    setProfileData({
      username: authState.user.username,
      email: authState.user.email,
      password: '',
      medicalHistory: authState.user.medicalHistory || '',
      specialty: authState.user.specialty || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const storedAuthState = localStorage.getItem('authState');
    const authState = JSON.parse(storedAuthState);

    let endpoint = '';
    if (userRole === 'PATIENT') {
      endpoint = `http://localhost:8080/api/patients/${authState.user.id}`;
    } else if (userRole === 'DOCTOR') {
      endpoint = `http://localhost:8080/api/medecins/${authState.user.id}`;
    } else if (userRole === 'ADMIN') {
      endpoint = `http://localhost:8080/api/admin/administrators/${authState.user.id}`;
    }

    const updatedData = {
      username: profileData.username,
      email: profileData.email,
      password: profileData.password,
    };

    if (userRole === 'PATIENT') {
      updatedData.medicalHistory = profileData.medicalHistory;
    } else if (userRole === 'DOCTOR') {
      updatedData.specialty = profileData.specialty;
    }

    try {
      const response = await axios.put(endpoint, updatedData);
      if (response.status === 200) {
        // Update local storage
        const updatedAuthState = {
          ...authState,
          user: { ...authState.user, ...profileData }
        };
        localStorage.setItem('authState', JSON.stringify(updatedAuthState));
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Update Profile
      </Typography>
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={profileData.username}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={profileData.email}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={profileData.password}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      {userRole === 'PATIENT' && (
        <TextField
          fullWidth
          label="Medical History"
          name="medicalHistory"
          value={profileData.medicalHistory}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 3 }}
        />
      )}
      {userRole === 'DOCTOR' && (
        <TextField
          fullWidth
          label="Specialty"
          name="specialty"
          value={profileData.specialty}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Container>
  );
}
