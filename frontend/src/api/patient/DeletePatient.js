import axios from 'axios';

const deletePatient = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting the patient with ID ${id}:`, error);
        throw error;
    }
};

export default deletePatient;
