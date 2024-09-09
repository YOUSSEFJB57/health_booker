package org.example.doctor_appointement_app.repository;

import org.example.doctor_appointement_app.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmailAndPassword(String email, String password);
    AppUser findByEmail(String email);

}
