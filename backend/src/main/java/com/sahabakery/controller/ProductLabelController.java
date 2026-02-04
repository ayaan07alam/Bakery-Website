package com.sahabakery.controller;

import com.sahabakery.entity.ProductLabel;
import com.sahabakery.repository.ProductLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-labels")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class ProductLabelController {

    @Autowired
    private ProductLabelRepository labelRepository;

    @GetMapping
    public ResponseEntity<?> getAllLabels() {
        try {
            return ResponseEntity.ok(labelRepository.findAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching labels: " + e.getMessage());
        }
    }

    @PostMapping
    public ProductLabel createLabel(@RequestBody ProductLabel label) {
        return labelRepository.save(label);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long id) {
        labelRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
