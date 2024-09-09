import axios from 'axios';

const Getadminbyid = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/admin/administrators/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching the admin data with ID ${id}:`, error);
        return null;
    }
};

export default Getadminbyid;
