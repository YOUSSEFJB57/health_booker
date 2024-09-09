import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAppointment from 'src/api/appointment/CreateAppointment';
import getAllAppointment from 'src/api/appointment/GetAllAppointment';
import UpdateAppointment from 'src/api/appointment/UpdateAppointment';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function DocSesView() {
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

  const handleStatusChange = async (appointmentId, newStatus) => {
    const appointmentData = { status: newStatus };
    await UpdateAppointment(appointmentId, appointmentData);
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋 {JSON.parse(localStorage.getItem('authState')).user.username}
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell>Patient Username</TableCell>
                <TableCell>Appointment Time</TableCell>
                <TableCell>Medical History</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments
                .filter((appointment) => appointment.medecin.id === JSON.parse(localStorage.getItem('authState')).user.id)
                .sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))
                .map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient?.username}</TableCell>
                    <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
                    <TableCell>{appointment.patient?.medicalHistory || 'N/A'}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        >
                          <MenuItem value="Waiting for confirmation">Waiting for confirmation</MenuItem>
                          <MenuItem value="Accepted">Accepted</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
