package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "customer_reviews")
public class CustomerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private int rating; // 1-5

    @Column(length = 2000)
    private String comment;

    private String imageUrl; // URL of customer image

    private boolean active = true; // Show/Hide review

    private LocalDateTime createdAt = LocalDateTime.now();

    public CustomerReview(String customerName, int rating, String comment, String imageUrl) {
        this.customerName = customerName;
        this.rating = rating;
        this.comment = comment;
        this.imageUrl = imageUrl;
    }
}
