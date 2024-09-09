package org.example.doctor_appointement_app.service;



import org.example.doctor_appointement_app.model.Medecin;
import org.example.doctor_appointement_app.model.Patient;
import org.example.doctor_appointement_app.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedecinService {
    @Autowired
    private MedecinRepository medecinRepository;


    public List<Medecin> getAllMedcin(){ return  medecinRepository.findAll();};

    public Medecin saveMedecin(Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    public Optional<Medecin> getMedecinById(Long id) {
        return medecinRepository.findById(id);
    }

    public void deleteMedecin(Long id) {
        medecinRepository.deleteById(id);
    }
}
