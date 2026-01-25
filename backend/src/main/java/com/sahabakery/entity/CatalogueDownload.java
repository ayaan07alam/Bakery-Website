package com.sahabakery.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "catalogue_download")
public class CatalogueDownload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    private String name;

    @Column(nullable = false)
    private LocalDateTime downloadedAt = LocalDateTime.now();
}
