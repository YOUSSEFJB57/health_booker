import axios from 'axios';

const DeleteAppointment = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting the Appointment with ID ${id}:`, error);
        throw error;
    }
};

export default DeleteAppointment;
