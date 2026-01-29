package com.sahabakery.config;

import com.sahabakery.entity.Category;
import com.sahabakery.entity.Product;
import com.sahabakery.entity.User;
import com.sahabakery.repository.CategoryRepository;
import com.sahabakery.repository.ProductRepository;
import com.sahabakery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private CategoryRepository categoryRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private com.sahabakery.repository.HeroSlideRepository heroSlideRepository;

        @Override
        public void run(String... args) throws Exception {
                // Initialize admin users
                createAdminUserIfMissing("admin", "admin123");
                createAdminUserIfMissing("sahaadmin", "saha@2026");
        }

        private void createAdminUserIfMissing(String username, String password) {
                if (userRepository.findByUsername(username).isEmpty()) {
                        User user = new User();
                        user.setUsername(username);
                        user.setPassword(passwordEncoder.encode(password));
                        user.setRole("ADMIN");
                        userRepository.save(user);
                        System.out.println("✅ Admin user created: " + username);
                }

                // Initialize Hero Slides (PREMIUM CONTENT)
                if (heroSlideRepository.count() == 0) {
                        seedHeroSlides();
                        System.out.println("✅ Premium Hero Slides initialized!");
                }

                // Initialize categories and products
                if (categoryRepository.count() == 0) {
                        seedProducts();
                        System.out.println("✅ Premium Categories & Products initialized!");
                }
        }

        private void seedHeroSlides() {
                createSlide("Exquisite Berry Cakes",
                                "Layers of fresh cream and hand-picked berries for pure indulgence.",
                                "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                                "Order Now", "/shop", 1);

                createSlide("Heritage Sweets & Pastries",
                                "Authentic treats crafted with passion and traditional recipes.",
                                "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                                "View Pastries", "/shop", 2);

                createSlide("Celebration Masterpieces",
                                "Make your special moments unforgettable with our signature custom cakes.",
                                "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                                "Book a Cake", "/contact", 3);

                createSlide("The Ultimate Chocolate",
                                "Rich, moist, and decadent chocolate cakes made from premium cocoa.",
                                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                                "Indulge Today", "/shop", 4);

                createSlide("Delicate Tea Cakes", "Light, fluffy, and perfect for your evening conversations.",
                                "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                                "Our Story", "/about", 5);
        }

        private void createSlide(String title, String subtitle, String imageUrl, String ctaText, String ctaLink,
                        int order) {
                com.sahabakery.entity.HeroSlide slide = new com.sahabakery.entity.HeroSlide();
                slide.setTitle(title);
                slide.setSubtitle(subtitle);
                slide.setImageUrl(imageUrl);
                slide.setCtaText(ctaText);
                slide.setCtaLink(ctaLink);
                slide.setDisplayOrder(order);
                slide.setActive(true);
                heroSlideRepository.save(slide);
        }

        private void seedProducts() {
                Category cakes = new Category();
                cakes.setName("Cakes");
                categoryRepository.save(cakes);

                Category pastries = new Category();
                pastries.setName("Pastries");
                categoryRepository.save(pastries);

                Category savoury = new Category();
                savoury.setName("Savoury");
                categoryRepository.save(savoury);

                // Premium Cakes
                createProduct("Black Forest Cake", "Classic German chocolate cake with cherries and cream.",
                                new BigDecimal("450.00"), cakes,
                                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop");

                createProduct("Red Velvet Supreme", "Rich red velvet sponge with cream cheese frosting.",
                                new BigDecimal("600.00"), cakes,
                                "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&h=800&fit=crop");

                createProduct("Fresh Fruit Tart", "Buttery tart shell filled with custard and fresh fruits.",
                                new BigDecimal("120.00"), pastries,
                                "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop");

                // Premium Savoury
                createProduct("Gourmet Chicken Puff", "Flaky pastry filled with spiced chicken.",
                                new BigDecimal("45.00"), savoury,
                                "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&h=800&fit=crop");
        }

        private void createProduct(String name, String desc, BigDecimal price, Category cat, String img) {
                Product p = new Product();
                p.setName(name);
                p.setDescription(desc);
                p.setPrice(price);
                p.setCategory(cat);
                p.setImageUrl(img);
                productRepository.save(p);
        }
}
