import axios from 'axios';

const createPatient = async (patientData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/patients', patientData);
        return response.data;
    } catch (error) {
        console.error('Error creating the patient:', error);
        throw error;
    }
};

export default createPatient;
