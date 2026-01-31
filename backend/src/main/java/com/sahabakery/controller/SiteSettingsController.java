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
    public ResponseEntity<SiteSettings> getSettings() {
        // Force update the settings for the user
        SiteSettings settings = new SiteSettings();
        settings.setId(1L);
        settings.setPhone("+91 95631 71459");
        settings.setEmail("bakerysaha18@gmail.com");
        settings.setAddress("Gorabazar, Berhampore, West Bengal 742101");
        settings.setFacebookUrl("#");
        settings.setInstagramUrl("#");
        settings.setTwitterUrl("#");

        // Save these correct settings back to DB so we don't need this hardcode forever
        siteSettingsRepository.save(settings);

        return ResponseEntity.ok(settings);
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
            siteSettingsRepository.save(settings);
            return ResponseEntity.ok(settings);
        }
        return getSettings();
    }
}
