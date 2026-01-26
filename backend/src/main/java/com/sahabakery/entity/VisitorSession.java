package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_sessions")
@Data
public class VisitorSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sessionId; // UUID from frontend

    @Column(nullable = false)
    private LocalDateTime firstVisit;

    @Column(nullable = false)
    private LocalDateTime lastSeen;

    @Column(columnDefinition = "TEXT")
    private String pagesViewed; // JSON array of pages

    @Column(columnDefinition = "TEXT")
    private String productsViewed; // JSON array of product IDs/names

    @Column
    private Integer timeOnSite; // Total seconds

    @Column
    private String deviceInfo; // Browser, OS, etc.

    @Column
    private String referralSource; // Where they came from

    @Column
    private String ipAddress;

    @Column
    private String city;

    @Column
    private String country;

    // If they later provide contact info
    @Column
    private String associatedPhone;

    @Column
    private String associatedEmail;

    @Column
    private Boolean converted = false; // Did they become a lead?

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
