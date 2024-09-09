// Function to fetch medcins data and transform it

import getAllAdmin from "../api/admin/GetAllAdmin";


const fetchUsers = async () => {
    const medcinsData = await getAllAdmin();
    return medcinsData.map((medcin, index) => ({
        id: medcin.id,
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        Username: medcin.username,
        Email: medcin.email,
    }));
};

// Fetch the users data
const Admins = await fetchUsers();
export { Admins };
