import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg02 from '../assets/images/test2.jpg';
import heroImg03 from '../assets/images/TEST1.jpg';
import heroImg01 from '../assets/images/test3.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import icon04 from '../assets/images/hero-img03.png';
import icon05 from '../assets/images/test2.jpg';
import icon06 from '../assets/images/faq-img.png';
import { BsArrowRight } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const authState = JSON.parse(storedAuthState);
      setUserRole(authState.user.role);
    }
  }, []);

  const handleBookAppointment = () => {
    const storedAuthState = localStorage.getItem('authState');
    if (!storedAuthState) {
      navigate('/login');
    } else {
      const authState = JSON.parse(storedAuthState);
      const userRole = authState.user.role;
      if (userRole === 'PATIENT') {
        navigate('/BookAdoctor');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <>
      <div>
        <header className="sticky top-0 bg-white shadow">
          <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
            <div className="flex items-center text-2xl">
              <div className="w-12 mr-3"></div>HealthBooker
            </div>
            <div className="hidden md:flex gap-4">
              {userRole ? (
                <>
                  {userRole === 'PATIENT' && (
                    <>
                      <a
                        href="/BookAdoctor"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                      >
                        Doctors
                      </a>
                      <a
                        href="/ProfileView"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white flex items-center"
                      >
                        <FaUserCircle className="mr-2" />
                        Profile
                      </a>
                    </>
                  )}
                  {userRole === 'DOCTOR' && (
                    <>
                      <a
                        href="/MedecinAppointments"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                      >
                        Appointments
                      </a>
                      <a
                        href="/ProfileView"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white flex items-center"
                      >
                        <FaUserCircle className="mr-2" />
                        Profile
                      </a>
                    </>
                  )}
                  {userRole === 'ADMIN' && (
                    <>
                      <a
                        href="/dashboard"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white flex items-center"
                      >
                        <MdDashboard className="mr-2" />
                        Dashboard
                      </a>
                      <a
                        href="/ProfileView"
                        className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white flex items-center"
                      >
                        <FaUserCircle className="mr-2" />
                        Profile
                      </a>
                    </>
                  )}
                </>
              ) : (
                <>
                  <a
                    href="/register"
                    className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                  >
                    Register
                  </a>
                  <a
                    href="/login"
                    className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white"
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="text-gray-900">
          <section className="pt-20 md:pt-40">
            <div className="container mx-auto px-8 lg:flex">
              <div className="text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">
                  Your Health, Our Responsibility
                </h1>
                <p className="text-xl lg:text-2xl mt-6 font-light">
                  Welcome to HealthBooker, where your well-being is our priority. We offer a full range of medical services, from routine check-ups and preventive care to specialized treatments and emergency services. Our dedicated team provides personalized, compassionate care to ensure you receive the best treatment. Trust us to be your health partner, every step of the way.
                </p>
                <p className="mt-8 md:mt-12">
                  <button
                    type="button"
                    className="py-4 px-12 bg-teal-500 hover:bg-teal-600 rounded text-white"
                    onClick={handleBookAppointment}
                  >
                    Get Started
                  </button>
                </p>
                <p className="mt-4 text-gray-600"></p>
              </div>

              <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <img
                  src={heroImg03}
                  alt="Doctor"
                  className="rounded-lg shadow-lg w-80 h-90 object-cover"
                />
              </div>
            </div>
          </section>

          <section id="features" className="py-20 lg:pb-40 lg:pt-48">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-semibold">Main Features</h2>
              <div className="flex flex-col sm:flex-row sm:-mx-3 mt-12">
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="font-semibold text-xl">Online Booking</p>
                    <p className="mt-4">
                      Experience seamless healthcare with our state-of-the-art online booking system, ensuring quick appointments at your convenience.
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="font-semibold text-xl">Instant Notifications</p>
                    <p className="mt-4">
                      Stay informed with instant replies and timely notifications, keeping you updated every step of the way. justo integer odio velna vitae auctor integer.
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="font-semibold text-xl">Continuous Consultation</p>
                    <p className="mt-4">
                      Enjoy continuous consultation and support from our dedicated medical professionals, providing you with comprehensive care whenever you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container mx-auto max-w-[1200px] px-4">
              <div className="lg:w-[470px] mx-auto text-center">
                <h2 className="heading text-center">
                  Providing the best medical services
                </h2>
                <p className="text__para text-center">
                  World-Class care for everyone. Our health system offers unmatched, expert health care.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                <div className="py-[30px] px-5 text-center">
                  <div className="flex items-center justify-center">
                    <img src={icon01} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find a Doctor
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-Class care for everyone. Our health system offers unmatched, expert health care. From the lab to clinic.
                    </p>
                    <button
                      onClick={handleBookAppointment}
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </button>
                  </div>
                </div>

                <div className="py-[30px] px-5 text-center">
                  <div className="flex items-center justify-center">
                    <img src={icon02} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find a Location
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-Class care for everyone. Our health system offers unmatched, expert health care. From the lab to clinic.
                    </p>
                    <button
                      onClick={handleBookAppointment}
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </button>
                  </div>
                </div>

                <div className="py-[30px] px-5 text-center">
                  <div className="flex items-center justify-center">
                    <img src={icon03} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Book Appointment
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-Class care for everyone. Our health system offers unmatched, expert health care. From the lab to clinic.
                    </p>
                    <button
                      onClick={handleBookAppointment}
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-16 items-center flex flex-col lg:flex-row">
              <div className="mt-10 lg:mt-0 w-full lg:w-1/2 order-last lg:order-first flex justify-center lg:justify-end">
                <img
                  src={heroImg02}
                  alt="Doctor"
                  className="rounded-lg shadow-lg w-100 h-100 object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="lg:pl-32 xl:pl-48">
                  <h3 className="text-3xl font-semibold leading-tight">
                    Our Great Doctors
                  </h3>
                  <p className="mt-8 text-xl font-light leading-relaxed">
                    Booking regular appointments is essential for maintaining your health. It allows us to monitor your well-being, catch potential issues early, and provide timely treatments. Your health is our priority, and timely appointments are key to proactive and effective healthcare.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-16 items-center flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="lg:pr-32 xl:pr-48">
                  <h3 className="text-3xl font-semibold leading-tight">
                    Proud to be one of the nation's best
                  </h3>
                  <p className="mt-8 text-xl font-light leading-relaxed">
                    At HealthBooker, we are honored to be among the top healthcare providers, offering state-of-the-art treatments and compassionate care. Trust us for outstanding, personalized medical services.
                  </p>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 w-full lg:w-1/2 flex justify-center lg:justify-start">
                <img
                  src={heroImg01}
                  alt="Healthcare"
                  className="rounded-lg shadow-lg w-100 h-90 object-cover"
                />
              </div>
            </div>
          </section>

          <section id="stats" className="py-20 lg:pt-32 bg-gray-100">
            <div className="container mx-auto text-center">
              <p className="uppercase tracking-wider text-gray-600">Our customers get results</p>
              <div className="flex flex-col sm:flex-row mt-8 lg:px-24">
                <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                  <div
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <p className="text-4xl lg:text-6xl font-semibold text-teal-500">1000+</p>
                    <p className="text-xl font-medium text-gray-700">Satisfied Patients</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                  <div
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <p className="text-4xl lg:text-6xl font-semibold text-teal-500">250+</p>
                    <p className="text-xl font-medium text-gray-700">Verified Doctors</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/3">
                  <div
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <p className="text-4xl lg:text-6xl font-semibold text-teal-500">75+</p>
                    <p className="text-xl font-medium text-gray-700">Specialist Doctors</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-20 lg:py-40">
            <div className="container mx-auto">
              <p className="uppercase tracking-wider mb-8 text-gray-600 text-center">What Our Patients are saying</p>
              <div className="flex flex-col md:flex-row md:-mx-3">
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="text-xl font-semibold">"An incredible experience"</p>
                    <p className="mt-6">
                      "The service provided was exceptional. I felt well cared for and the staff were incredibly professional. Highly recommended!"
                    </p>
                    <div className="flex items-center mt-8">
                      <img
                        className="w-12 h-12 mr-4 rounded-full"
                        src={icon04}
                        alt="Dr Tazi"
                      />
                      <div>
                        <p>Dr Tazi</p>
                        <p className="text-sm text-gray-600">Plastic Surgeon.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="text-xl font-semibold">"Outstanding care and support"</p>
                    <p className="mt-6">
                      "From the moment I walked in, I knew I was in good hands. The team was attentive and made sure all my concerns were addressed."
                    </p>
                    <div className="flex items-center mt-8">
                      <img
                        className="w-12 h-12 mr-4 rounded-full"
                        src={icon05}
                        alt="Dr Metrouf"
                      />
                      <div>
                        <p>Dr Metrouf</p>
                        <p className="text-sm text-gray-600">Surgeon</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: '0 10px 28px rgba(0,0,0,.08)' }}
                  >
                    <p className="text-xl font-semibold">"Highly professional and friendly"</p>
                    <p className="mt-6">
                      "The doctors here are top-notch. They took the time to explain everything in detail and made me feel at ease throughout the process."
                    </p>
                    <div className="flex items-center mt-8">
                      <img
                        className="w-12 h-12 mr-4 rounded-full"
                        src={icon06}
                        alt="Jane Smith"
                      />
                      <div>
                        <p>Dr Mordy</p>
                        <p className="text-sm text-gray-600">General Practitioner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto my-20 py-24 bg-gray-200 rounded-lg text-center">
            <h3 className="text-5xl font-semibold">BOOK YOUR APPOINTMENT NOW !!</h3>

            <p className="mt-8">
              <button
                type="button"
                className="py-5 px-16 text-lg bg-teal-500 hover:bg-teal-600 rounded text-white"
                onClick={handleBookAppointment}
              >
                Book appointment
              </button>
            </p>
          </section>
        </main>

        <footer className="container mx-auto py-16 px-3 mt-48 mb-8 text-gray-800">
          <div className="flex -mx-3">
            <div className="flex-1 px-3">
              <h2 className="text-lg font-semibold">About HealthBooker</h2>
              <p className="mt-5">
                HealthBooker is your trusted partner for finding and booking appointments with top medical professionals. Our mission is to provide a seamless and efficient way to connect patients with doctors specializing in various fields.
              </p>
            </div>
            <div className="flex-1 px-3">
              <h2 className="text-lg font-semibold">Important Links</h2>
              <ul className="mt-4 leading-loose">
                <li>
                  <a href="/terms">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="flex-1 px-3">
              <h2 className="text-lg font-semibold">Follow Us</h2>
              <ul className="mt-4 leading-loose">
                <li>
                  <a href="https://twitter.com/healthbooker">Twitter</a>
                </li>
                <li>
                  <a href="https://facebook.com/healthbooker">Facebook</a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/healthbooker">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
