import axios from 'axios';

const getAllAppointment = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/appointments');
        return response.data;
    } catch (error) {
        console.error('Error fetching the Appointment data:', error);
        return [];
    }
};

export default getAllAppointment;
