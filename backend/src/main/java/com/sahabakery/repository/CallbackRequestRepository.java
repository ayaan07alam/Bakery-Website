package com.sahabakery.repository;

import com.sahabakery.entity.CallbackRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CallbackRequestRepository extends JpaRepository<CallbackRequest, Long> {

    List<CallbackRequest> findByStatus(String status);

    List<CallbackRequest> findByPhoneNumber(String phoneNumber);

    List<CallbackRequest> findByVisitorSessionId(String visitorSessionId);

    List<CallbackRequest> findByCreatedAtAfter(LocalDateTime date);

    List<CallbackRequest> findByStatusOrderByCreatedAtDesc(String status);

    Long countByStatus(String status);

    List<CallbackRequest> findAllByOrderByCreatedAtDesc();
}
