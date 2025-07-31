# Shopping Cart Application

A full-stack shopping cart application built with **React** (frontend) and **Node.js/Express/MongoDB** (backend).

## 🚀 Live Demo

[Add your deployed application URL here]

## 📋 Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Product Management**: Browse and view all available products
- **Shopping Cart**: Add/remove items from cart with real-time updates
- **Order Processing**: Convert cart to orders with checkout functionality
- **Order History**: View all previous orders
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI framework
- **React Context API** - State management
- **React Router** - Navigation
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable UI components
│       ├── context/       # React context for state management
│       ├── pages/         # Application pages
│       └── utils/         # Utility functions (API, etc.)
├── server/                # Backend Node.js/Express application
│   ├── controllers/       # API controllers
│   ├── models/           # Database models (Mongoose)
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvsolvzz/SHOPING-CART.git
   cd SHOPING-CART
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   
   **For local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017/shopping-cart
   JWT_SECRET=mysecretkey123
   PORT=5000
   ```
   
   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=mysecretkey123
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (in server/ directory)
   cd server
   npm start

   # Start frontend server (in client/ directory, new terminal)
   cd client
   npm start
   ```

5. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Register a new user | No |
| POST | `/users/login` | Login user | No |
| GET | `/users` | List all users | No |
| GET | `/users/me` | Get current user info | Yes |

### Items Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/items` | Get all items | No |
| GET | `/items/:id` | Get specific item | No |
| POST | `/items` | Create new item | Yes |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/carts` | Get user's cart | Yes |
| POST | `/carts` | Add item to cart | Yes |
| DELETE | `/carts/:id` | Remove item from cart | Yes |

### Orders Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get user's orders | Yes |
| POST | `/orders` | Create order from cart | Yes |

### Request/Response Examples

#### Register User
```bash
POST /users
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Login User
```bash
POST /users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Add Item to Cart
```bash
POST /carts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "item_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 2
}
```

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Products**: View all available items on the home page
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Use the cart button to see items in your cart
5. **Checkout**: Click "Checkout" to convert cart to order
6. **Order History**: View all your previous orders

## 🔧 Development

### Available Scripts

**Backend (server/)**
```bash
npm start          # Start development server
npm run dev        # Start with nodemon (if configured)
```

**Frontend (client/)**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/shopping-cart` |
| `JWT_SECRET` | Secret key for JWT tokens | `mysecretkey123` |
| `PORT` | Server port | `5000` |

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or Render
3. Ensure MongoDB connection is properly configured

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API base URL to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhruv Garg**
- GitHub: [@dhruvsolvzz](https://github.com/dhruvsolvzz)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All contributors and supporters

---

**⭐ If you found this project helpful, please give it a star!**
