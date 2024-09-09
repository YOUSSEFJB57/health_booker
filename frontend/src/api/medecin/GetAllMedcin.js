import axios from 'axios';

const getAllMedcins = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/medecins');
        return response.data;
    } catch (error) {
        console.error('Error fetching the medcins data:', error);
        return [];
    }
};

export default getAllMedcins;
