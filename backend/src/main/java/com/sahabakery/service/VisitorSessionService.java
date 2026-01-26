package com.sahabakery.service;

import com.sahabakery.entity.VisitorSession;
import com.sahabakery.repository.VisitorSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VisitorSessionService {

    @Autowired
    private VisitorSessionRepository visitorSessionRepository;

    public VisitorSession createOrUpdateSession(VisitorSession session) {
        Optional<VisitorSession> existing = visitorSessionRepository.findBySessionId(session.getSessionId());

        if (existing.isPresent()) {
            VisitorSession existingSession = existing.get();
            existingSession.setLastSeen(LocalDateTime.now());
            existingSession.setPagesViewed(session.getPagesViewed());
            existingSession.setProductsViewed(session.getProductsViewed());
            existingSession.setTimeOnSite(session.getTimeOnSite());
            return visitorSessionRepository.save(existingSession);
        } else {
            session.setFirstVisit(LocalDateTime.now());
            session.setLastSeen(LocalDateTime.now());
            return visitorSessionRepository.save(session);
        }
    }

    public Optional<VisitorSession> getSessionBySessionId(String sessionId) {
        return visitorSessionRepository.findBySessionId(sessionId);
    }

    public List<VisitorSession> getAllSessions() {
        return visitorSessionRepository.findAll();
    }

    public List<VisitorSession> getEngagedVisitors(Integer minSeconds) {
        return visitorSessionRepository.findEngagedVisitors(minSeconds);
    }

    public List<VisitorSession> getConvertedLeads() {
        return visitorSessionRepository.findByConverted(true);
    }

    public Long getVisitorCountSince(LocalDateTime date) {
        return visitorSessionRepository.countVisitorsSince(date);
    }

    public void associateContactInfo(String sessionId, String phone, String email) {
        Optional<VisitorSession> session = visitorSessionRepository.findBySessionId(sessionId);
        if (session.isPresent()) {
            VisitorSession s = session.get();
            s.setAssociatedPhone(phone);
            s.setAssociatedEmail(email);
            s.setConverted(true);
            visitorSessionRepository.save(s);
        }
    }
}
