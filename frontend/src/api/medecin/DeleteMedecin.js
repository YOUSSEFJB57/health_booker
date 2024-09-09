import axios from 'axios';

const DeleteMedecin = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/medecins/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting the medecin with ID ${id}:`, error);
        throw error;
    }
};

export default DeleteMedecin;
