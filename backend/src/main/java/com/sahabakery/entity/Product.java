package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private BigDecimal price;

    private String imageUrl; // Storing relative path or URL

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean available = true;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean showPrice = true;

    private String weight;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "label_id")
    private ProductLabel label;
}
