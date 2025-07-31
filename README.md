# Shopping Cart Application

A full-stack shopping cart application built with **React** (frontend) and **Node.js/Express/MongoDB** (backend).

---

## Project Structure

```
├── client/             # Frontend React application
│   ├── public/         # Static files
│   └── src/            # React source code
│       ├── components/ # Reusable UI components
│       ├── context/    # React context for state management
│       └── pages/      # Application pages
├── server/             # Backend Node.js/Express application
│   ├── controllers/    # API controllers
│   ├── models/         # Database models (Mongoose)
│   ├── routes/         # Express route handlers
│   └── server.js       # Entry point
└── README.md           # Project documentation
```

---

## Features

- User authentication (login/register)
- Product listing
- Shopping cart management (add, remove items)
- Order processing and history
- Responsive design for mobile and desktop

---

## Technologies Used

### Frontend

- React.js
- React Context API for state management
- React Router for navigation
- Styled Components for styling
- Axios for API requests

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin requests

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```
3. **Set up environment variables:**
   - In `server/`, create a `.env` file:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Start the development servers:**
   ```bash
   # In server/
   npm start

   # In client/ (in a separate terminal)
   npm start
   ```

---

## API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | /users           | Register a new user                |
| POST   | /users/login     | Login a user                       |
| GET    | /users           | List all users                     |
| GET    | /users/me        | Get current user info (auth)       |
| GET    | /items           | Get all items                      |
| GET    | /items/:id       | Get a specific item                |
| POST   | /items           | Create a new item                  |
| GET    | /carts           | Get user's cart (auth)             |
| POST   | /carts           | Add item to cart (auth)            |
| DELETE | /carts/:id       | Remove item from cart (auth)       |
| GET    | /orders          | Get user's orders (auth)           |
| POST   | /orders          | Create a new order from cart (auth)|

> **Note:** Endpoints marked (auth) require a valid JWT token in the `Authorization` header.

---

## Usage

- Register or login as a user.
- Browse products and add them to your cart.
- View your cart and proceed to checkout.
- View your order history.

---

## License

MIT

---

**Tip:**  
For API testing, you can use the included Postman collection (if provided) or tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).
