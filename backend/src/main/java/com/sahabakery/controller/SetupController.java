package com.sahabakery.controller;

import com.sahabakery.entity.User;
import com.sahabakery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/setup")
public class SetupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Manual admin user creation endpoint - only use for initial setup
     * After creating admin, you should disable or remove this endpoint
     */
    @GetMapping("/create-admin")
    public ResponseEntity<?> createAdminUser(@RequestParam String username, @RequestParam String password) {
        Map<String, Object> response = new HashMap<>();

        // Check if user already exists
        if (userRepository.findByUsername(username).isPresent()) {
            response.put("error", "User already exists");
            response.put("username", username);
            return ResponseEntity.badRequest().body(response);
        }

        // Create admin user
        User admin = new User();
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole("ADMIN");
        userRepository.save(admin);

        response.put("success", true);
        response.put("message", "Admin user created successfully");
        response.put("username", username);

        return ResponseEntity.ok(response);
    }

    /**
     * Check if any admin users exist
     */
    @GetMapping("/check-admin")
    public ResponseEntity<?> checkAdminExists() {
        Map<String, Object> response = new HashMap<>();
        long adminCount = userRepository.findAll().stream()
                .filter(u -> "ADMIN".equals(u.getRole()))
                .count();

        response.put("adminUsersExist", adminCount > 0);
        response.put("adminCount", adminCount);
        response.put("totalUsers", userRepository.count());

        return ResponseEntity.ok(response);
    }
}
