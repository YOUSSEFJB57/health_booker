import axios from 'axios';

const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/appointments', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating the appointment:', error);
        throw error;
    }
};

export default createAppointment;
