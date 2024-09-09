import axios from 'axios';

const UpdateAppointment = async (id, Appointment) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/appointments/${id}`, Appointment);
        return response.data;
    } catch (error) {
        console.error(`Error updating the Appointment with ID ${id}:`, error);
        throw error;
    }
};

export default UpdateAppointment;
