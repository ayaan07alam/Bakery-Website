package com.sahabakery.controller;

import com.sahabakery.entity.MenuItem;
import com.sahabakery.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public ResponseEntity<List<MenuItem>> getPublicMenu() {
        List<MenuItem> menuItems = menuItemRepository.findByParentIsNullAndVisibleOrderByDisplayOrderAsc(true);
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemRepository.findByParentIsNullOrderByDisplayOrderAsc();
        return ResponseEntity.ok(menuItems);
    }

    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        // If no display order set, set to max + 1
        if (menuItem.getDisplayOrder() == null) {
            long count = menuItemRepository.count();
            menuItem.setDisplayOrder((int) count);
        }
        MenuItem saved = menuItemRepository.save(menuItem);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return menuItemRepository.findById(id)
                .map(existing -> {
                    existing.setName(menuItem.getName());
                    existing.setLink(menuItem.getLink());
                    existing.setDisplayOrder(menuItem.getDisplayOrder());
                    existing.setVisible(menuItem.getVisible());
                    existing.setOpenInNewTab(menuItem.getOpenInNewTab());
                    existing.setParent(menuItem.getParent());
                    return ResponseEntity.ok(menuItemRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/initialize")
    public ResponseEntity<String> initializeMenu() {
        // Check if menu already initialized
        if (menuItemRepository.count() > 0) {
            return ResponseEntity.ok("Menu already initialized");
        }

        // Create default menu items
        MenuItem home = new MenuItem();
        home.setName("Home");
        home.setLink("/");
        home.setDisplayOrder(0);
        home.setVisible(true);
        menuItemRepository.save(home);

        MenuItem menu = new MenuItem();
        menu.setName("Our Menu");
        menu.setLink("/shop");
        menu.setDisplayOrder(1);
        menu.setVisible(true);
        menuItemRepository.save(menu);

        MenuItem contact = new MenuItem();
        contact.setName("Contact");
        contact.setLink("/contact");
        contact.setDisplayOrder(2);
        contact.setVisible(true);
        menuItemRepository.save(contact);

        return ResponseEntity.ok("Menu initialized with default items");
    }
}
