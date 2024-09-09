package org.example.doctor_appointement_app.dto;

public class PatientDto extends UserDto {
    private String medicalHistory;

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
}
