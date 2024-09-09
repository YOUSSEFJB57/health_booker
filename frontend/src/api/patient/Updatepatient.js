import axios from 'axios';

const updatePatient = async (id, patientData) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/patients/${id}`, patientData);
        return response.data;
    } catch (error) {
        console.error(`Error updating the patient with ID ${id}:`, error);
        throw error;
    }
};

export default updatePatient;
