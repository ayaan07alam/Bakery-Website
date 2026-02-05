package com.sahabakery.controller;

import com.sahabakery.entity.SiteSettings;
import com.sahabakery.repository.SiteSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/site-settings")
public class SiteSettingsController {

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    @GetMapping
    public ResponseEntity<?> getSettings() {
        try {
            return siteSettingsRepository.findById(1L)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        // Create default settings if not exists
                        SiteSettings settings = new SiteSettings();
                        settings.setId(1L);
                        settings.setPhone("+91 95631 71459");
                        settings.setEmail("bakerysaha18@gmail.com");
                        settings.setAddress("Gorabazar, Berhampore, West Bengal 742101");
                        try {
                            return ResponseEntity.ok(siteSettingsRepository.save(settings));
                        } catch (Exception e) {
                            // If table is missing, this will fail
                            e.printStackTrace();
                            return ResponseEntity.internalServerError().build();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching settings: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<SiteSettings> updateSettings(@RequestBody SiteSettings settings) {
        settings.setId(1L); // Ensure singleton
        SiteSettings saved = siteSettingsRepository.save(settings);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/initialize")
    public ResponseEntity<SiteSettings> initializeSettings() {
        if (!siteSettingsRepository.existsById(1L)) {
            SiteSettings settings = new SiteSettings();
            settings.setId(1L);
            settings.setPhone("+91 95631 71459");
            settings.setEmail("bakerysaha18@gmail.com");
            settings.setAddress("Gorabazar, Berhampore, West Bengal 742101");
            siteSettingsRepository.save(settings);
            return ResponseEntity.ok(settings);
        }
        return siteSettingsRepository.findById(1L)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
