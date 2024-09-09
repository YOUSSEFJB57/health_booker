import axios from 'axios';

const updateMedcint = async (id, Medcindata) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/medecins/${id}`, Medcindata);
        return response.data;
    } catch (error) {
        console.error(`Error updating the medecin with ID ${id}:`, error);
        throw error;
    }
};

export default updateMedcint;
