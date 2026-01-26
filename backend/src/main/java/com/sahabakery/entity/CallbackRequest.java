package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "callback_requests")
@Data
public class CallbackRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String phoneNumber;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String preferredTime; // e.g., "Morning", "Afternoon", "Evening", or specific time

    @Column
    private String preferredDate; // Optional specific date

    @Column(columnDefinition = "TEXT")
    private String message; // Optional message from user

    @Column
    private String pageWhenRequested; // Which page they were on

    @Column
    private String productInterest; // Product they were viewing

    @Column
    private String visitorSessionId; // Link to VisitorSession

    @Column
    private String source; // "phone_modal", "callback_widget", "whatsapp", "contact_form"

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, CONTACTED, COMPLETED, CANCELLED

    @Column
    private Boolean whatsappOptIn = false;

    @Column
    private LocalDateTime contactedAt;

    @Column(columnDefinition = "TEXT")
    private String notes; // Admin notes after contact

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
