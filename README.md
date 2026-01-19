# Saha Bakery - E-Commerce Website 🥖🧁

A modern, full-stack e-commerce application designed for **Saha Bakery**, featuring a "Warm Bakery" aesthetic, responsive design, and a robust admin dashboard.

## 🌟 Project Overview

This project bridges a traditional bakery business with the digital world. It offers a premium user experience for customers to browse, cart, and order fresh baked goods, while providing administrators with a secure dashboard to manage products and inventory.

### **Tech Stack**

*   **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons), Axios, React Router.
*   **Backend**: Java Spring Boot, Hibernate/JPA.
*   **Database**: H2 In-Memory Database (configured for dev/test).
*   **State Management**: React Context API (CartContext).
*   **Design**: Custom "Brand Bakery" Theme (Red/Yellow/Blue palette).

---

## 🎨 Design & Aesthetic: "The Warm Bakery"

We moved away from generic corporate templates to a custom design language:

*   **Brand Colors**:
    *   🔴 **Brand Red**: `#D32F2F` (Primary action usage, Header fonts, Marquees).
    *   🟡 **Brand Yellow**: `#FBC02D` (Accents, Buttons, Highlights).
    *   🔵 **Brand Blue**: `#1976D2` (Trust signals, Top bar).
    *   ⚪ **Cream/White**: Clean backgrounds to let the food photography shine.
*   **Typography**:
    *   **Headings**: `Chewy` (Google Font) - Playful, thick, hand-drawn feel.
    *   **Body**: `Inter` / `Sans-serif` - Clean and readable.
*   **Visual Motifs**:
    *   **Scalloped/Wavy Edges**: Used in footers to mimic icing or biscuit edges.
    *   **Hand-Drawn Doodles**: Rolling pins, whisks, and wheat assets decorating empty white space.
    *   **Floating Cards**: Glassmorphic effects on product cards.

---

## 🚀 Key Features

### **1. Public Storefront**
*   **Hero Section**:
    *   Cinematic aspect-ratio image slider (no cropping).
    *   Side-decorated artistry (Desktop visible).
*   **Product Catalog**:
    *   Filterable product lists (Cakes, Breads, Pastries).
    *   Interactive "Quick Add" buttons.
    *   Star ratings and price display.
*   **Shopping Experience**:
    *   **Real-time Cart**: Slide-out drawer + Dedicated Page.
    *   **Checkout**: Simplified checkout form with order summary.
    *   **Persistence**: Cart items saved in local storage.

### **2. Admin Dashboard**
*   **Secure Login**: Token-based (simulated) authentication.
*   **Product Management**:
    *   **Add Product**: Form with image URL support.
    *   **Edit/Delete**: Full CRUD capabilities.
    *   **Inventory Tracking**: View stock levels.
*   **Metrics**: Quick view of Total Products, Low Stock, etc.

### **3. Backend API (Spring Boot)**
*   RESTful architecture.
*   `ProductController`: Handles all CRUD operations.
*   `OrderController`: Processes incoming orders.
*   `SecurityConfig`: CORS configuration to allow Frontend communication.

---

## 🛠️ Setup Instructions

### **1. Backend (Spring Boot)**
1.  Navigate to the `backend` folder.
2.  Open in IntelliJ/Eclipse or use command line.
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  Server starts at `http://localhost:8080`.

### **2. Frontend (React + Vite)**
1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` to view the site.

---

## 📂 Project Structure

```
SahaBakery/
├── backend/               # Spring Boot Application
│   ├── src/main/java/     # Controllers, Services, Repositories, Entities
│   └── src/main/resources # Application properties (DB, Server port)
│
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Footer, ProductCard)
│   │   ├── pages/         # Route Views (Home, Shop, Admin, Checkout)
│   │   ├── context/       # Global State (CartContext)
│   │   └── services/      # API Connectors (Axios)
│   └── public/            # Static Assets
│
└── README.md              # Project Documentation
```

---

## 🔮 Future Roadmap
*   [ ] User Authentication (Customer Login).
*   [ ] Payment Gateway Integration (Stripe/Razorpay).
*   [ ] Order History for Users.
*   [ ] Email Notifications for Orders (SMTP).

---

*Developed by Ayaan Alam & Antigravity (AI Agent)*