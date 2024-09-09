package org.example.doctor_appointement_app.Controler;



import org.example.doctor_appointement_app.model.Medecin;
import org.example.doctor_appointement_app.model.Patient;
import org.example.doctor_appointement_app.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medecins")
@CrossOrigin(origins = "*", allowedHeaders = "*") // This allows all origins

public class MedecinController {
    @Autowired
    private MedecinService medecinService;

    @GetMapping()
    public List<Medecin> getAllMedecins() {return  medecinService.getAllMedcin();  }

    @GetMapping("/{id}")
    public ResponseEntity<Medecin> getMedecinById(@PathVariable Long id) {
        Optional<Medecin> medecin = medecinService.getMedecinById(id);
        return medecin.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medecin> createMedecin(@RequestBody Medecin medecin) {
        Medecin createdMedecin = medecinService.saveMedecin(medecin);
        return ResponseEntity.ok(createdMedecin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medecin> updateMedecin(@PathVariable Long id, @RequestBody Medecin medecinDetails) {
        Optional<Medecin> medecin = medecinService.getMedecinById(id);
        if (medecin.isPresent()) {
            Medecin existingMedecin = medecin.get();
            existingMedecin.setSpecialty(medecinDetails.getSpecialty());
            Medecin updatedMedecin = medecinService.saveMedecin(existingMedecin);
            return ResponseEntity.ok(updatedMedecin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedecin(@PathVariable Long id) {
        medecinService.deleteMedecin(id);
        return ResponseEntity.noContent().build();
    }
}

