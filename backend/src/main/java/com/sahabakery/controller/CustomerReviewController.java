package com.sahabakery.controller;

import com.sahabakery.entity.CustomerReview;
import com.sahabakery.repository.CustomerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class CustomerReviewController {

    @Autowired
    private CustomerReviewRepository reviewRepository;

    // Get all reviews (for Admin)
    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        try {
            return ResponseEntity.ok(reviewRepository.findAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching all reviews: " + e.getMessage());
        }
    }

    // Get only active reviews (for Public UI)
    @GetMapping
    public ResponseEntity<?> getActiveReviews() {
        try {
            return ResponseEntity.ok(reviewRepository.findByActiveTrueOrderByCreatedAtDesc());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching active reviews: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody CustomerReview review) {
        try {
            return ResponseEntity.ok(reviewRepository.save(review));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error creating review: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerReview> updateReview(@PathVariable Long id,
            @RequestBody CustomerReview reviewDetails) {
        return reviewRepository.findById(id).map(review -> {
            review.setCustomerName(reviewDetails.getCustomerName());
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            review.setImageUrl(reviewDetails.getImageUrl());
            review.setActive(reviewDetails.isActive());
            return ResponseEntity.ok(reviewRepository.save(review));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
