package com.sahabakery.controller;

import com.sahabakery.entity.SiteSettings;
import com.sahabakery.repository.SiteSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/site-settings")
@CrossOrigin(origins = "*")
public class SiteSettingsController {

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    @GetMapping
    public ResponseEntity<SiteSettings> getSettings() {
        SiteSettings settings = siteSettingsRepository.findById(1L)
                .orElse(new SiteSettings());
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
