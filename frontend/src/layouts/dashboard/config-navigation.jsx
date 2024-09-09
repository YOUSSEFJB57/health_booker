import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    role : ['ADMIN']
  },
  {
    title: 'AdminTable',
    path: '/Admin',
    icon: icon('ic_lock'),
    role   : ["ADMIN"]
  },
  {
    title: 'MedecinTable',
    path: '/Medecin',
    icon: icon('ic_user'),
    role : ['ADMIN']
  },
  {
    title: 'PatientTable',
    path: '/Patient',
    icon: icon('ic_cart'),
    role : ["ADMIN"]
  },
  {
    title: 'AppointmentTable',
    path: '/Appointment',
    icon: icon('ic_blog'),
    role : ["ADMIN"]
  },
  {
    title: 'Profile',
    path: '/ProfileView',
    icon: icon('ic_lock'),
    role   : ["ADMIN"]
  },
  {
    title: 'BookAdoctor',
    path: '/BookAdoctor',
    icon: icon('ic_lock'),
    role   : ["PATIENT"]
  },
  {
    title: 'Appointment',
    path: '/PatientAppointment',
    icon: icon('ic_lock'),
    role   : ["PATIENT"]
  },
  {
    title: 'Profile',
    path: '/ProfileView',
    icon: icon('ic_lock'),
    role   : ["PATIENT"]
  },
  {
    title: 'Available Appointments',
    path: '/MedecinAppointments',
    icon: icon('ic_lock'),
    role   : ["DOCTOR"]
  },
  {
    title: 'Sessions',
    path: '/MedecinSession',
    icon: icon('ic_analytics'),
    role : ['DOCTOR']
  },
  {
    title: 'Profile',
    path: '/ProfileView',
    icon: icon('ic_lock'),
    role   : ["DOCTOR"]
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
