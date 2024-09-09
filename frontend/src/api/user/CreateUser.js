import axios from 'axios';

const CreateUser = async (UserData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/admin/users', UserData);
        return response.data;
    } catch (error) {
        console.error('Error creating the user:', error);
        throw error;
    }
};

export default CreateUser;
