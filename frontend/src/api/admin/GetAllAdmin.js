import axios from 'axios';

const getAllAdmin = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/admin/administrators');
        return response.data;
    } catch (error) {
        console.error('Error fetching the Admin data:', error);
        return [];
    }
};

export default getAllAdmin;
