package com.sahabakery.controller;

import com.sahabakery.entity.CatalogueDownload;
import com.sahabakery.repository.CatalogueDownloadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/catalogue")
public class CatalogueController {

    @Autowired
    private CatalogueDownloadRepository catalogueRepository;

    @PostMapping("/download")
    public ResponseEntity<?> recordDownload(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String name = payload.getOrDefault("name", "");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }

        CatalogueDownload download = new CatalogueDownload();
        download.setEmail(email);
        download.setName(name);
        download.setDownloadedAt(LocalDateTime.now());

        catalogueRepository.save(download);
        return ResponseEntity.ok(Map.of("message", "Success", "downloadUrl", "/catalogue.pdf"));
    }

    @GetMapping("/downloads")
    public ResponseEntity<List<CatalogueDownload>> getAllDownloads() {
        List<CatalogueDownload> downloads = catalogueRepository.findAllByOrderByDownloadedAtDesc();
        return ResponseEntity.ok(downloads);
    }
}
