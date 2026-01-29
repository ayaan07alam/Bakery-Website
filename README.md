# Saha Bakery - Premium E-Commerce Application 🥖🍰

![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-orange?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Deployment_Ready-success?style=for-the-badge)

A production-grade, full-stack e-commerce platform built for a premium artisanal bakery. This project demonstrates a complete architectural migration from local development to a scalable cloud infrastructure, featuring a custom design system, secure authentication, and managing digital assets via CDN.

> **Why this project?**
> To bridge the gap between traditional craftsmanship and modern digital commerce, delivering a "Warm Bakery" aesthetic without compromising on performance or scalability.

---

## 🏗️ Architecture & Tech Stack

This application follows a **Decoupled Monolith** architecture with a React frontend consuming a RESTful Spring Boot API.

### **Frontend (Client)**
*   **React 19 + Vite**: Chosen for lightning-fast HMR and build performance.
*   **Tailwind CSS**: Utility-first styling with a custom `index.css` design system (Glassmorphism, Micro-interactions).
*   **Lucide React**: Lightweight, consistent iconography.
*   **State Management**: React Context API (Cart, Auth, Theme).
*   **Deploy**: Vercel (Global CDN).

### **Backend (Server)**
*   **Java 17 + Spring Boot 3**: Robust, enterprise-grade backend logic.
*   **Security**: Spring Security + JWT (Stateless Authentication).
*   **Database**: PostgreSQL (Production) / H2 (Dev/Test) - Configured via Environment Variables.
*   **Storage**: Cloudinary API (for handling ephemeral file storage in cloud environments).
*   **Deploy**: Render.com.

---

## 🔥 Key Features

### **1. Premium User Experience (UX)**
*   **"The Warm Bakery" Theme**: Custom color palette (Brand Red `#D32F2F`, Cream, Gold) with playful typography (`Chewy` & `Outfit`).
*   **Responsive Design**: Mobile-first architecture with custom breakpoints for 320px devices.
*   **Dynamic UI**: 
    *   Smooth scrolling & parallax effects.
    *   Glassmorphic product cards with GPU-accelerated hover states.
    *   Interactive "Quick Add" cart animations.

### **2. Admin CMS & Management**
*   **Secure Dashboard**: Protected routes usage JWT authentication.
*   **Product Management**: Full CRUD capabilities with drag-and-drop image uploads (integrated with Cloudinary).
*   **Content Control**: Manage Hero slides, Menu items, and Categories directly from the UI.
*   **Visitor Tracking**: Simple analytics hook for monitoring session traffic.

### **3. Production Readiness**
*   **Centralized Config**: `application.properties` configured for environment-based variable injection (Database URL, CORS, JWT Secret).
*   **Transient Storage Handling**: Refactored `FileUploadService` to bypass local disk storage (ephemeral filesystem) and pipe streams directly to Cloudinary.
*   **Security**: 
    *   Global CORS configuration.
    *   Password Encoders (BCrypt).
    *   Strict stateless session management.

---

## 🛠️ Setup & Installation

### Prerequisites
*   Node.js 20+
*   Java JDK 17+
*   Maven

### 1. Clone the Repository
```bash
git clone https://github.com/ayaan07alam/Bakery-Website.git
cd Bakery-Website
```

### 2. Backend Setup
1.  Navigate to `backend/`.
2.  Configure Environment Variables (or standard `application.properties` for local dev):
    ```properties
    # .env / Environment Variables
    DB_URL=jdbc:h2:file:./data/bakerydb
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ```
3.  Run the server:
    ```bash
    ./mvnw spring-boot:run
    ```

### 3. Frontend Setup
1.  Navigate to `frontend/`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run development server:
    ```bash
    npm run dev
    ```

---

## 📈 Deployment Strategy

This project solves the "Ephemeral File System" problem common in modern PaaS providers (Render/Heroku):

| Challenge | Solution |
| :--- | :--- |
| **Ephemeral Storage** | Files uploaded to the server are deleted on restart. I implemented **Cloudinary** to offload image storage to a persistent CDN. |
| **Database Persistence** | Migrated from an embedded H2 database to a managed **PostgreSQL** instance for production data integrity. |
| **CORS Issues** | Implemented a dynamic `WebConfig.java` to whitelist frontend domains via Environment Variables. |

---

## 🔮 Future Improvements
*   [ ] integration with Stripe for Payment Gateway.
*   [ ] Redis caching for Product Catalog APIs.
*   [ ] Docker containerization for unified deployment.

---

*Built with ❤️ (and Java) by [Ayaan Alam](https://github.com/ayaan07alam)*