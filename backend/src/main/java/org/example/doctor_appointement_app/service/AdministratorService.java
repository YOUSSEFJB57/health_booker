package org.example.doctor_appointement_app.service;



import org.example.doctor_appointement_app.model.Administrator;
import org.example.doctor_appointement_app.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class    AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;
    public List<Administrator> getAllAdministrators() { return administratorRepository.findAll(); }
    public Administrator saveAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    public Optional<Administrator> getAdministratorById(Long id) {
        return administratorRepository.findById(id);
    }

    public void deleteAdministrator(Long id) {
        administratorRepository.deleteById(id);
    }

    // Add more methods as needed
}
