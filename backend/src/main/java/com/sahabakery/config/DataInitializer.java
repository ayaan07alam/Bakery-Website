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

    @Override
    public void run(String... args) throws Exception {
        // Initialize admin users
        if (userRepository.count() == 0) {
            User admin1 = new User();
            admin1.setUsername("admin");
            admin1.setPassword(passwordEncoder.encode("admin123"));
            admin1.setRole("ADMIN");
            userRepository.save(admin1);

            User admin2 = new User();
            admin2.setUsername("sahaadmin");
            admin2.setPassword(passwordEncoder.encode("saha@2026"));
            admin2.setRole("ADMIN");
            userRepository.save(admin2);

            System.out.println("✅ Admin users created successfully!");
            System.out.println("   - Username: admin, Password: admin123");
            System.out.println("   - Username: sahaadmin, Password: saha@2026");
        }

        // Initialize categories and products
        if (categoryRepository.count() == 0) {
            Category cakes = new Category();
            cakes.setName("Cakes");
            categoryRepository.save(cakes);

            Category pastries = new Category();
            pastries.setName("Pastries");
            categoryRepository.save(pastries);

            Category breads = new Category();
            breads.setName("Breads");
            categoryRepository.save(breads);

            // Dummy Products
            Product p1 = new Product();
            p1.setName("Chocolate Truffle");
            p1.setDescription("Rich chocolate layer cake.");
            p1.setPrice(new BigDecimal("550.00"));
            p1.setCategory(cakes);
            p1.setImageUrl("https://placehold.co/400x300?text=Chocolate+Cake");
            productRepository.save(p1);

            Product p2 = new Product();
            p2.setName("Croissant");
            p2.setDescription("Buttery flaky croissant.");
            p2.setPrice(new BigDecimal("80.00"));
            p2.setCategory(breads);
            p2.setImageUrl("https://placehold.co/400x300?text=Croissant");
            productRepository.save(p2);

            System.out.println("✅ Dummy data initialized!");
        }
    }
}
