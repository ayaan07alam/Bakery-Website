package com.sahabakery.repository;

import com.sahabakery.entity.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Long> {
    // Singleton pattern - only one record with id=1
}
