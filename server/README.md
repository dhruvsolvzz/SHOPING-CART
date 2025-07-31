# Shopping Cart Backend

This is the Node.js backend for the Shopping Cart application. It provides RESTful API endpoints for user authentication, product management, shopping cart functionality, and order processing.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/shopping-cart
   JWT_SECRET=your_secret_key_change_this_in_production
   NODE_ENV=development
   ```
   Note: Replace the `MONGO_URI` with your MongoDB connection string and use a strong, unique `JWT_SECRET`.

### Running the Server

- For development (with auto-reload):
  ```
  npm run dev
  ```

- For production:
  ```
  npm start
  ```

### Seeding the Database

To populate the database with sample products:
```
npm run seed
```

## API Endpoints

### Authentication

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user (requires authentication)

### Products

- `GET /api/items` - Get all products
- `GET /api/items/:id` - Get a specific product
- `POST /api/items` - Create a new product (requires authentication)

### Shopping Cart

- `GET /api/carts` - Get user's cart (requires authentication)
- `POST /api/carts` - Add item to cart (requires authentication)
- `DELETE /api/carts/:item_id` - Remove item from cart (requires authentication)

### Orders

- `GET /api/orders` - Get user's orders (requires authentication)
- `POST /api/orders` - Create a new order from cart (requires authentication)
- `GET /api/orders/:id` - Get a specific order (requires authentication)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format:
```json
{
  "error": "Error message"
}
```

For validation errors, the response will include an array of errors:
```json
{
  "errors": [
    {
      "msg": "Username is required",
      "param": "username",
      "location": "body"
    }
  ]
}
```