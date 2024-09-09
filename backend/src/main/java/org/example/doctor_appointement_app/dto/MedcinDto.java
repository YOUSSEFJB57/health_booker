package org.example.doctor_appointement_app.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import org.example.doctor_appointement_app.model.Appointment;

import java.util.List;

public class MedcinDto {

    private String specialty;

    @OneToMany(mappedBy = "medecin", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Appointment> appointments;

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
