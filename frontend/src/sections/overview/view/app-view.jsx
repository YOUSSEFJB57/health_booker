import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import getAllPatient from 'src/api/patient/GetAllPatient';
import getAllAppointment from 'src/api/appointment/GetAllAppointment';
import getAllMedcins from 'src/api/medecin/GetAllMedcin';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [medecins, setMedecins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (!storedAuthState) {
      navigate('/login');
    } else {
      const authState = JSON.parse(storedAuthState);
      const { user } = authState;

      if (user.role === 'DOCTOR') {
        navigate('/MedecinAppointments'); // Change this to your medecin dashboard route
      } else if (user.role === 'PATIENT') {
        navigate('/BookAdoctor'); // Change this to your patient dashboard route
      }
      // Add other roles and redirections as needed
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMedecins = async () => {
      const data = await getAllMedcins();
      setMedecins(data);
    };
    fetchMedecins();

    const fetchPatients = async () => {
      const data = await getAllPatient();
      setPatients(data);
    };
    fetchPatients();

    const fetchAppointments = async () => {
      const data = await getAllAppointment();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋 {JSON.parse(localStorage.getItem('authState')).user.username}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Patients"
            total={patients.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Medecins"
            total={medecins.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Appointments"
            total={appointments.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
