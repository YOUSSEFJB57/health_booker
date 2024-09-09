import axios from 'axios';

const DeleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting the User with ID ${id}:`, error);
        throw error;
    }
};

export default DeleteUser;
