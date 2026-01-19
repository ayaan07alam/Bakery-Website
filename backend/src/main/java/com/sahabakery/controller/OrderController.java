package com.sahabakery.controller;

import com.sahabakery.entity.Order;
import com.sahabakery.entity.OrderItem;
import com.sahabakery.entity.Product;
import com.sahabakery.repository.OrderRepository;
import com.sahabakery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setCustomerAddress(request.getCustomerAddress());

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(product.getPrice());

            order.additem(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    // DTOs
    @lombok.Data
    static class OrderRequest {
        private String customerName;
        private String customerPhone;
        private String customerAddress;
        private List<OrderItemRequest> items;
    }

    @lombok.Data
    static class OrderItemRequest {
        private Long productId;
        private int quantity;
    }
}
