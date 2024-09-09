// Function to fetch medcins data and transform it

import getAllUsers from "src/api/user/GetAllusers";

const fetchUsers = async () => {
    const medcinsData = await getAllUsers();
    return medcinsData.map((medcin, index) => ({
        id: medcin.id,
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        Username: medcin.username,
        Speciality: medcin.specialty,
        Appointment: "" ,
        Email: medcin.email,
    }));
};

// Fetch the users data
const users = await fetchUsers();

export { users };
