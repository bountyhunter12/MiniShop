# MiniShop – QA Automation & Testing Project

MiniShop is a simple full-stack e-commerce application built to demonstrate comprehensive **Quality Assurance (QA)** practices across manual testing, API testing, unit testing, and end-to-end automation.

This project simulates a real-world QA workflow on a small but fully functional web application.

---

##  Table of Contents

- [Application Features](#-application-features)
- [QA Scope & Testing Strategy](#-qa-scope--testing-strategy)
- [Project Structure](#-project-structure)
- [How to Run the Project](#-how-to-run-the-project)
- [Sample Bug Report](#-sample-bug-report)
- [Skills Demonstrated](#-skills-demonstrated)

---

##  Application Features

| Feature | Description |
|--------|-------------|
| User Login | Authentication with token-based access |
| Product Listing | Browse available products |
| Cart Management | Add / Remove items from cart |
| Checkout | Form validation and order submission |
| Order Confirmation | Post-checkout success state |

**Tech Stack:**
- **Backend:** Node.js + Express
- **Frontend:** React (Vite)

---

## QA Scope & Testing Strategy

###  Manual Testing

Designed detailed test cases covering:
- Positive & Negative scenarios
- Boundary testing
- Validation testing
- Authentication & authorization checks

Deliverables created:
- Test Plan
- Smoke Test Checklist
- Regression Test Suite
- Bug Reports

 Location: `/qa/`

---

###  Smoke Testing

Verified the critical happy path:

- ✔ Login works
- ✔ Products load correctly
- ✔ Add to cart works
- ✔ Checkout completes successfully

 Checklist: `qa/smoke-checklist.md`

---

###  Regression Testing

Comprehensive regression suite covering:

- Login validation
- Invalid quantity handling
- Missing authentication token (401 errors)
- Checkout validation errors
- Cart state consistency
- API error responses

 Location: `qa/regression-checklist.md`

---

###  API Testing (Postman)

Created a full Postman Collection with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/login` | User authentication |
| `GET` | `/products` | Fetch product list |
| `POST` | `/cart/add` | Add item to cart |
| `GET` | `/cart` | Retrieve cart contents |
| `POST` | `/checkout` | Submit order |

Each request includes:
- Status code validation
- Response structure validation
- Token handling via environment variables
- Negative test scenarios (401, 400 errors)

 Location:
```
postman/
├── MiniShop.postman_collection.json
└── MiniShop.postman_environment.json
```

---

###  Edge-Case Validation

Tested boundary and negative scenarios including:

- Empty login fields
- Invalid email format
- Password too short
- Quantity = 0 or negative
- Missing authentication token
- Checkout with empty cart
- Short address input (under minimum length)
- Invalid payment method

---

###  Unit Testing (Jest)

Implemented unit tests for core business logic:

- Login input validation
- Cart total calculation
- Checkout validation rules

 Location: `api/src/__tests__/`

**Run unit tests:**

```bash
cd api
npm test
```

---

###  End-to-End Testing (Cypress)

Automated critical user flows:

- ✔ Successful checkout flow
- ✔ Negative checkout validation (form errors, edge cases)

 Location: `cypress/e2e/`

**Run Cypress:**

```bash
npx cypress open
```

---

##  Project Structure

```
minishop-qa/
│
├── api/                    # Backend (Node.js + Express)
│   └── src/
│       └── __tests__/      # Jest unit tests
│
├── web/                    # Frontend (React + Vite)
│
├── cypress/                # E2E automation tests
│   └── e2e/
│
├── postman/                # API test collections
│   ├── MiniShop.postman_collection.json
│   └── MiniShop.postman_environment.json
│
├── qa/                     # Manual test documentation
│   ├── smoke-checklist.md
│   └── regression-checklist.md
│
└── README.md
```

---

##  How to Run the Project

###  Start Backend

```bash
cd api
npm install
npm run dev
```

> API runs at: `http://localhost:4000`

---

###  Start Frontend

```bash
cd web
npm install
npm run dev
```

> App runs at: `http://localhost:5173`

---

###  Run Unit Tests

```bash
cd api
npm test
```

---

###  Run Cypress E2E Tests

>  Ensure both frontend and backend are running before launching Cypress.

```bash
npx cypress open
```

---

##  Sample Bug Report

| Field | Details |
|-------|---------|
| **Title** | Checkout allows submission with very short address |
| **Severity** | Medium |
| **Steps to Reproduce** | Enter a 1–2 character address and submit checkout |
| **Expected Result** | Validation error — address must be at least 5 characters |
| **Actual Result** | Order submitted successfully with invalid address |
| **Status** |  Fixed |

---

##  Skills Demonstrated

###  Testing & QA
- Manual Testing
- Test Case Design
- Smoke Testing
- Regression Testing
- API Testing with Postman
- Debugging & Defect Reporting
- Edge-case & Boundary Validation

###  Automation
- **Jest** — Unit Testing
- **Cypress** — End-to-End Testing

---

##  What This Project Demonstrates

This project showcases the ability to:

- Design structured, professional test documentation
- Perform functional and negative testing across layers
- Validate APIs independently using Postman
- Automate critical user workflows with Cypress
- Write unit tests for core business logic with Jest
- Identify, document, and track defects clearly

---

##  License

MIT © 2024