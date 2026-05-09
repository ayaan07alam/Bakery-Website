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
    private String phone = "+91 95631 71459";

    @Column(nullable = false)
    private String email = "bakerysaha18@gmail.com";

    @Column(columnDefinition = "TEXT")
    private String address = "Gorabazar, Berhampore, West Bengal 742101";

    private String openingHours = "7:00 AM - 10:00 PM";

    // Social Media Links
    private String facebookUrl = "#";
    private String instagramUrl = "#";
    private String twitterUrl = "#";

    // Hero Section Defaults
    private String heroTitleDefault = "Welcome to Saha Bakery";
    private String heroSubtitleDefault = "Baking happiness with traditional recipes since 1978.";

    // ===== ABOUT PAGE =====

    // About Hero Section
    private String aboutHeroImage = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000";
    private String aboutHeroBadge = "Since 1978";
    private String aboutHeroTitle = "Our Story";
    private String aboutHeroSubtitle = "Baking happiness for nearly 50 years in the heart of Kolkata.";

    // About Story Section
    private String aboutContentTitle = "Tradition Meets Passion";
    @Column(columnDefinition = "TEXT")
    private String aboutContentText = "Founded in 1978 by the Saha family, our bakery started as a humble storefront on Park Street with a single mission: to bring authentic, high-quality baked goods to our community.\n\nWhat began with just a few signature loaves of bread and simple tea cakes has grown into one of Kolkata's most beloved baking institutions. Despite our growth, our core philosophy remains unchanged – we never compromise on quality, we use only the finest ingredients, and we bake with love.";
    private String aboutContentImage = "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000";

    // About Stats
    private String aboutStat1Number = "45+";
    private String aboutStat1Label = "Years of Trust";
    private String aboutStat2Number = "1M+";
    private String aboutStat2Label = "Happy Customers";

    // About Core Values (3 cards)
    private String aboutValue1Title = "Premium Quality";
    @Column(columnDefinition = "TEXT")
    private String aboutValue1Desc = "We use only Grade-A ingredients sourced from trusted local suppliers and top global brands.";

    private String aboutValue2Title = "Made with Love";
    @Column(columnDefinition = "TEXT")
    private String aboutValue2Desc = "Every product is handcrafted by our team of master bakers who treat baking as an art form.";

    private String aboutValue3Title = "100% Eggless Options";
    @Column(columnDefinition = "TEXT")
    private String aboutValue3Desc = "We are famous for our extensive range of 100% eggless cakes that taste just as divine.";

    // About Team Section
    private String aboutTeamTitle = "Meet The Makers";
    @Column(columnDefinition = "TEXT")
    private String aboutTeamSubtitle = "Behind every delicious pastry is a team of dedicated professionals who wake up before dawn to ensure your morning bread is fresh.";

    private String aboutTeam1Image = "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=500&fit=crop";
    private String aboutTeam1Name = "";
    private String aboutTeam1Role = "";

    private String aboutTeam2Image = "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=500&fit=crop";
    private String aboutTeam2Name = "";
    private String aboutTeam2Role = "";

    private String aboutTeam3Image = "https://images.unsplash.com/photo-1539543424-3867b60db848?w=400&h=500&fit=crop";
    private String aboutTeam3Name = "";
    private String aboutTeam3Role = "";

    private String aboutTeam4Image = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&h=500&fit=crop";
    private String aboutTeam4Name = "";
    private String aboutTeam4Role = "";
}
