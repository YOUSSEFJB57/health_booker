import axios from 'axios';

const getPatientByID = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching the patient data with ID ${id}:`, error);
        return null;
    }
};

export default getPatientByID;
