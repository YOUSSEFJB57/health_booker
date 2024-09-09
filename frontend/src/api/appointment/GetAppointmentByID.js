import axios from 'axios';

const GetAppointmentById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching the Appointment data with ID ${id}:`, error);
        return null;
    }
};

export default GetAppointmentById;
