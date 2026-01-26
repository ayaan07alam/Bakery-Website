package com.sahabakery.repository;

import com.sahabakery.entity.VisitorSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitorSessionRepository extends JpaRepository<VisitorSession, Long> {

    Optional<VisitorSession> findBySessionId(String sessionId);

    List<VisitorSession> findByConverted(Boolean converted);

    List<VisitorSession> findByAssociatedPhoneIsNotNull();

    List<VisitorSession> findByFirstVisitAfter(LocalDateTime date);

    @Query("SELECT v FROM VisitorSession v WHERE v.timeOnSite > :minSeconds ORDER BY v.timeOnSite DESC")
    List<VisitorSession> findEngagedVisitors(Integer minSeconds);

    @Query("SELECT COUNT(v) FROM VisitorSession v WHERE v.firstVisit >= :startDate")
    Long countVisitorsSince(LocalDateTime startDate);
}
