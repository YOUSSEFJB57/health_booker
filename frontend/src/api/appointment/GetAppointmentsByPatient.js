import axios from 'axios';

const getAppointmentsByPatient = async (patientId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/appointments/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching appointments for medecin with ID ${patientId}:`, error);
        return [];
    }
};

export default getAppointmentsByPatient;
