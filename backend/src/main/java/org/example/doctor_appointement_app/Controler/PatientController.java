package org.example.doctor_appointement_app.Controler;



import org.example.doctor_appointement_app.dto.PatientDto;
import org.example.doctor_appointement_app.model.Patient;
import org.example.doctor_appointement_app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*", allowedHeaders = "*") // This allows all origins

public class PatientController {
    @Autowired
    private PatientService patientService;
    @GetMapping()
    public List<Patient> getAllPatients() {
        return patientService.getAllPatient();
    }
    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        if (patient.isPresent()) {
            PatientDto patientDto = new PatientDto();
            patientDto.setId(patient.get().getId());
            patientDto.setUsername(patient.get().getUsername());
            patientDto.setEmail(patient.get().getEmail());
            patientDto.setRole(patient.get().getRole());
            patientDto.setMedicalHistory(patient.get().getMedicalHistory());
            return ResponseEntity.ok(patientDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setUsername(patientDto.getUsername());
        patient.setEmail(patientDto.getEmail());
        patient.setRole(patientDto.getRole());
        patient.setMedicalHistory(patientDto.getMedicalHistory());
        patient.setPassword(patientDto.getPassword());
        Patient createdPatient = patientService.savePatient(patient);
        patientDto.setId(createdPatient.getId());
        return ResponseEntity.ok(patientDto);
    }

        @PutMapping("/{id}")
        public ResponseEntity<PatientDto> updatePatient(@PathVariable Long id, @RequestBody PatientDto patientDto) {
            Optional<Patient> patient = patientService.getPatientById(id);
            if (patient.isPresent()) {
                Patient existingPatient = patient.get();
                existingPatient.setUsername(patientDto.getUsername());
                existingPatient.setEmail(patientDto.getEmail());
                existingPatient.setRole(patientDto.getRole());
                existingPatient.setMedicalHistory(patientDto.getMedicalHistory());
                if (patientDto.getPassword() != null) {
                    existingPatient.setPassword(patientDto.getPassword());
                }
                Patient updatedPatient = patientService.savePatient(existingPatient);
                patientDto.setId(updatedPatient.getId());
                return ResponseEntity.ok(patientDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
