# Restful-booker API Automation

A comprehensive API testing automation project for [Restful-booker](https://restful-booker.herokuapp.com/), a RESTful booking API. Built with Playwright, TypeScript, and following Service Layer architecture.

## About This Project

After completing my UI testing project with OrangeHRM, I wanted to expand my QA skillset into **API testing** - a critical capability that many companies specifically look for. This project demonstrates professional API testing practices and modern automation patterns.

**Current Status:** 4 CRUD operations automated | ✅ All tests passing | Service Layer Pattern implemented

## What I Learned

Building this project taught me:

* The fundamental differences between **UI and API testing** beyond just "with or without browser"
* Working with **HTTP requests** (GET, POST, PUT, DELETE) and **status codes**
* **JSON parsing** and data validation in TypeScript
* Implementing **token-based authentication** for secure endpoints
* **Service Layer Pattern** for clean, maintainable API test code
* How APIs don't always follow their own documentation (learned to test reality vs. expectations)
* Designing **independent, robust tests** that don't rely on existing data

## Technologies Used

* **Test Framework:** Playwright
* **Language:** TypeScript
* **Design Pattern:** Service Layer Pattern
* **API:** RESTful-booker (Hotel Booking API)
* **HTTP Methods:** GET, POST, PUT, DELETE
* **Authentication:** Token-based (Cookie header)
* **CI/CD:** GitHub Actions
* **Runtime:** Node.js

## Project Structure
```
restful-booker-api-automation/
├── services/
│   ├── booking.service.ts       # Booking operations (CRUD)
│   └── auth.service.ts          # Authentication (token management)
├── tests/
│   └── booking.spec.ts          # Complete test suite
├── fixtures/
│   └── testData.ts              # Test data (booking info, auth credentials)
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Dependencies
└── .gitignore                   # Excluded files
```

## What the Tests Cover

### Test 1: Create Booking (POST)
Creates a new hotel reservation and validates:
* Status code 200
* Booking ID generation (numeric, > 0)
* Response data matches sent data (firstname, lastname, totalprice)

### Test 2: Get Booking by ID (GET)
Retrieves a specific booking and validates:
* Status code 200
* Correct booking data returned
* Data integrity (matches original creation)

### Test 3: Update Booking (PUT)
Modifies an existing reservation and validates:
* Status code 200 (with authentication token)
* Updated data persists correctly
* Changes are reflected in subsequent GET requests

### Test 4: Delete Booking (DELETE)
Removes a reservation and validates:
* Status code 201 (API-specific response)
* Booking no longer exists (GET returns 404)
* Proper authentication required

## Service Layer Architecture

This project uses **Service Layer Pattern** - the API equivalent of Page Object Model:

### Why Service Layer?

**Benefits:**
* **Reusability** - Methods used across multiple tests
* **Maintainability** - Endpoint changes updated in one place
* **Separation of Concerns** - Services handle requests, tests handle validations
* **Readability** - Tests are clean and focused

### Structure
```
Service Classes (API interaction)
├── BookingService
│   ├── createBooking()
│   ├── getBooking()
│   ├── updateBooking()
│   └── deleteBooking()
└── AuthService
    └── getToken()

Test Specs (Validation logic)
└── booking.spec.ts
    ├── Validates responses
    ├── Asserts data correctness
    └── Combines service methods
```

## How to Run This Project

### Requirements

* Node.js (v18 or higher)
* npm (comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ManuelTissone/restful-booker-api-automation.git
cd restful-booker-api-automation
```

2. Install dependencies:
```bash
npm install
```

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test booking.spec.ts
```

Run with UI mode (see test execution):
```bash
npx playwright test --ui
```

### Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Key Technical Decisions

### 1. Test Independence

Each test creates its own data (POST) before testing other operations. This ensures:
* Tests can run in any order
* No dependency on existing API data
* Failures are isolated and easier to debug

### 2. Data Management

Test data centralized in `fixtures/testData.ts`:
```typescript
export const bookingData = { ... };        // Original booking
export const updatedBookingData = { ... }; // Modified booking
export const authData = { ... };           // Credentials
```

**Benefits:** Easy to modify test data without touching test logic.

### 3. Status Code Validation

The API documentation sometimes differs from actual behavior:
* **Documented:** DELETE returns 200
* **Actual:** DELETE returns 201

**My approach:** Validate against reality, document the discrepancy.
```typescript
// The doc says 200, but the API returns 201 (Created)
expect(deleteResponse.status()).toBe(201);
```

This shows technical awareness and pragmatic problem-solving.
### Challenge 1: Understanding Request vs. Response

**Problem:** Confusing what I send (request body) vs. what I receive (response body).

**Solution:** Created clear variable naming:
```typescript
const postResponse = await ...     // What API sends back
const responseBody = await ...     // Parsed JSON data
```

### Challenge 2: Parsing JSON

**Problem:** Accessing response data incorrectly.

**Solution:** Always parse first, then access:
```typescript
const response = await ...;           // Raw response
const body = await response.json();   // Parsed object
const bookingid = body.bookingid;     // Access property
```

### Challenge 3: Headers vs. Body vs. URL

**Problem:** Not knowing where to put data (token in body? ID in headers?).

**Solution:** Learned the pattern:
* **URL:** Resource identifiers (`/booking/123`)
* **Headers:** Metadata (auth tokens, content-type)
* **Body:** The actual data to send/receive

## Future Improvements

* Add negative test scenarios (invalid data, unauthorized access)
* Implement schema validation with JSON Schema
* Add performance testing (response time assertions)
* Test pagination and filtering (GET all bookings)
* Add data-driven testing (multiple booking scenarios)
* Implement API contract testing
* Add stress/load testing scenarios

## What This Project Demonstrates

To potential employers, this project shows:

✅ Understanding of RESTful API principles
✅ Ability to write clean, maintainable test code
✅ Knowledge of authentication patterns
✅ Service Layer architecture implementation
✅ TypeScript proficiency
✅ Modern testing framework usage (Playwright)
✅ Professional project structure
✅ Problem-solving and debugging skills

## Learning Outcomes

**Before this project:**
* "API testing" was abstract
* Didn't understand HTTP methods beyond theory
* Thought authentication was always complex

**After this project:**
* Can explain the difference between POST and PUT confidently
* Understand when and why APIs need authentication
* Know how to structure professional API test frameworks
* Recognize that API testing is often faster and more reliable than UI testing

## Next Steps in My Learning Journey

* Explore GraphQL API testing
* Learn API performance/load testing tools
* Study API security testing techniques
* Integrate API tests into full CI/CD pipelines
* Contribute to open-source API testing projects

## About Me

I'm a QA Automation professional building real-world projects to demonstrate modern testing practices. This project marks my transition from UI-only testing to full-stack test automation capabilities.

## Contact

* **LinkedIn:** [manuel-tissone-585b10378](https://www.linkedin.com/in/manuel-tissone-585b10378)
* **Email:** [m.mtissone@gmail.com](mailto:m.mtissone@gmail.com)
* **GitHub:** [@ManuelTissone](https://github.com/ManuelTissone)

---

This is an actively maintained project showcasing professional API testing practices.