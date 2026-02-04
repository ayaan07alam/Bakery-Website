package com.sahabakery.repository;

import com.sahabakery.entity.ProductLabel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductLabelRepository extends JpaRepository<ProductLabel, Long> {
}
