package com.sahabakery.controller;

import com.sahabakery.entity.ContactInquiry;
import com.sahabakery.repository.ContactInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactInquiryRepository contactInquiryRepository;

    @PostMapping
    public ResponseEntity<ContactInquiry> submitInquiry(@RequestBody ContactInquiry inquiry) {
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiry.setResolved(false);
        ContactInquiry saved = contactInquiryRepository.save(inquiry);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactInquiry>> getAllInquiries() {
        List<ContactInquiry> inquiries = contactInquiryRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/unresolved")
    public ResponseEntity<List<ContactInquiry>> getUnresolvedInquiries() {
        List<ContactInquiry> inquiries = contactInquiryRepository.findByResolvedOrderByCreatedAtDesc(false);
        return ResponseEntity.ok(inquiries);
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<ContactInquiry> resolveInquiry(@PathVariable Long id) {
        return contactInquiryRepository.findById(id)
                .map(inquiry -> {
                    inquiry.setResolved(true);
                    inquiry.setResolvedAt(LocalDateTime.now());
                    return ResponseEntity.ok(contactInquiryRepository.save(inquiry));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        if (contactInquiryRepository.existsById(id)) {
            contactInquiryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
