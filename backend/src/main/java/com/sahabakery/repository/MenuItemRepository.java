package com.sahabakery.repository;

import com.sahabakery.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByParentIsNullAndVisibleOrderByDisplayOrderAsc(Boolean visible);

    List<MenuItem> findByParentIsNullOrderByDisplayOrderAsc();

    List<MenuItem> findByParentAndVisibleOrderByDisplayOrderAsc(MenuItem parent, Boolean visible);
}
