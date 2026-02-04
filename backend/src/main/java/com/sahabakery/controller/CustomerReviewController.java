package com.sahabakery.controller;

import com.sahabakery.entity.CustomerReview;
import com.sahabakery.repository.CustomerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class CustomerReviewController {

    @Autowired
    private CustomerReviewRepository reviewRepository;

    // Get all reviews (for Admin)
    @GetMapping("/all")
    public List<CustomerReview> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Get only active reviews (for Public UI)
    @GetMapping
    public List<CustomerReview> getActiveReviews() {
        return reviewRepository.findByActiveTrueOrderByCreatedAtDesc();
    }

    @PostMapping
    public CustomerReview createReview(@RequestBody CustomerReview review) {
        return reviewRepository.save(review);
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
