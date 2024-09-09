import axios from 'axios';

const Getmedcinbyid = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/medecins/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching the medecin data with ID ${id}:`, error);
        return null;
    }
};

export default Getmedcinbyid;
