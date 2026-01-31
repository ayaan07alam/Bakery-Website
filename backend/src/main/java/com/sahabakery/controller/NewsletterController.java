package com.sahabakery.controller;

import com.sahabakery.entity.NewsletterSubscriber;
import com.sahabakery.repository.NewsletterSubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private NewsletterSubscriberRepository newsletterRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }

        // Check if already subscribed
        if (newsletterRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.ok(Map.of("message", "Already subscribed!"));
        }

        NewsletterSubscriber subscriber = new NewsletterSubscriber();
        subscriber.setEmail(email);
        subscriber.setSubscribedAt(LocalDateTime.now());
        subscriber.setActive(true);

        newsletterRepository.save(subscriber);
        return ResponseEntity.ok(Map.of("message", "Successfully subscribed!"));
    }

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriber>> getAllSubscribers() {
        List<NewsletterSubscriber> subscribers = newsletterRepository.findAllByOrderBySubscribedAtDesc();
        return ResponseEntity.ok(subscribers);
    }

    @GetMapping("/subscribers/active")
    public ResponseEntity<List<NewsletterSubscriber>> getActiveSubscribers() {
        List<NewsletterSubscriber> subscribers = newsletterRepository.findByActiveOrderBySubscribedAtDesc(true);
        return ResponseEntity.ok(subscribers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long id) {
        return newsletterRepository.findById(id)
                .map(subscriber -> {
                    subscriber.setActive(false);
                    newsletterRepository.save(subscriber);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
