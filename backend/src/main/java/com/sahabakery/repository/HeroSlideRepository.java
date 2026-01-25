package com.sahabakery.repository;

import com.sahabakery.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, Long> {
    List<HeroSlide> findByActiveOrderByDisplayOrderAsc(Boolean active);

    List<HeroSlide> findAllByOrderByDisplayOrderAsc();
}
