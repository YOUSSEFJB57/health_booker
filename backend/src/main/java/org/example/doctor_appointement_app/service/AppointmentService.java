package org.example.doctor_appointement_app.service;



import org.example.doctor_appointement_app.model.Appointment;
import org.example.doctor_appointement_app.model.Medecin;
import org.example.doctor_appointement_app.model.Patient;
import org.example.doctor_appointement_app.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    public List<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAppointmentsByMedecin(Medecin medecin) {
        return appointmentRepository.findByMedecin(medecin);
    }


    public List<Appointment> getAppointmentsByPatient(Patient patient) {
        return appointmentRepository.findByPatient(patient);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }


}
