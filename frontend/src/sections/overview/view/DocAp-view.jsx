import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import createAppointment from 'src/api/appointment/CreateAppointment';
import getAllAppointment from 'src/api/appointment/GetAllAppointment';

import Container from '@mui/material/Container';
import { TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function DocApView() {
  const [appointments, setAppointments] = useState([]);
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

    const fetchAppointments = async () => {
      const data = await getAllAppointment();
      setAppointments(data);
      console.log(data);
    };
    fetchAppointments();
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
      status: 'Waiting for confirmation',
    };

    console.log(newAppointmentData);
    createAppointment(newAppointmentData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}`, { status: 'Accepted' });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: 'Accepted' } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋 {JSON.parse(localStorage.getItem('authState')).user.username}
        </Typography>

        <Grid container spacing={4}>
          {appointments
            .sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))
            .filter((appointment) => appointment.medecin.id === JSON.parse(localStorage.getItem('authState')).user.id)
            .map((appointment) => (
              <Grid key={appointment.id} xs={12} sm={6} md={3}>
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <div className="flex flex-col items-center py-5">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg border-2"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/hospital-patient-icon.png"
                      alt="test"
                    />
                    <h5 className="mb-1 text-xl font-medium text-black font-bold">
                      {appointment.patient?.username}
                    </h5>
                    <span className="text-sm text-gray-600 dark:text-gray-600">
                      {appointment.appointmentTime}
                    </span>
                    <div className="flex mt-4 md:mt-6 gap-5">
                      {appointment.status === 'Waiting for confirmation' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleAccept(appointment.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBook(appointment.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          disabled
                          onClick={() => handleBook(appointment.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                          Accepted
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </Container>

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
    </LocalizationProvider>
  );
}
