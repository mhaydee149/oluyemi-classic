# Oluyemi Classic IT E-commerce Platform

This is a full-stack e-commerce application developed for Oluyemi Classic IT. The platform enables users to browse a variety of IT products, manage a virtual shopping cart, register and log in to their accounts, and complete purchases securely online using Paystack integration.

The application features a responsive React-based frontend for a dynamic user experience and a robust Node.js/Express backend that handles business logic, user authentication, payment processing via webhooks, and order management. Key functionalities include user sign-up and login, password reset, product viewing, cart operations, secure payment processing, and order history tracking.


## Features

-   **User Authentication**: Secure user registration and login system with JWT-based session management. Includes "Forgot Password" and "Reset Password" functionality with email verification.
-   **Product Browsing**: Users can view a list of available IT products and access detailed information for each product.
-   **Shopping Cart**: Interactive shopping cart allowing users to add products, adjust quantities, and view cart contents, managed using React Context API.
-   **Checkout Process**: Streamlined checkout process for logged-in users.
-   **Secure Online Payments**: Integration with Paystack for secure payment processing. Includes backend webhook verification for robust and reliable order confirmation.
-   **Order Management & History**: Orders are saved to the database, and registered users can view their order history.
-   **Automated Email Notifications**: System sends automated emails for critical events such as order confirmations (upon successful payment via webhook) and password reset requests, utilizing Nodemailer with Gmail.
-   **Rate Limiting**: Applied to sensitive authentication routes (login, password reset) to enhance security against brute-force attacks.
-   **Input Validation**: Backend validation for user inputs during authentication and other processes to ensure data integrity.
-   **Responsive Frontend Design**: A modern user interface built with React, designed to be responsive across various devices (assumed standard for React applications).
-   **Environment-Driven Configuration**: Key settings like database URIs, JWT secrets, email credentials, and Paystack keys are managed via environment variables for better security and deployment flexibility.
-   **Integrated ChatBot**: A ChatBot component (`ChatBot.jsx`) is included, likely for customer support or engagement.


## Tech Stack

### Frontend
-   **Core Framework**: React.js
-   **Language**: JavaScript (ES6+)
-   **Routing**: React Router (`react-router-dom`)
-   **State Management**: React Context API (primarily for Shopping Cart)
-   **Payment Integration**: `react-paystack` for seamless Paystack UI integration.
-   **Styling**: CSS (custom stylesheets per component).

### Backend
-   **Runtime Environment**: Node.js
-   **Framework**: Express.js
-   **Authentication**: JSON Web Tokens (`jsonwebtoken`) for stateless session management, `bcryptjs` for secure password hashing.
-   **Email Service**: Nodemailer (configured for Gmail) for sending transactional emails (order confirmations, password resets).
-   **API Security**:
    -   `cors` for managing Cross-Origin Resource Sharing.
    -   `express-rate-limit` for protecting against brute-force attacks on sensitive routes.
-   **Configuration Management**: `dotenv` for handling environment variables.

### Database
-   **Type**: MongoDB (NoSQL)
-   **ODM (Object Data Modeling)**: Mongoose for interacting with MongoDB, defining schemas, and model validation.

### Services & Tools
-   **Payment Gateway**: Paystack (handles online payments, with webhook integration for backend order processing).
-   **Development Utility**: Nodemon (for automatic server restarts during backend development).


## Setup and Installation

