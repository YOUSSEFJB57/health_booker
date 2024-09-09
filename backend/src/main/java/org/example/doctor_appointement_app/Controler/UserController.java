package org.example.doctor_appointement_app.Controler;

import org.example.doctor_appointement_app.dto.LogingRequestDto;
import org.example.doctor_appointement_app.dto.UserDto;
import org.example.doctor_appointement_app.model.AppUser;
import org.example.doctor_appointement_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<AppUser> users = userService.getAllUsers();
        List<UserDto> userDtos = users.stream().map(user -> {
            UserDto dto = new UserDto();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
            // Password is not included for security reasons
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        Optional<AppUser> user = userService.getUserById(id);
        if (user.isPresent()) {
            UserDto dto = new UserDto();
            dto.setId(user.get().getId());
            dto.setUsername(user.get().getUsername());
            dto.setEmail(user.get().getEmail());
            dto.setRole(user.get().getRole());
            // Password is not included for security reasons
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        AppUser user = new AppUser();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setPassword(userDto.getPassword());
        AppUser createdUser = userService.saveUser(user);
        userDto.setId(createdUser.getId());
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        Optional<AppUser> user = userService.getUserById(id);
        if (user.isPresent()) {
            AppUser existingUser = user.get();
            existingUser.setUsername(userDto.getUsername());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setRole(userDto.getRole());
            existingUser.setPassword(userDto.getPassword());
            AppUser updatedUser = userService.saveUser(existingUser);
            userDto.setId(updatedUser.getId());
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LogingRequestDto loginRequestDto) {
        Optional<AppUser> user = userService.loginUser(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        if (user.isPresent()) {
            UserDto userDto = new UserDto();
            userDto.setId(user.get().getId());
            userDto.setUsername(user.get().getUsername());
            userDto.setEmail(user.get().getEmail());
            userDto.setRole(user.get().getRole());
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
}
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        AppUser existingUser = userService.findByEmail(userDto.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        AppUser newUser = new AppUser();
        newUser.setUsername(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(userDto.getPassword());
        newUser.setRole(userDto.getRole());

        AppUser savedUser = userService.saveUser(newUser);

        if (savedUser != null) {
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.status(500).body("User registration failed");
        }
    }
}
