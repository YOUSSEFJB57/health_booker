import axios from 'axios';

const CreateAdmin = async (AdminData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/admin/administrators', AdminData);
        return response.data;
    } catch (error) {
        console.error('Error creating the admin:', error);
        throw error;
    }
};

export default CreateAdmin;
