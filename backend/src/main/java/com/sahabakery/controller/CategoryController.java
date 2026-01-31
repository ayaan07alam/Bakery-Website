package com.sahabakery.controller;

import com.sahabakery.entity.Category;
import com.sahabakery.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@SuppressWarnings("null")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private com.sahabakery.service.FileUploadService fileUploadService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryRepository.findById(id)
                .map(existing -> {
                    existing.setName(category.getName());
                    // Add other fields if Category entity has them (e.g. description, imageUrl)
                    return categoryRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws java.io.IOException {
        return fileUploadService.uploadFile(file);
    }
}
