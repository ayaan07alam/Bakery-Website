package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "product_labels")
public class ProductLabel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Trending", "New", "Best Seller"

    private String color; // Hex code for background, e.g., "#FF0000"

    private String textColor; // Hex code for text, e.g., "#FFFFFF"

    public ProductLabel(String name, String color, String textColor) {
        this.name = name;
        this.color = color;
        this.textColor = textColor;
    }
}
