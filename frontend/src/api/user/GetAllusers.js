import axios from 'axios';

const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching the users data:', error);
        return [];
    }
};

export default getAllUsers;
