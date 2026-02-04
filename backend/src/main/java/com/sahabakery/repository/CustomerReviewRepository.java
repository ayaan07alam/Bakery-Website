package com.sahabakery.repository;

import com.sahabakery.entity.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {
    List<CustomerReview> findByActiveTrueOrderByCreatedAtDesc();
}
