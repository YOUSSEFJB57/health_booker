// Function to fetch medcins data and transform it

import getAllMedcins from "../api/medecin/GetAllMedcin";


const fetchUsers = async () => {
    const medcinsData = await getAllMedcins();
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
const Medecin = await fetchUsers();

export { Medecin };
