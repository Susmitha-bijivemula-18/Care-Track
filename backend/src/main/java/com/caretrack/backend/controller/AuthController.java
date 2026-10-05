package com.caretrack.backend.controller;

import com.caretrack.backend.entity.PatientUser;
import com.caretrack.backend.repository.PatientUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final PatientUserRepository patientUserRepository;

    public AuthController(PatientUserRepository patientUserRepository) {
        this.patientUserRepository = patientUserRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody PatientUser user) {
        if (patientUserRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists with this email"));
        }
        
        // Very basic mock encoding for demonstration
        PatientUser savedUser = patientUserRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", "mock-jwt-token-for-" + savedUser.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody PatientUser user) {
        Optional<PatientUser> existingUser = patientUserRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty() || !existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", existingUser.get());
        response.put("token", "mock-jwt-token-for-" + existingUser.get().getId());
        return ResponseEntity.ok(response);
    }
}
