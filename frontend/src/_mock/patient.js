// Function to fetch medcins data and transform it

import getAllPatient from "../api/patient/GetAllPatient";


const fetchUsers = async () => {
    const medcinsData = await getAllPatient();
    return medcinsData.map((medcin, index) => ({
        id: medcin.id,
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        Username: medcin.username,
        Email: medcin.email,
        medicalHistory: medcin.medicalHistory
    }));
};

// Fetch the users data
const Patients = await fetchUsers();

export { Patients };
