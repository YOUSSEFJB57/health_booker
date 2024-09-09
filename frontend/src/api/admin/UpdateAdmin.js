import axios from 'axios';

const UpdateAdmin = async (id, Admin) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/admin/administrators/${id}`, Admin);
        return response.data;
    } catch (error) {
        console.error(`Error updating the Admin with ID ${id}:`, error);
        throw error;
    }
};

export default UpdateAdmin;
