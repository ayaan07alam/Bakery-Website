package com.sahabakery.controller;

import com.sahabakery.entity.CallbackRequest;
import com.sahabakery.repository.CallbackRequestRepository;
import com.sahabakery.service.VisitorSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/callback-requests")
public class CallbackRequestController {

    @Autowired
    private CallbackRequestRepository callbackRequestRepository;

    @Autowired
    private VisitorSessionService visitorSessionService;

    @PostMapping
    public ResponseEntity<CallbackRequest> createCallbackRequest(@RequestBody CallbackRequest request) {
        try {
            CallbackRequest saved = callbackRequestRepository.save(request);

            // Associate with visitor session if available
            if (request.getVisitorSessionId() != null && request.getPhoneNumber() != null) {
                visitorSessionService.associateContactInfo(
                        request.getVisitorSessionId(),
                        request.getPhoneNumber(),
                        request.getEmail());
            }

            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CallbackRequest>> getAllCallbacks() {
        return ResponseEntity.ok(callbackRequestRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<CallbackRequest>> getCallbacksByStatus(@PathVariable String status) {
        return ResponseEntity.ok(callbackRequestRepository.findByStatusOrderByCreatedAtDesc(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CallbackRequest> getCallbackById(@PathVariable Long id) {
        return callbackRequestRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CallbackRequest> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest statusUpdate) {
        return callbackRequestRepository.findById(id)
                .map(callback -> {
                    callback.setStatus(statusUpdate.getStatus());
                    if (statusUpdate.getNotes() != null) {
                        callback.setNotes(statusUpdate.getNotes());
                    }
                    return ResponseEntity.ok(callbackRequestRepository.save(callback));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCallback(@PathVariable Long id) {
        if (callbackRequestRepository.existsById(id)) {
            callbackRequestRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats/count")
    public ResponseEntity<Long> getCountByStatus(@RequestParam String status) {
        return ResponseEntity.ok(callbackRequestRepository.countByStatus(status));
    }

    // Inner class for status updates
    public static class StatusUpdateRequest {
        private String status;
        private String notes;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }
}
