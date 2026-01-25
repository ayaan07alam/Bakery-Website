package com.sahabakery.repository;

import com.sahabakery.entity.CatalogueDownload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CatalogueDownloadRepository extends JpaRepository<CatalogueDownload, Long> {
    List<CatalogueDownload> findAllByOrderByDownloadedAtDesc();
}
