import axios from 'axios';

const GetuserByID = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching the user data with ID ${id}:`, error);
        return null;
    }
};

export default GetuserByID;
