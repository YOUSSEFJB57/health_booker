// Function to fetch medcins data and transform it

import getAllAppointment from "../api/appointment/GetAllAppointment";

const fetchUsers = async () => {
    const medcinsData = await getAllAppointment();
    return medcinsData.map((medcin, index) => ({
        id: medcin.id,
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        Time: medcin.appointmentTime,
        Patient: medcin.patient,
        Medcin:medcin.medecin,
        Status:medcin.status
    }));
};

// Fetch the users data
const Appointments = await fetchUsers();
console.log("appointment",Appointments)
export { Appointments };
