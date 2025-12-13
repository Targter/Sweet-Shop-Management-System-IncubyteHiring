Here is the updated **`README.md`** file with your shop name **"Absweets"** integrated.

Copy and paste the code below into your `README.md` file.

---

````markdown
# 🍬 Absweets - Shop Management System (MERN TDD)

> A full-stack TDD Kata project showcasing modern web development practices

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br />

🎉 🚀 **LIVE APPLICATION** 🚀 🎉
╔═══════════════════════════════════════════════════════════╗
║ ║
║ 🌐 [INSERT YOUR DEPLOYED LINK HERE] 🌐 ║
║ ║
║ 👉 CLICK TO EXPLORE 👈 ║
║ ║
╚═══════════════════════════════════════════════════════════╝
👉 [VISIT LIVE APPLICATION](your-link-here) 👈

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [API Documentation](#-api-documentation)
7. [Testing Strategy (TDD)](#-testing)
8. [My AI Usage](#-my-ai-usage)
9. [Development Workflow](#-development-workflow)
10. [Author](#-author)

---

## 🎯 Overview

**Absweets** is a comprehensive full-stack inventory and sales management application built as a **Test-Driven Development (TDD) Kata**. This project demonstrates modern MERN stack engineering practices, including RESTful API design, Context API state management, JWT authentication, and a rigorous "Red-Green-Refactor" workflow.

The system allows users to:

- Browse the **Absweets** catalog and filter by category.
- Manage a shopping cart and perform bulk checkouts.
- **Admin:** View real-time analytics (Revenue, Orders).
- **Admin:** Manage inventory (CRUD) and restock low-inventory items.

---

## ✨ Features

### 🔐 **Authentication & Authorization**

- User Registration & Login (BCrypt password hashing).
- **JWT-based** stateless authentication.
- **Role-Based Access Control (RBAC):** Protected routes for Admins vs. Standard Users.
- Session persistence via local storage and token decoding.

### 🍭 **Sweet Inventory & Shopping**

- **Dynamic Catalog:** View sweets with live stock indicators.
- **Smart Filtering:** Filter by Category or Search by Name.
- **Cart System:** Global state management for adding/removing items.
- **Stock Validation:** Prevents adding more items than currently available.

### 📊 **Admin Dashboard & Analytics**

- **Financial Overview:** Total Revenue, Average Order Value.
- **Operational Stats:** Total Orders, Total Customers, Low Stock Alerts.
- **Visual Tables:** Recent Order History with customer details.
- **Inventory CRUD:** Add, Edit, Delete, and Restock products via a professional UI.

### 🎨 **User Interface**

- Built with **React + Vite** for blazing fast performance.
- Styled with **Tailwind CSS** for a clean, responsive layout.
- **React Hook Form** for robust form validation.
- Responsive grid layouts for mobile and desktop.

---

## 🛠 Technology Stack

### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JSON Web Tokens (JWT)
- **Testing:** Jest, Supertest
- **Architecture:** MVC (Model-View-Controller)

### **Frontend**

- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API (Auth & Cart)
- **Forms:** React Hook Form
- **Testing:** Vitest, React Testing Library

---

## 📁 Project Structure

```text
absweets/
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── controllers/        # Logic (Auth, Sweets, Admin)
│   │   ├── models/             # Mongoose Schemas (User, Sweet, Order)
│   │   ├── routes/             # API Endpoint Definitions
│   │   ├── middleware/         # Auth & Role Checks
│   │   └── app.ts              # App Entry Point
│   └── tests/                  # Integration Tests (Jest)
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── api/                # Axios Instances & Interceptors
│   │   ├── context/            # AuthProvider & CartProvider
│   │   ├── page/               # Dashboard, Cart, Inventory, Admin
│   │   └── App.tsx             # Routing & Route Guards
│   └── src/page/*.test.tsx     # Component Tests (Vitest)
```
````

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas Connection String)
- Git

### 1. Backend Setup

Navigate to the backend folder, install dependencies, and start the server.

```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/absweets" >> .env
echo "JWT_SECRET=supersecretkey" >> .env

# Run in Dev Mode
npm run dev
```

### 2. Frontend Setup

Open a new terminal, navigate to the frontend, and start the UI.

```bash
cd frontend
npm install

# Run in Dev Mode
npm run dev
```

_Access the app at `http://localhost:5173`_

---

## 📚 API Documentation

### **Auth Endpoints**

| Method | Endpoint             | Description         |
| :----- | :------------------- | :------------------ |
| `POST` | `/api/auth/register` | Register new user   |
| `POST` | `/api/auth/login`    | Login & receive JWT |

### **Sweets Endpoints**

| Method   | Endpoint             | Access    | Description                       |
| :------- | :------------------- | :-------- | :-------------------------------- |
| `GET`    | `/api/sweets`        | Public    | List all sweets                   |
| `GET`    | `/api/sweets/search` | Public    | Search `?q=name` or `?category=x` |
| `POST`   | `/api/sweets`        | **Admin** | Create new product                |
| `PUT`    | `/api/sweets/:id`    | **Admin** | Update product                    |
| `DELETE` | `/api/sweets/:id`    | **Admin** | Remove product                    |

### **Analytics & Orders**

| Method | Endpoint                   | Access    | Description                    |
| :----- | :------------------------- | :-------- | :----------------------------- |
| `POST` | `/api/sweets/:id/purchase` | User      | Buy item (Records Order)       |
| `GET`  | `/api/sweets/admin/stats`  | **Admin** | Get Revenue, Orders, Low Stock |

---

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** principles.

### Backend Tests

Integration tests for API endpoints using **Jest** and **Supertest**.

```bash
cd backend
npm test
```

### Frontend Tests

Component and Logic tests using **Vitest** and **React Testing Library**.

```bash
cd frontend
npm test
```

---

## 🤖 My AI Usage

**AI Tool:** ChatGPT (GPT-4)

Throughout the development of **Absweets**, I utilized ChatGPT as a **Coding Assistant** and **Pair Programmer**. Below is a transparent account of how AI was integrated into my workflow to simulate a real-world engineering environment.

### How I Used ChatGPT

1.  **Scaffolding & Architecture:**
    - Used AI to generate the initial Monorepo structure and TypeScript configuration.
    - Consulted on the best folder structure for Scalable MVC architecture.
2.  **Test Generation (Red Phase):**
    - I provided the requirements (e.g., "I need an inventory list"), and asked the AI to **generate the failing test first**.
    - This ensured I followed TDD strictly (Red -> Green -> Refactor).
3.  **Refactoring & Optimization:**
    - After making the tests pass, I asked AI to review the `CartContext` logic to ensure state updates were immutable and efficient.
    - Generated the MongoDB Aggregation logic for the Admin Analytics dashboard.
4.  **Debugging:**
    - Used AI to troubleshoot a specific issue where `React Router` was conflicting with `Vitest`'s memory router during testing.

### AI Co-authorship in Commits

To maintain transparency and professional integrity, commits heavily influenced by AI suggestions include the specific trailer:

> `Co-authored-by: AI Assistant <ai@users.noreply.github.com>`

---

## 🔄 Development Workflow

### Git Workflow

- **Feature Branches:** Features developed in isolation (e.g., `feat/admin-dashboard`).
- **Atomic Commits:** Small, descriptive commits.
- **TDD Cycle:**
  1.  🔴 **Red:** Write a failing test for the new feature.
  2.  🟢 **Green:** Write the minimal code to pass the test.
  3.  🔵 **Refactor:** Clean up code while keeping tests green.

---

## 👤 Author

**[Your Name]**

- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Portfolio:** [yourportfolio.com](https://yourportfolio.com)

---

🎊 🎊 🎊
╔═══════════════════════════════════════════════════════════╗
║ ║
║ 🍬 ABSWEETS MANAGEMENT SYSTEM 🍬 ║
║ ║
║ 👉 THANKS FOR VISITING 👈 ║
║ ║
╚═══════════════════════════════════════════════════════════╝

```

```
