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
    public List<ProductLabel> getAllLabels() {
        return labelRepository.findAll();
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
