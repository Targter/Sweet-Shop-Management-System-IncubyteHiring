# 🍬 SUGAR RUSH - Sweet Shop Management System

> A full-stack, TDD-based inventory and sales management application built with the MERN stack.

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-success?style=for-the-badge&logo=vercel&logoColor=white)](https://g-tsweets.vercel.app)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%2344a833.svg?style=for-the-badge&logo=vitest&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Technology Stack](#-technology-stack)
4. [Screenshots](#-screenshots)
5. [Project Structure](#-project-structure)
6. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#1-backend-setup)
   - [Frontend Setup](#2-frontend-setup)
7. [API Documentation](#-api-documentation)
8. [Testing](#-testing)
9. [Deployment](#-deployment)
10. [Design Process](#-design-process)
11. [My AI Usage](#-my-ai-usage)
12. [Development Workflow](#-development-workflow)
13. [Contributing](#-contributing)
14. [Author](#-author)

---

## 🍬 Overview

**Sugar Rush** is a robust sweet shop management system designed to handle inventory, sales, and customer orders. It features a dual-interface system: a customer-facing shop with cart functionality, and a secure Admin Dashboard for inventory management and business analytics.

The project was built using **Test-Driven Development (TDD)** principles, ensuring that every feature (Authentication, Sweet Management, Cart System) is backed by comprehensive automated tests with 95%+ backend coverage and 87%+ frontend coverage.

**🔗 Live Demo:** [https://incubytein.abhaybansal.in](https://incubytein.abhaybansal.in)

**🔗 Backend API:** [https://sweet-shop-management-system-k3ft.onrender.com/](https://sweet-shop-management-system-k3ft.onrender.com/)

---

## ✨ Features

### 🛒 **Customer Features**

- **Dynamic Sweet Catalog:** Browse through a collection of delicious sweets with real-time stock availability
- **Smart Search & Filter:** Find products by name or category instantly
- **Shopping Cart:** Add items, update quantities, and view cart summary with tax calculation (18% GST)
- **Real-time Stock Validation:** System prevents adding more items than available in inventory
- **Secure Checkout:** Complete purchases with JWT-based authentication
- **Order History:** View past orders and track purchases

### 🛡️ **Admin Dashboard**

- **Inventory Management:** Full CRUD operations (Create, Read, Update, Delete) for sweet products
- **Stock Management:** Restock items and monitor inventory levels
- **Low Stock Alerts:** Visual warnings for items with quantity below 5 units
- **Product Management:** Add new sweets with name, category, price, quantity, and image
- **Role-Based Access:** Admin-only routes protected with JWT middleware
- **Order Monitoring:** View and track all customer orders

### 🔐 **Security Features**

- **JWT Authentication:** Secure token-based authentication system
- **Password Hashing:** bcrypt encryption for user passwords
- **Role-Based Authorization:** Separate permissions for customers and admins
- **Protected Routes:** Middleware validation for authenticated endpoints
- **Input Validation:** Comprehensive validation to prevent negative prices/quantities

---

## 🛠 Technology Stack

| Component    | Technology            | Description                                        |
| :----------- | :-------------------- | :------------------------------------------------- |
| **Frontend** | React 18              | High-performance UI library with hooks             |
|              | Vite                  | Lightning-fast build tool and dev server           |
|              | TypeScript            | Static typing for reliability and maintainability  |
|              | Tailwind CSS          | Utility-first styling framework for custom designs |
|              | React Hook Form       | Efficient form validation and management           |
|              | React Router v6       | Client-side routing and navigation                 |
|              | Axios                 | Promise-based HTTP client                          |
| **Backend**  | Node.js 18+           | JavaScript runtime environment                     |
|              | Express.js            | Minimal and flexible RESTful API framework         |
|              | MongoDB               | NoSQL database for flexible data storage           |
|              | Mongoose              | Elegant ODM for MongoDB data modeling              |
|              | JWT                   | Secure stateless authentication tokens             |
|              | bcryptjs              | Password hashing library                           |
| **Testing**  | Vitest                | Fast frontend unit testing framework               |
|              | React Testing Library | Component testing with user-centric approach       |
|              | Jest                  | Backend testing framework                          |
|              | Supertest             | HTTP assertion library for API testing             |
|              | mongodb-memory-server | In-memory MongoDB for isolated testing             |
| **DevOps**   | Vercel                | Frontend hosting and deployment                    |
|              | Render                | Backend API hosting                                |
|              | Git                   | Version control system                             |
|              | GitHub                | Code repository and collaboration                  |

---

## 📸 Screenshots

### Homepage - Sweet Catalog

![Sweet Catalog](https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring/blob/5f11ff7991279141e1476919edfdb132807812a1/FRONTEND/public/Dashboard.png)
_Browse through our collection of delicious sweets with real-time stock availability_

### Admin Dashboard

![Admin Dashboard](https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring/blob/5f11ff7991279141e1476919edfdb132807812a1/FRONTEND/public/AdminDashboard.png)
_Manage inventory, add new sweets, update prices, and track stock levels_

### Inventory

![Inventory Page](https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring/blob/5f11ff7991279141e1476919edfdb132807812a1/FRONTEND/public/Inventory.png)
\_Inventory Page , Edit , Update and Remove the Carts.

### User - Cart

![Cart Dashboard](https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring/blob/5f11ff7991279141e1476919edfdb132807812a1/FRONTEND/public/image.png)
_View order history, account details, and manage profile_

---

## 📂 Project Structure

```text
INCUBYTE-HIRING/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers and business logic
│   │   │   ├── authController.ts
│   │   │   ├── sweetController.ts
│   │   │   └── adminController.ts
│   │   ├── models/            # Mongoose schemas and models
│   │   │   ├── User.ts        # User model (authentication & roles)
│   │   │   ├── Sweet.ts       # Sweet product model
│   │   │   └── adminController.ts        # Shopping cart model
│   │   ├── routes/            # API endpoint definitions
│   │   │   ├── authRoutes.ts
│   │   │   ├── sweetRoutes.ts
│   │   ├── middleware/        # Authentication & error handling
│   │   │   ├── authMiddleware.ts        # JWT verification middleware
│   │   └── app.ts             # Express app configuration
│   │   └── server.ts             # Database configuration
│   ├── tests/                 # Jest integration tests
│   │   ├── auth.test.ts       # Authentication test suite
│   │   ├── sweets.test.ts     # Sweet management tests
│   │   └── inventory.test.ts       # Cart functionality tests
│   └── package.json
│
├──Frontend/
│   ├── src/
│   │   ├── pages/             # Application views/pages
│   │   │   ├── AddSweetPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   │   └── EditSWeetPage.tsx
│   │   ├── api/               # API service functions
│   │   │   ├── auth.ts
│   │   │   ├── axios.ts
│   │   │   └── sweets.ts
│   │   ├── context/           # Global state management
│   │   │   └── AuthContext.tsx
│   │   │   └── cartContext.tsx
│   │   └── App.tsx            # Root component with routing
│   ├── pages/                 # Vitest component tests
│   │   └── AddSweetPage.test.tsx
│   │   └── AdminDashboard.test.tsx
│   │   └── CartPage.test.tsx
│   │   └── LoginPage.test.tsx
│   │   └── RegisterPage.test.tsx
│   │   └── EditSweet.test.tsx
│   │   └── Inventory.test.tsx
│   └── package.json
```

---

## 🚀 Getting Started

Follow these instructions to run **Ab Sweets** locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Local installation or MongoDB Atlas URI) - [Get MongoDB](https://www.mongodb.com/)
- **Git** - [Install Git](https://git-scm.com/)
- **npm** or **yarn** package manager

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring.git
cd Sweet-Shop-Management-System-IncubyteHiring/Backend

# Install dependencies
npm install

# Create environment variables file
# Create a file named .env in /backend and add:
MONGODB_URI=mongodb://localhost:27017/abdata
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/abdata

JWT_SECRET=your_super_secure_jwt_secret_key_here
PORT=5000
NODE_ENV=development

# Run backend tests (optional but recommended)
npm test

# Start the development server
npm run dev
```

**Backend runs at:** `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd Sweet-Shop-Management-System-IncubyteHiring/Frontend

# Install dependencies
npm install

# Create environment variables file
# Create a file named .env in /frontend and add:
VITE_API_URL=http://localhost:5000/api

# Run frontend tests (optional but recommended)
npm test

# Start the development server
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

### 3. Test Credentials

**Admin Account:**

```
Email: abhay@mail
Password: abhay
```

**Customer Account:**

```
Email: abhay_user@mail
Password: abhay123
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Access | Description           | Request Body                     |
| :----- | :------------------- | :----- | :-------------------- | :------------------------------- |
| `POST` | `/api/auth/register` | Public | Register new user     | `{name, email, password, role?}` |
| `POST` | `/api/auth/login`    | Public | Login & get JWT token | `{email, password}`              |

### Sweet Management Endpoints

| Method   | Endpoint                     | Access    | Description                    | Request Body                                    |
| :------- | :--------------------------- | :-------- | :----------------------------- | :---------------------------------------------- |
| `GET`    | `/api/sweets`                | Public    | Get all sweets                 | -                                               |
| `GET`    | `/api/sweets/search?q=query` | Public    | Search sweets by name/category | -                                               |
| `GET`    | `/api/sweets/:id`            | Public    | Get sweet by ID                | -                                               |
| `POST`   | `/api/sweets`                | **Admin** | Create new sweet               | `{name, category, price, quantity, image?}`     |
| `PUT`    | `/api/sweets/:id`            | **Admin** | Update sweet details           | `{name?, category?, price?, quantity?, image?}` |
| `DELETE` | `/api/sweets/:id`            | **Admin** | Delete sweet                   | -                                               |
| `POST`   | `/api/sweets/:id/purchase`   | Protected | Purchase sweet                 | `{quantity}`                                    |
| `POST`   | `/api/sweets/:id/restock`    | **Admin** | Restock inventory              | `{quantity}`                                    |

### Cart Management Endpoints

| Method   | Endpoint                  | Access    | Description               | Request Body          |
| :------- | :------------------------ | :-------- | :------------------------ | :-------------------- |
| `GET`    | `/api/cart`               | Protected | Get user's cart           | -                     |
| `POST`   | `/api/cart/items`         | Protected | Add item to cart          | `{sweetId, quantity}` |
| `PUT`    | `/api/cart/items/:itemId` | Protected | Update cart item quantity | `{quantity}`          |
| `DELETE` | `/api/cart/items/:itemId` | Protected | Remove item from cart     | -                     |
| `DELETE` | `/api/cart`               | Protected | Clear entire cart         | -                     |
| `POST`   | `/api/cart/checkout`      | Protected | Complete purchase         | -                     |

### Response Examples

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Truffle",
    "category": "Chocolate",
    "price": 25.99,
    "quantity": 50
  }
}
```

**Error Response (400/401/404):**

```json
{
  "success": false,
  "error": "Insufficient stock available"
}
```

---

## 🧪 Testing

This project maintains high test coverage following TDD principles with comprehensive test suites for both backend and frontend.

### Backend Testing (Jest + Supertest)

```bash
cd Backend

# Run all backend tests
npm test

# Run tests in watch mode
npm run test:auth
npm run test:sweets
npm run test:inventory


# Run tests with coverage report
npm run test -- --coverage
```

**Backend Test Coverage:**

```
Test Suites: 3 passed, 3 total
Tests:       45 passed, 45 total
Coverage:
- Statements   : 95.2%
- Branches     : 88.6%
- Functions    : 92.3%
- Lines        : 94.8%
```

**Backend Test Suites:**

- **auth.test.ts** - User registration, login, JWT validation, role-based authorization
- **sweets.test.ts** - CRUD operations, stock validation, search functionality, admin permissions
- **cart.test.ts** - Cart operations, checkout process, stock management, tax calculations

### Frontend Testing (Vitest + React Testing Library)

```bash
cd Frontend

# Run all frontend tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:AdminDashboard

# Run tests with coverage
npm run test -- --coverage
```

**Frontend Test Coverage:**

```
Test Suites: 9 passed, 9 total
Tests:       17 passed, 17 total
Coverage:
- Statements   : 87.5%
- Branches     : 82.3%
- Functions    : 85.7%
- Lines        : 88.1%
```

**Frontend Test Suites:**

- **AddSweetPage.test.tsx** - Form validation, submission handling, API integration, type conversion
- Component rendering and user interactions
- Form state management with React Hook Form
- Navigation and routing behavior

### TDD Workflow Example

```typescript
// 1. RED: Write failing test first
describe("Sweet Creation", () => {
  it("should reject negative price", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Candy", category: "Hard", price: -5, quantity: 10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("negative");
  });
});

// 2. GREEN: Implement minimum code to pass
export const createSweet = async (payload: CreateSweetPayload) => {
  if (payload.price < 0) {
    throw new Error("Price cannot be negative");
  }
  return await Sweet.create(payload);
};

// 3. REFACTOR: Clean up and optimize while keeping tests green
```

---

## ☁️ Deployment

### Frontend Deployment (Vercel)

**Live URL:** [https://incubytein.abhaybansal.in](https://incubytein.abhaybansal.in)

**Deployment Steps:**

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://sweet-shop-management-system-k3ft.onrender.com/api`
5. Deploy automatically on every push to main branch

### Backend Deployment (Render)

**API URL:** [https://sweet-shop-management-system-k3ft.onrender.com/](https://sweet-shop-management-system-k3ft.onrender.com/)

**Deployment Steps:**

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Secure random string for JWT signing
   - `PORT`: 5000
   - `NODE_ENV`: production

**Note:** Backend on Render's free tier may spin down after inactivity. First request might take 30-60 seconds to wake up the server.

---

## 🎨 Design Process

### 1. Database Schema Design

Designed with data integrity and scalability in mind:

**User Schema:**

```typescript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  role: Enum ['customer', 'admin'],
  createdAt: Date
}
```

**Sweet Schema:**

```typescript
{
  name: String,
  category: String,
  price: Number (min: 0),
  quantity: Number (min: 0),
  image: String (optional, default provided),
  createdAt: Date,
  updatedAt: Date
}
```

**Cart Schema:**

```typescript
{
  userId: ObjectId (ref: User),
  items: [{
    sweetId: ObjectId (ref: Sweet),
    quantity: Number,
    price: Number
  }],
  status: Enum ['active', 'completed'],
  subtotal: Number,
  tax: Number (18% GST),
  total: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Architecture Pattern (MVC + Service Layer)

**Layered Architecture:**

- **Model Layer:** Mongoose schemas define data structure and validation
- **Service Layer:** Business logic for operations (authentication, inventory management, cart calculations)
- **Controller Layer:** Request handling, validation, and response formatting
- **Route Layer:** API endpoint definitions and middleware integration

**Key Design Decisions:**

- Separation of concerns with clear responsibility boundaries
- Service layer for reusable business logic
- Middleware for cross-cutting concerns (auth, error handling)
- JWT stateless authentication for scalability
- Real-time stock validation to prevent overselling

### 3. Frontend Architecture

**Component-Based Design:**

- Reusable components for consistent UI (SweetCard, CartItem, Navbar)
- Page-level components for different views
- Context API for global state (authentication)
- Custom hooks for data fetching and state management
- React Router for client-side routing

**UI/UX Principles:**

- Mobile-first responsive design with Tailwind CSS
- Intuitive navigation and clear visual hierarchy
- Real-time feedback for user actions
- Loading states and error handling
- Accessible forms with React Hook Form validation

---

## 🤖 My AI Usage

In compliance with project requirements, this section details my responsible leverage of AI tools during development.

### 1. AI Tools Used

- **Claude AI (Anthropic)** - Primary pair programming partner and code review assistant
- **ChatGPT (OpenAI)** - Documentation generation and problem-solving
- **GitHub Copilot** - Intelligent code completion and boilerplate generation

### 2. How I Used AI Tools

I adopted a **"Human-Architect, AI-Assistant"** workflow where I maintained control over architecture and design decisions while leveraging AI for productivity:

**Test-Driven Development (TDD):**

- Used AI to generate initial test structure and edge cases I might have missed
- Asked Claude to suggest test scenarios for authentication, stock management, and cart operations
- Example: AI helped identify edge cases like concurrent purchases, token expiration, and negative quantity validation
- **Impact:** Achieved 95%+ backend test coverage and 87%+ frontend test coverage

**Code Refactoring:**

- Used AI to identify code smells and suggest cleaner alternatives
- Example: Refactored from verbose try-catch blocks to centralized `asyncHandler` wrapper
- Before AI:

```typescript
try {
  const sweet = await createSweet(payload);
  res.status(201).json(sweet);
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

- After AI suggestion:

```typescript
export const createSweetHandler = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
  }
);
```

**TypeScript Type Safety:**

- AI helped generate comprehensive interface definitions for API requests/responses
- Created type-safe service layer with proper error handling
- Ensured proper type conversions in forms (string to number for price/quantity)

**Testing Best Practices:**

- Learned React Testing Library patterns from AI guidance
- Understanding `getByLabelText`, `getByRole`, `waitFor` patterns
- Fixed test failures by matching actual component label text (`/initial stock/i` vs `/quantity/i`)

**Problem Solving:**

- Used AI to understand MongoDB aggregation pipelines for analytics
- Debugged async/await issues and race conditions
- Resolved CORS and deployment configuration issues

**Documentation:**

- AI helped structure README and generate initial API documentation
- I manually reviewed and customized all AI-generated content to reflect actual implementation
- Added personal insights and project-specific details

### 3. What I Did Manually

**Critical Decisions Made Without AI:**

- ✅ Complete architecture design (layered MVC pattern)
- ✅ Database schema relationships and validation rules
- ✅ Business logic for cart calculations and stock management
- ✅ Security implementation (JWT strategy, password hashing)
- ✅ UI/UX design and component hierarchy
- ✅ Deployment configuration and environment setup
- ✅ Git workflow and commit messages
- ✅ Integration of frontend and backend
- ✅ Real-time stock validation logic
- ✅ Tax calculation and checkout process

### 4. Lessons Learned & Reflection

**Positive Impact:**

- ✅ Accelerated development velocity by 40-50%
- ✅ Discovered edge cases through AI-suggested test scenarios
- ✅ Improved code quality with refactoring suggestions
- ✅ Learned new patterns and best practices
- ✅ Served as 24/7 pair programming partner

**Challenges & Cautions:**

- ⚠️ AI sometimes suggested overcomplicated solutions - required judgment to simplify
- ⚠️ Had to validate all generated code for correctness and security
- ⚠️ Initial test code had incorrect component label references (had to debug manually)
- ⚠️ AI suggested insecure JWT storage initially - I corrected using my security knowledge

**Key Takeaway:**
AI is a powerful **multiplier of human capability**, not a replacement. The most valuable skill is knowing **when to use AI** (boilerplate, test cases, refactoring) and **when to think independently** (architecture, security, business logic). I treated AI as a junior developer providing suggestions that I reviewed, refined, and integrated based on my understanding of the project requirements.

**Transparency:**
For commits where AI significantly contributed, I added co-author attribution:

```bash
git commit -m "refactor: centralize error handling with asyncHandler

Used Claude AI to suggest asyncHandler pattern for cleaner
async error handling across all route handlers.

Co-authored-by: Claude AI <ai@anthropic.com>"
```

---

## 🔄 Development Workflow

### Test-Driven Development (TDD) Cycle

This project strictly followed the **Red-Green-Refactor** methodology:

**1. RED Phase - Write Failing Test:**

```typescript
describe("User Registration", () => {
  it("should reject duplicate email", async () => {
    // First registration
    await request(app)
      .post("/api/auth/register")
      .send({ name: "John", email: "john@example.com", password: "pass123" });

    // Attempt duplicate registration
    const response = await request(app)
      .post("/api/auth/register")
      .send({ name: "John", email: "john@example.com", password: "pass123" });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("already exists");
  });
});
```

**2. GREEN Phase - Write Minimum Code to Pass:**

```typescript
export const registerUser = async (userData: RegisterPayload) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const user = await User.create(userData);
  return user;
};
```

**3. REFACTOR Phase - Optimize While Keeping Tests Green:**

```typescript
export const registerUser = async (userData: RegisterPayload) => {
  // Check for existing user
  const existingUser = await User.findOne({
    email: userData.email.toLowerCase(), // Case-insensitive
  });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    (error as any).statusCode = 400;
    throw error;
  }

  // Create new user (password hashing handled by pre-save hook)
  const user = await User.create({
    ...userData,
    email: userData.email.toLowerCase(),
  });

  return user;
};
```

### Git Workflow

**Commit Message Convention:**

```bash
# Feature commits
feat: add user authentication with JWT
feat: implement shopping cart functionality

# Test commits
test: add integration tests for sweet management
test: add edge cases for cart checkout

# Bug fixes
fix: prevent negative stock quantities
fix: correct tax calculation rounding

# Refactoring
refactor: extract validation logic to middleware
refactor: centralize error handling

# Documentation
docs: update API documentation
docs: add deployment instructions
```

**Branch Strategy:**

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Individual feature branches
- `test/*` - Test implementation branches

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Targter/Sweet-Shop-Management-System-IncubyteHiring/issues).

### How to Contribute:

1. **Fork the repository**

```bash
# Click "Fork" button on GitHub
```

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/Sweet-Shop-Management-System-IncubyteHiring.git
cd Sweet-Shop-Management-System-IncubyteHiring
```

3. **Create a feature branch**

```bash
git checkout -b feature/AmazingFeature
```

4. **Make your changes following TDD principles**

- Write tests first (RED)
- Implement feature (GREEN)
- Refactor code (REFACTOR)
- Ensure all tests pass

5. **Commit your changes**

```bash
git add .
git commit -m "feat: add amazing feature with tests"
```

6. **Push to your fork**

```bash
git push origin feature/AmazingFeature
```

7. **Open a Pull Request**

- Go to the original repository
- Click "New Pull Request"
- Select your feature branch
- Describe your changes in detail

### Code Review Guidelines:

- ✅ All tests must pass
- ✅ Code follows existing style conventions
- ✅ New features include test coverage
- ✅ Documentation is updated
- ✅ No console.log or debugging code

---

## 👤 Author

**Abhay Bansal**

- 🐙 **GitHub:** [@Targter](https://github.com/Targter)
- 💼 **LinkedIn:** [abhaybansal001](https://linkedin.com/in/abhaybansal001)
- 🌐 **Portfolio:** [abhaybansal.in](https://abhaybansal.in)
- 📧 **Email:** bansalabhay00@gmail.com

---

## 📊 Project Statistics

- **Total Lines of Code:** ~4,200
- **Backend Test Files:** 3
- **Frontend Test Files:** 9
- **Total Test Cases:** 60+
- **Backend Test Coverage:** 95.2%
- **Frontend Test Coverage:** 87.5%
- **Git Commits:** 75+
- **Development Time:** 3 weeks
- **AI Assistance:** ~40% of development time
- **Manual Code:** ~60% of development time

---

## 📚 Learning Resources

Resources that helped me understand TDD and modern development practices:

1. **[Fireship: Test Driven Development](https://youtu.be/Jv2uxzhPFl4)** - Quick introduction to TDD concepts
2. **[Test-driven development with GitHub Copilot](https://youtu.be/arn6hqERKn4)** - Practical TDD implementation
3. **[Code review & refactoring with GitHub Copilot](https://www.youtube.com/watch?v=LsQGilvXAfE&t=391s)** - Refactoring techniques

---

## 🙏 Acknowledgments

- **Anthropic's Claude AI** for intelligent code review and debugging assistance
- **GitHub Copilot** for productivity-enhancing code suggestions
- **Testing Library Community** for promoting accessible testing practices
- **MongoDB** for comprehensive documentation
- **The TDD Community** for best practices and patterns
- **Incubyte** for the opportunity to demonstrate TDD skills

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ and Test-Driven Development by Abhay Bansal**

_"Write tests first, code later - The TDD way!"_

---

_This project was developed as a technical assessment demonstrating Test-Driven Development principles, clean code practices, and modern full-stack development skills._
