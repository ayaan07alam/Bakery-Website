package com.sahabakery.controller;

import com.sahabakery.entity.HeroSlide;
import com.sahabakery.repository.HeroSlideRepository;
import com.sahabakery.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/hero-slides")
@CrossOrigin(origins = "*")
public class HeroSlideController {

    @Autowired
    private HeroSlideRepository heroSlideRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping
    public ResponseEntity<List<HeroSlide>> getAllSlides() {
        List<HeroSlide> slides = heroSlideRepository.findAllByOrderByDisplayOrderAsc();
        return ResponseEntity.ok(slides);
    }

    @GetMapping("/active")
    public ResponseEntity<List<HeroSlide>> getActiveSlides() {
        List<HeroSlide> slides = heroSlideRepository.findByActiveOrderByDisplayOrderAsc(true);
        return ResponseEntity.ok(slides);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HeroSlide> getSlideById(@PathVariable Long id) {
        return heroSlideRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HeroSlide> createSlide(@RequestBody HeroSlide slide) {
        if (slide.getDisplayOrder() == null) {
            int maxOrder = heroSlideRepository.findAll().stream()
                    .mapToInt(HeroSlide::getDisplayOrder)
                    .max()
                    .orElse(0);
            slide.setDisplayOrder(maxOrder + 1);
        }
        HeroSlide saved = heroSlideRepository.save(slide);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeroSlide> updateSlide(@PathVariable Long id, @RequestBody HeroSlide slide) {
        return heroSlideRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(slide.getTitle());
                    existing.setSubtitle(slide.getSubtitle());
                    existing.setImageUrl(slide.getImageUrl());
                    existing.setCtaText(slide.getCtaText());
                    existing.setCtaLink(slide.getCtaLink());
                    existing.setDisplayOrder(slide.getDisplayOrder());
                    existing.setActive(slide.getActive());
                    return ResponseEntity.ok(heroSlideRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable Long id) {
        return heroSlideRepository.findById(id)
                .map(slide -> {
                    try {
                        fileUploadService.deleteFile(slide.getImageUrl());
                    } catch (IOException e) {
                        // Log error but continue deletion
                    }
                    heroSlideRepository.delete(slide);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }
}
