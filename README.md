# 🚀 Express TypeScript API with MongoDB

This is an API built using **Express.js**, **TypeScript**, and **MongoDB**. It includes features such as placing orders, managing flash sales, and WebSocket real-time updates.

---

## 📌 Features

- 🛒 **Order Management** (Place, Cancel, Get Orders)
- ⚡ **Flash Sale Stock Management**
- 🔄 **Real-time WebSocket Updates**
- 🔐 **Secure with Environment Variables**

---

## Project Setup

### 1 Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo

```

### 2 Install Dependencies

npm install

### Set Up Environment Variables

Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/yourDatabaseName
JWT_SECRET=your_secret_key

Note: Replace yourDatabaseName with your MongoDB database name.

## Running the API

### Start the Development Server

npm run dev

### Build for Production

npm run build
npm start

### WebSocket Integration

- orderPlaced – Emitted when a new order is placed.
- stockUpdated – Emitted when stock levels change.
