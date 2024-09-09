package org.example.doctor_appointement_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Medecin extends AppUser {
    @Column(nullable = false)
    private String specialty;

    @OneToMany(mappedBy = "medecin", cascade = CascadeType.REMOVE)
    @JsonBackReference // Prevents serialization of the appointments in Medecin
    private List<Appointment> appointments;

    // Getters and Setters
    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
