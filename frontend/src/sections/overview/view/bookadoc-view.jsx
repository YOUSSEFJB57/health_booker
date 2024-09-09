import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAppointment from 'src/api/appointment/CreateAppointment';

import Container from '@mui/material/Container';
import { Avatar, Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import getAllMedcins from 'src/api/medecin/GetAllMedcin';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function BookAdocView() {
  const [medecins, setmedecins] = useState([]);
  const [medecinIdx, setMedecinIdx] = useState(0);
  const [newAppointment, setNewAppointment] = useState({
    date: null,
    medecin: '',
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (!storedAuthState) {
      navigate('/login');
    }
    const fetchMedecins = async () => {
      const data = await getAllMedcins();
      setmedecins(data);
      console.log(data);
    };
    fetchMedecins();
  }, [navigate]);

  const handleDateChange = (newValue) => {
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      date: newValue,
    }));
  };

  const handleBook = (id) => {
    setOpen(true);
    setMedecinIdx(id);
  };

  const handleSave = () => {
    const storedAuthState = localStorage.getItem('authState');
    const authState = JSON.parse(storedAuthState);

    const newAppointmentData = {
      appointmentTime: newAppointment.date,
      medecinId: medecinIdx,
      patientId: authState.user.id,
      status: "Waiting for confirmation",
    };

    createAppointment(newAppointmentData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋 {JSON.parse(localStorage.getItem('authState')).user.username}
        </Typography>

        <Grid container spacing={4}>
          {medecins.map((medecin) => (
            <Grid key={medecin.id} xs={12} sm={6} md={3}>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <div className="flex flex-col items-center py-5">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg border-2"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/doctor-surgeon-icon.png"
                    alt="test"
                  />
                  <h5 className="mb-1 text-xl font-medium text-black font-bold">
                    {medecin.username}
                  </h5>
                  <span className="text-sm text-gray-600 dark:text-gray-600">
                    {medecin.specialty}
                  </span>
                  <div className="flex mt-4 md:mt-6">
                    <button
                      type='button'
                      onClick={() => handleBook(medecin.id)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Appointment Date"
              value={newAppointment.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
}
