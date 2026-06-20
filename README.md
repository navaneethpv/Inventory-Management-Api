# Inventory & Order Management System

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Features

* User Registration
* User Login
* Category Management
* Product Management
* Order Management
* Search
* Filter
* Pagination

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

### Example

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/inventory_management

JWT_SECRET=mysecretkey123
```

## Installation

Clone the repository:

```bash
git clone https://github.com/navaneethpv/Inventory-Management-Api.git
```

Install dependencies with npm:

```bash
npm install
```

If you prefer pnpm, you can also run:

```bash
pnpm install
```

Start the development server:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

## API Features

### Authentication

* Register User
* Login User

### Category Management

* Create Category
* List Categories
* Update Category
* Delete Category

### Product Management

* Create Product
* List Products
* Get Product Details
* Update Product
* Delete Product
* Search Products
* Filter Products by Category
* Pagination

### Order Management

* Create Order
* List Orders
* Get Order Details
* Update Order Status
* Automatic Total Calculation
* Stock Validation
* Stock Reduction on Order Confirmation

```
```