This guide will walk you through setting up the Oluyemi Classic IT E-commerce Platform for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: Version 14.x or later is recommended. You can download it from [nodejs.org](https://nodejs.org/). Node.js comes with npm (Node Package Manager).
-   **MongoDB**: A running MongoDB instance. This can be a local installation or a cloud-hosted service like MongoDB Atlas. You'll need the connection URI string.
-   **Git**: For cloning the repository.

### Installation Steps

1.  **Clone the Repository:**
    Open your terminal or command prompt and run the following command:
    ```bash
    git clone <your-repository-url>
    ```
    Replace `<your-repository-url>` with the actual URL of the Git repository.
    Navigate into the cloned project directory:
    ```bash
    cd <project-directory-name>
    ```
    Replace `<project-directory-name>` with the name of the directory created by the clone.

2.  **Backend Setup:**

    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install backend dependencies:
        ```bash
        npm install
        ```
    *   **Create Environment File:**
        Create a new file named `.env` in the `backend` directory. Add the following environment variables, replacing the placeholder values with your actual credentials and settings:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        JWT_SECRET=a_very_strong_and_secret_key_for_jwt
        EMAIL_USER=your_gmail_address_for_sending_emails@gmail.com
        EMAIL_PASS=your_gmail_app_password_here
        PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here
        # FRONTEND_URL=http://localhost:3000 # Required for password reset links in emails
        PORT=5000 # Optional: The backend server will run on this port (defaults to 5000 if not set)
        ```
        *Notes on backend `.env` variables:*
        -   `MONGO_URI`: Your MongoDB connection string.
        -   `JWT_SECRET`: A long, random, and strong string used to sign JSON Web Tokens.
        -   `EMAIL_USER`: The Gmail account from which automated emails (like order confirmations, password resets) will be sent.
        -   `EMAIL_PASS`: An "App Password" for your Gmail account if 2-Step Verification is enabled. Otherwise, your regular Gmail password (less secure). Using App Passwords is highly recommended.
        -   `PAYSTACK_SECRET_KEY`: Your Paystack API secret key (usually starts with `sk_test_` for test mode).
        -   `FRONTEND_URL`: The base URL of your frontend application. This is crucial for constructing correct password reset links in emails. Uncomment and set if your frontend runs on a different port or domain.

    *   **Run the Backend Server:**
        For development with automatic reloading when files change (uses Nodemon):
        ```bash
        npm run dev
        ```
        For a standard production start (less common during development):
        ```bash
        npm start
        ```
        The backend server should start, typically on port 5000 (or the `PORT` you specified).

3.  **Frontend Setup:**

    *   Navigate to the project root directory from the `backend` directory:
        ```bash
        cd ..
        ```
    *   Install frontend dependencies (this installs dependencies listed in the root `package.json`):
        ```bash
        npm install
        ```
    *   **Create Environment File:**
        Create a new file named `.env` in the **project root** directory (alongside `src`, `public`, `backend`). Add the following environment variable:
        ```env
        REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
        ```
        *Note:* Replace `pk_test_your_paystack_public_key_here` with your actual Paystack public API key (usually starts with `pk_test_`).

    *   **Run the Frontend Development Server:**
        ```bash
        npm start
        ```
        This will start the React development server, typically on `http://localhost:3000`, and should open the application in your default web browser.

Once both backend and frontend servers are running, you should be able to access and test the Oluyemi Classic IT E-commerce Platform. Remember to configure your Paystack account with the correct webhook URL pointing to your backend (e.g., `http://localhost:5000/api/paystack/webhook` during local development, though Paystack webhooks require a publicly accessible URL, so tools like ngrok might be needed for local testing of webhooks).


## API Endpoints

This section provides an overview of the key backend API endpoints available in the Oluyemi Classic IT E-commerce Platform.

### Authentication (`/api/auth`)

Handles user authentication processes.

-   `POST /signup`
    -   **Description**: Registers a new user.
    -   **Request Body**: `{ "name": "Test User", "email": "user@example.com", "password": "password123" }`
    -   **Response**: Success message or error details.
-   `POST /login`
    -   **Description**: Logs in an existing user.
    -   **Request Body**: `{ "email": "user@example.com", "password": "password123" }`
    -   **Response**: JWT token and user details upon success.
-   `POST /forgot-password`
    -   **Description**: Initiates the password reset process by sending a reset link to the user's email.
    -   **Request Body**: `{ "email": "user@example.com" }`
    -   **Response**: Success message or error if email not found.
-   `POST /reset-password/:resetToken`
    -   **Description**: Allows a user to set a new password using a valid reset token.
    -   **Request Body**: `{ "password": "newPassword123" }`
    -   **URL Parameter**: `resetToken` (obtained from the password reset email link).
    -   **Response**: Success message or error if token is invalid/expired.

### Orders (`/api/orders`)

Manages user orders.

-   `GET /`
    -   **Description**: Retrieves a list of orders for the currently authenticated user.
    -   **Authentication**: Required (JWT Bearer token in `Authorization` header).
    -   **Response**: Array of order objects.

### Email (`/api`)

Handles direct email sending functionalities (though some are primarily triggered by other backend processes like webhooks or auth flows). The `emailRouter` is mounted at `/api`.

-   `POST /send-email` (mounted from `emailRouter` at `/api/send-email`)
    -   **Description**: Originally for payment confirmations; now, payment confirmation emails are primarily triggered by the Paystack webhook. This endpoint might serve other ad-hoc email purposes or be deprecated for payment confirmations.
    -   **Request Body**: `{ "email": "customer@example.com", "reference": "payment_ref", ... }` (Payload might vary based on actual use).
-   `POST /send-reset-password-email` (mounted from `emailRouter` at `/api/send-reset-password-email`)
    -   **Description**: An alternative endpoint for sending password reset emails. The primary logic for sending password reset emails is integrated within the `/api/auth/forgot-password` flow.
    -   **Request Body**: `{ "email": "user@example.com", "resetUrl": "http://frontend/reset-url" }`

### Paystack Webhook (`/api/paystack`)

Handles incoming webhook events from Paystack.

-   `POST /webhook`
    -   **Description**: Listens for events from Paystack, primarily `charge.success`, to verify payments, create orders in the database, and trigger post-payment actions like sending detailed order confirmation emails.
    -   **Security**: Validates incoming requests using the `x-paystack-signature` header and your Paystack Secret Key.
    -   **Request Body**: Paystack event payload (JSON).
    -   **Response**: `200 OK` to acknowledge receipt of the event. Internal processing errors are handled without sending a `500` to Paystack if the event itself was validly received, to prevent unnecessary retries for issues Paystack cannot resolve.

*Note: For protected routes, ensure the `Authorization` header is set with `Bearer <YOUR_JWT_TOKEN>`.*


## Contributing

Contributions are welcome and greatly appreciated! If you'd like to contribute to the Oluyemi Classic IT E-commerce Platform, please follow these general guidelines:

1.  **Fork the Repository**: Start by forking the main repository to your own GitHub account.
2.  **Create a Branch**: Create a new branch in your forked repository for your feature, bug fix, or improvement. Use a descriptive naming convention, for example:
    *   `feature/your-descriptive-feature-name`
    *   `bugfix/issue-number-short-description`
    *   `refactor/component-or-module-name`
    ```bash
    git checkout -b feature/new-user-dashboard
    ```
3.  **Make Your Changes**: Implement your feature or fix the bug. Ensure your code is clean and well-commented where necessary.
4.  **Commit Your Changes**: Commit your changes with clear, concise, and descriptive commit messages.
    ```bash
    git commit -m "feat: Add new user dashboard page"
    ```
    (Consider using [Conventional Commits](https://www.conventionalcommits.org/) for commit message formatting if the project adopts it).
5.  **Push to Your Fork**: Push your changes to your forked repository.
    ```bash
    git push origin feature/new-user-dashboard
    ```
6.  **Create a Pull Request (PR)**: Open a Pull Request from your branch to the `main` (or `develop`, please check the repository's default branch) branch of the original Oluyemi Classic IT repository.
    -   Provide a clear title and description for your PR, explaining the changes and any relevant context.
    -   If your PR addresses an existing issue, please link to it (e.g., "Closes #123").

**Additional Notes:**

-   Please ensure your code adheres to any existing coding styles or linting configurations present in the project (if any).
-   If you're working on a larger feature, it's a good idea to discuss it in an issue first to ensure it aligns with the project's goals.
-   Be respectful and constructive in all communications.

Thank you for considering contributing to the project!
