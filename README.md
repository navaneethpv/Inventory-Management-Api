# Inventory & Order Management System API

A robust Node.js and Express-based REST API for managing inventory, categories, products, and customer orders. It features secure JWT authentication, pagination/filtering for products, and order status tracking with automated stock reduction.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js (v5)
* **Database:** MongoDB & Mongoose
* **Security:** JWT Authentication & Password Hashing (bcrypt)

---

## Getting Started

### 1. Installation
Clone the repository:
```bash
git clone https://github.com/navaneethpv/Inventory-Management-Api.git
cd Inventory-Management-Api
```

Install dependencies:
```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

### 3. Run the Server
Start the development server with hot-reloading:
```bash
npm run dev
```
The server will start running on: `http://localhost:4000` (or the PORT defined in your `.env`).

---

## Authentication & Headers

Protected routes require the client to supply a JSON Web Token (JWT) in the headers.

**Format:**
```http
Authorization: Bearer <your_jwt_token>
```

---

## API Reference & Endpoints

### 1. Authentication (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | No | Register a new user account |
| `POST` | `/api/auth/login` | No | Validate credentials and receive JWT |

#### Register payload (`POST /api/auth/register`)
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Login payload (`POST /api/auth/login`)
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### 2. User Profile (`/api/user`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/user/profile` | Yes | Get the authenticated user's profile |

---

### 3. Category Management (`/api/category`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/category/create` | Yes | Create a new category |
| `GET` | `/api/category/list` | Yes | Retrieve all categories sorted by newest first |
| `PUT` | `/api/category/update/:id` | Yes | Update a category name by ID |
| `DELETE` | `/api/category/delete/:id` | Yes | Delete a category by ID |

#### Create/Update Category payload (`POST /api/category/create` & `PUT /api/category/update/:id`)
```json
{
  "name": "Electronics"
}
```

---

### 4. Product Management (`/api/products`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/products/add` | Yes | Add a new product |
| `GET` | `/api/products` | Yes | Retrieve all products (Supports pagination, search, filter) |
| `GET` | `/api/products/:id` | Yes | Retrieve specific product details by ID |
| `PUT` | `/api/products/:id` | Yes | Update product details by ID |
| `DELETE` | `/api/products/:id` | Yes | Delete a product by ID |

#### Add/Update Product payload (`POST /api/products/add` & `PUT /api/products/:id`)
```json
{
  "category": "60d0fe4f53112b32f83e0a12", // Category ObjectId
  "name": "Smartphone X",
  "description": "Latest generation high-performance smartphone",
  "price": 799.99,
  "stockQuantity": 50,
  "status": "Active" // Optional: "Active" (default) or "Inactive"
}
```

#### Query Parameters for Listing (`GET /api/products`)
* `search` (String): Filter products matching the name (case-insensitive regex match).
* `category` (String): Filter products belonging to a specific Category ID.
* `page` (Number): Page number for pagination (default: `1`).
* `limit` (Number): Number of products to retrieve per page (default: `10`).

---

### 5. Order Management (`/api/orders`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/orders/create` | Yes | Place a new order |
| `GET` | `/api/orders/list` | Yes | List all orders sorted by newest |
| `GET` | `/api/orders/:id` | Yes | Get detailed order summary including product info |
| `PUT` | `/api/orders/:id/status` | Yes | Update the order status (Triggers inventory reduction on Confirmed) |

#### Create Order payload (`POST /api/orders/create`)
```json
{
  "items": [
    {
      "productId": "60d0fe4f53112b32f83e0a15",
      "quantity": 2
    },
    {
      "productId": "60d0fe4f53112b32f83e0a18",
      "quantity": 1
    }
  ]
}
```

#### Update Status payload (`PUT /api/orders/:id/status`)
* Accepted statuses: `"Pending"`, `"Confirmed"`, `"Delivered"`, `"Cancelled"`
* *Note: Changing an order's status to `"Confirmed"` checks for sufficient stock levels and automatically reduces the product inventory (`stockQuantity`) by the purchased amount.*
```json
{
  "status": "Confirmed"
}
```
