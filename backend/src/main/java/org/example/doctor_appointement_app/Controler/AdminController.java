package org.example.doctor_appointement_app.Controler;



import org.example.doctor_appointement_app.dto.UserDto;
import org.example.doctor_appointement_app.model.Administrator;
import org.example.doctor_appointement_app.model.AppUser;
import org.example.doctor_appointement_app.model.AppUser;
import org.example.doctor_appointement_app.service.AdministratorService;
import org.example.doctor_appointement_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*") // This allows all origins

public class AdminController {

    @Autowired
    private AdministratorService administratorService;

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) {
        Optional<AppUser> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users")
    public ResponseEntity<AppUser> createUser(@RequestBody UserDto userDto) {
        AppUser user = new AppUser();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setPassword(userDto.getPassword());
        AppUser createdUser = userService.saveUser(user);
        userDto.setId(createdUser.getId());
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        Optional<AppUser> user = userService.getUserById(id);
        if (user.isPresent()) {
            AppUser existingUser = user.get();
            existingUser.setUsername(userDto.getUsername());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setRole(userDto.getRole());
            if (userDto.getPassword() != null) {
                existingUser.setPassword(userDto.getPassword());
            }
            AppUser updatedUser = userService.saveUser(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    // Administrator endpoints
    @GetMapping("/administrators")
    public ResponseEntity<List<Administrator>> getAllAdministrators() {
        List<Administrator> administrators = administratorService.getAllAdministrators();
        return ResponseEntity.ok(administrators);
    }

    @GetMapping("/administrators/{id}")
    public ResponseEntity<Administrator> getAdministratorById(@PathVariable Long id) {
        Optional<Administrator> administrator = administratorService.getAdministratorById(id);
        return administrator.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/administrators")
    public ResponseEntity<Administrator> createAdministrator(@RequestBody UserDto userDto) {
        Administrator administrator = new Administrator();
        administrator.setUsername(userDto.getUsername());
        administrator.setEmail(userDto.getEmail());
        administrator.setRole(userDto.getRole());
        administrator.setPassword(userDto.getPassword());
        Administrator createdAdministrator = administratorService.saveAdministrator(administrator);
        userDto.setId(createdAdministrator.getId());
        return ResponseEntity.ok(createdAdministrator);
    }

    @PutMapping("/administrators/{id}")
    public ResponseEntity<Administrator> updateAdministrator(@PathVariable Long id, @RequestBody UserDto userDto) {
        Optional<Administrator> administrator = administratorService.getAdministratorById(id);
        if (administrator.isPresent()) {
            Administrator existingAdministrator = administrator.get();
            existingAdministrator.setUsername(userDto.getUsername());
            existingAdministrator.setEmail(userDto.getEmail());
            existingAdministrator.setRole(userDto.getRole());
            if (userDto.getPassword() != null) {
                existingAdministrator.setPassword(userDto.getPassword());
            }
            Administrator updatedAdministrator = administratorService.saveAdministrator(existingAdministrator);
            return ResponseEntity.ok(updatedAdministrator);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/administrators/{id}")
    public ResponseEntity<Void> deleteAdministrator(@PathVariable Long id) {
        administratorService.deleteAdministrator(id);
        return ResponseEntity.noContent().build();
    }
}
