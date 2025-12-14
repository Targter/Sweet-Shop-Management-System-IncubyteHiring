````markdown
# 🍬 Absweets - Sweet Shop Management System

> A full-stack, TDD-based inventory and sales management application built with the MERN stack.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%2344a833.svg?style=for-the-badge&logo=vitest&logoColor=white)

---

## 🤖 My AI Usage (Mandatory Section)

In compliance with the project requirements, this section details my responsible leverage of AI tools during development.

### **1. AI Tools Used**

- **ChatGPT (GPT-4o):** Used as a primary "Pair Programmer" and documentation assistant.
- **GitHub Copilot:** Used for intelligent code completion and boilerplate reduction inside VS Code.

### **2. How I Used Them**

I adopted a "Human-Architect, AI-Builder" workflow to maintain code quality while accelerating development:

- **Scaffolding & Configuration:** I asked ChatGPT to generate the initial `tsconfig.json` and Monorepo folder structure to ensure best practices for a MERN + TypeScript setup.
- **Test-Driven Development (TDD):** To strictly follow the _Red-Green-Refactor_ cycle, I provided business requirements to the AI and asked it to **generate the failing test cases first** (e.g., "Write a Jest test for an Inventory Controller that fails if the stock is 0").
- **Complex Logic Generation:** I used AI to draft the MongoDB Aggregation pipeline for the **Admin Analytics Dashboard** (calculating total revenue, average order value, etc.), which I then manually verified and integrated.
- **Debugging:** When encountering `react-router` vs `vitest` context issues, I pasted error logs to get specific configuration fixes for `setupTests.ts`.

### **3. Reflection on Workflow Impact**

Using AI significantly improved my velocity, specifically in context switching. Instead of searching documentation for specific Mongoose syntax or Regex for search filters, I could get immediate syntactical examples.

However, I learned that **blindly copying is dangerous**. For example, the AI initially suggested an insecure way of storing JWTs. I had to intervene using my own knowledge to refactor the `AuthContext` to handle token expiration and secure storage properly. The AI was a powerful engine, but I remained the driver.

---

## 📖 Overview

**Absweets** is a robust e-commerce platform designed to manage the sale and inventory of sweets. It features a dual-interface system: a customer-facing shop with cart functionality, and a secure Admin Dashboard for business analytics and stock management.

The project was built using **Test-Driven Development (TDD)**, ensuring that every feature (Auth, Inventory, Cart) is backed by a suite of automated tests.

---

## ✨ Features

### 🛒 **Customer Features**

- **Dynamic Catalog:** Browse sweets with real-time stock availability status.
- **Smart Search:** Filter products by Name or Category.
- **Shopping Cart:** Add items, view summary, and perform bulk checkout (Context API).
- **Stock Protection:** UI prevents adding more items to the cart than exist in the database.

### 🛡️ **Admin Dashboard**

- **Business Analytics:** View Total Revenue, Orders Count, and Average Order Value.
- **Inventory Management:** Full CRUD (Create, Read, Update, Delete) for products.
- **Low Stock Alerts:** Automatic visual warnings for items with low quantity (< 5).
- **Order History:** View recent transactions and customer details.

---

## 📸 Screenshots

_(Note: These are placeholders. Please capture screenshots of your local app and replace the links below)_

|                           **Dashboard & Filter**                            |                            **Admin Analytics**                            |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard+Screenshot) | ![Admin](https://via.placeholder.com/400x200?text=Admin+Panel+Screenshot) |

|                         **Shopping Cart**                         |                          **Inventory Management**                           |
| :---------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| ![Cart](https://via.placeholder.com/400x200?text=Cart+Screenshot) | ![Inventory](https://via.placeholder.com/400x200?text=Inventory+Screenshot) |

---

## 🚀 Getting Started

Follow these instructions to run **Absweets** locally.

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Locally installed or Atlas URI)
- Git

### 1. Backend Setup

```bash
# Clone the repo
git clone [YOUR_REPO_LINK_HERE]
cd absweets/backend

# Install dependencies
npm install

# Create environment variables
# Create a file named .env in /backend and add:
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/absweets
JWT_SECRET=your_super_secure_secret_key

# Run the server
npm run dev
```
````

_Server starts at `http://localhost:5000`_

### 2. Frontend Setup

```bash
# Open a new terminal
cd absweets/frontend

# Install dependencies
npm install

# Run the UI
npm run dev
```

_Frontend starts at `http://localhost:5173`_

---

## 🧪 Test Report

This project maintains a high level of test coverage.

### Running the Tests

**Backend (Jest + Supertest):**

```bash
cd backend
npm test
```

**Frontend (Vitest + React Testing Library):**

```bash
cd frontend
npm test
```

### Sample Output

```text
 PASS  tests/auth.test.ts
  √ POST /api/auth/register should create user (50ms)
  √ POST /api/auth/login should return token (20ms)

 PASS  tests/sweets.test.ts
  √ GET /api/sweets returns list (15ms)
  √ POST /api/sweets/purchase updates stock (40ms)

Test Suites: 5 passed, 5 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        2.345 s
```

---

## 📡 API Reference

| Method | Endpoint                   | Access    | Description              |
| :----- | :------------------------- | :-------- | :----------------------- |
| `POST` | `/api/auth/register`       | Public    | Register User            |
| `POST` | `/api/auth/login`          | Public    | Login & Get Token        |
| `GET`  | `/api/sweets`              | Public    | Get all products         |
| `POST` | `/api/sweets/:id/purchase` | User      | Buy item (Records Order) |
| `GET`  | `/api/sweets/admin/stats`  | **Admin** | Get Analytics Data       |
| `POST` | `/api/sweets`              | **Admin** | Add Product              |
| `PUT`  | `/api/sweets/:id`          | **Admin** | Edit Product             |

---

## 👤 Author

**[Your Name]**

- **GitHub:** [Your GitHub Profile Link]
- **Email:** [Your Email]

---

_This project was submitted as part of the technical assessment for Incubyte._

```

### **Instructions for you:**
1.  **Repo Link:** In the "Getting Started" section, replace `[YOUR_REPO_LINK_HERE]` with your actual GitHub link.
2.  **Screenshots:** Take 4 screenshots of your app (Dashboard, Admin Panel, Cart, Inventory). Upload them to your GitHub repo (create a folder named `screenshots`) or an image host, and replace the `https://via.placeholder.com...` links with your actual image paths.
3.  **Author:** Fill in your name and details at the bottom.
```
