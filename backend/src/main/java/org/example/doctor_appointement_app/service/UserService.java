package org.example.doctor_appointement_app.service;



import org.example.doctor_appointement_app.model.AppUser;
import org.example.doctor_appointement_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public AppUser saveUser(AppUser user) {
        return userRepository.save(user);
    }

    public Optional<AppUser> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<AppUser> loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
    public AppUser findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
