import axios from 'axios';

const getAllPatient = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/patients');
        return response.data;
    } catch (error) {
        console.error('Error fetching the patients data:', error);
        return [];
    }
};

export default getAllPatient;
