import axios from 'axios';

const CreateMedecin = async (medecinData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/medecins', medecinData);
        return response.data;
    } catch (error) {
        console.error('Error creating the medecin:', error);
        throw error;
    }
};

export default CreateMedecin;
