import axios from 'axios';

const DeleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/admin/administrators/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting the Admin with ID ${id}:`, error);
        throw error;
    }
};

export default DeleteAdmin;
