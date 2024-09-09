package org.example.doctor_appointement_app.repository;


import org.example.doctor_appointement_app.model.Appointment;
import org.example.doctor_appointement_app.model.Medecin;
import org.example.doctor_appointement_app.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByMedecin(Medecin medecin);
    List<Appointment> findByPatient(Patient patient);
}

