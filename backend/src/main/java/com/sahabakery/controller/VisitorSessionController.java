package com.sahabakery.controller;

import com.sahabakery.entity.VisitorSession;
import com.sahabakery.service.VisitorSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/visitor-sessions")
@CrossOrigin(origins = "*")
public class VisitorSessionController {

    @Autowired
    private VisitorSessionService visitorSessionService;

    @PostMapping
    public ResponseEntity<VisitorSession> createOrUpdateSession(@RequestBody VisitorSession session) {
        try {
            VisitorSession saved = visitorSessionService.createOrUpdateSession(session);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<VisitorSession> getSession(@PathVariable String sessionId) {
        return visitorSessionService.getSessionBySessionId(sessionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<VisitorSession>> getAllSessions() {
        return ResponseEntity.ok(visitorSessionService.getAllSessions());
    }

    @GetMapping("/engaged")
    public ResponseEntity<List<VisitorSession>> getEngagedVisitors(
            @RequestParam(defaultValue = "60") Integer minSeconds) {
        return ResponseEntity.ok(visitorSessionService.getEngagedVisitors(minSeconds));
    }

    @GetMapping("/converted")
    public ResponseEntity<List<VisitorSession>> getConvertedLeads() {
        return ResponseEntity.ok(visitorSessionService.getConvertedLeads());
    }

    @GetMapping("/stats/count")
    public ResponseEntity<Long> getVisitorCount(@RequestParam(required = false) String since) {
        LocalDateTime sinceDate = since != null ? LocalDateTime.parse(since) : LocalDateTime.now().minusDays(30);
        return ResponseEntity.ok(visitorSessionService.getVisitorCountSince(sinceDate));
    }
}
