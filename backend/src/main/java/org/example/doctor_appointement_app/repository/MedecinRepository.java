package org.example.doctor_appointement_app.repository;

import org.example.doctor_appointement_app.model.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedecinRepository extends JpaRepository<Medecin, Long> {
}
