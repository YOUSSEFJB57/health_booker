import axios from 'axios';

const getAppointmentsByMedecin = async (medecinId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/appointments/medecin/${medecinId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching appointments for medecin with ID ${medecinId}:`, error);
        return [];
    }
};

export default getAppointmentsByMedecin;
