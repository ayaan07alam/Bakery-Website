package com.sahabakery.repository;

import com.sahabakery.entity.NewsletterSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {
    Optional<NewsletterSubscriber> findByEmail(String email);

    List<NewsletterSubscriber> findAllByOrderBySubscribedAtDesc();

    List<NewsletterSubscriber> findByActiveOrderBySubscribedAtDesc(Boolean active);
}
