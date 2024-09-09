import axios from 'axios';

const UpdateUser = async (id, User) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/admin/users/${id}`, User);
        return response.data;
    } catch (error) {
        console.error(`Error updating the User with ID ${id}:`, error);
        throw error;
    }
};

export default UpdateUser;
