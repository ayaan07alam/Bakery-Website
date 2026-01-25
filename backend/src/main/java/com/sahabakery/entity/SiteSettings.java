package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "site_settings")
public class SiteSettings {

    @Id
    private Long id = 1L; // Singleton - only one record

    @Column(nullable = false)
    private String siteName = "Saha Bakery";

    private String tagline = "Freshly Baked Happiness!";

    private String logoUrl = "/logo.png";

    // Contact Information
    @Column(nullable = false)
    private String phone = "+91 98765 43210";

    @Column(nullable = false)
    private String email = "contact@sahabakery.com";

    @Column(columnDefinition = "TEXT")
    private String address = "123 Bakery Street, Park Street, Kolkata, WB 700016";

    private String openingHours = "7:00 AM - 10:00 PM";

    // Social Media Links
    private String facebookUrl = "#";
    private String instagramUrl = "#";
    private String twitterUrl = "#";

    // Hero Section Defaults
    private String heroTitleDefault = "Welcome to Saha Bakery";
    private String heroSubtitleDefault = "Baking happiness with traditional recipes since 1978.";
}
