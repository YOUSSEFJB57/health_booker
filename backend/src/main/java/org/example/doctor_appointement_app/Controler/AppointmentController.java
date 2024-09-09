package org.example.doctor_appointement_app.Controler;


import org.example.doctor_appointement_app.dto.AppointmentDto;
import org.example.doctor_appointement_app.model.Appointment;
import org.example.doctor_appointement_app.model.Medecin;
import org.example.doctor_appointement_app.model.Patient;
import org.example.doctor_appointement_app.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*", allowedHeaders = "*") // This allows all origins

public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointment() {
        return appointmentService.getAllAppointment();
    }
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
        if (appointment.isPresent()) {
            AppointmentDto appointmentDto = new AppointmentDto();
            appointmentDto.setId(appointment.get().getId());
            appointmentDto.setAppointmentTime(appointment.get().getAppointmentTime());
            appointmentDto.setPatientId(appointment.get().getPatient().getId());
            appointmentDto.setMedecinId(appointment.get().getMedecin().getId());
            appointmentDto.setStatus(appointment.get().getStatus());
            return ResponseEntity.ok(appointmentDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();
        appointment.setAppointmentTime(appointmentDto.getAppointmentTime());
        Patient patient = new Patient();
        patient.setId(appointmentDto.getPatientId());
        appointment.setPatient(patient);
        Medecin medecin = new Medecin();
        medecin.setId(appointmentDto.getMedecinId());
        appointment.setMedecin(medecin);
        appointment.setStatus(appointmentDto.getStatus());
        Appointment createdAppointment = appointmentService.saveAppointment(appointment);
        appointmentDto.setId(createdAppointment.getId());
        return ResponseEntity.ok(appointmentDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointmentStatus(@PathVariable Long id, @RequestBody AppointmentDto appointmentDto) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
        if (appointment.isPresent()) {
            Appointment existingAppointment = appointment.get();
            existingAppointment.setStatus(appointmentDto.getStatus());
            Appointment updatedAppointment = appointmentService.saveAppointment(existingAppointment);
            appointmentDto.setId(updatedAppointment.getId());
            appointmentDto.setAppointmentTime(updatedAppointment.getAppointmentTime());
            appointmentDto.setPatientId(updatedAppointment.getPatient().getId());
            appointmentDto.setMedecinId(updatedAppointment.getMedecin().getId());
            return ResponseEntity.ok(appointmentDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByMedecin(@PathVariable Long medecinId) {
        Medecin medecin = new Medecin();
        medecin.setId(medecinId);
        List<Appointment> appointments = appointmentService.getAppointmentsByMedecin(medecin);
        List<AppointmentDto> appointmentDtos = appointments.stream().map(appointment -> {
            AppointmentDto dto = new AppointmentDto();
            dto.setId(appointment.getId());
            dto.setAppointmentTime(appointment.getAppointmentTime());
            dto.setPatientId(appointment.getPatient().getId());
            dto.setMedecinId(appointment.getMedecin().getId());
            dto.setStatus(appointment.getStatus());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(appointmentDtos);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatient(@PathVariable Long patientId) {
        Patient patient = new Patient();
        patient.setId(patientId);
        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patient);
        List<AppointmentDto> appointmentDtos = appointments.stream().map(appointment -> {
            AppointmentDto dto = new AppointmentDto();
            dto.setId(appointment.getId());
            dto.setAppointmentTime(appointment.getAppointmentTime());
            dto.setPatientId(appointment.getPatient().getId());
            dto.setMedecinId(appointment.getMedecin().getId());
            dto.setStatus(appointment.getStatus());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(appointmentDtos);
    }

    }

