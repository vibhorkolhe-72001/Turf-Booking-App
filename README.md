# 🏟️ Turf Booking App  

A **full-stack web application** for booking sports turfs, featuring a **user-friendly interface for customers** and a **powerful admin dashboard** for turf owners and managers.  

---

## 📑 Table of Contents  
- [Project Structure](#project-structure)  
- [Features](#features)  
  - [User Features](#user-features)  
  - [Admin Features](#admin-features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Scripts](#scripts)  
- [Folder Overview](#folder-overview)  
- [API Overview](#api-overview)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 📂 Project Structure  

```
admin/      # Admin dashboard (React + Vite)
frontend/   # User-facing frontend (React + Vite)
backend/    # Node.js/Express backend API
```

---

## ✨ Features  

### 👤 User Features  
- 🔑 **Sign Up / Login** – Secure authentication for users  
- 🏟️ **Browse Turfs** – View available turfs with images, locations, and details  
- 📅 **Book Turf** – Select date, time, and confirm a booking  
- 📋 **View Bookings** – See upcoming and past bookings  
- 📱 **Responsive Design** – Works seamlessly on desktop & mobile  

### 🛠️ Admin Features  
- 🔑 **Admin Authentication** – Secure login for admins  
- 🏟️ **Manage Turfs** – Add, edit, or remove turf listings  
- 📅 **Manage Bookings** – View and manage all user bookings  
- 👥 **User Management** – View registered users and their activity  
- 📊 **Analytics (optional)** – Dashboard with booking statistics  

---

## 🛠️ Tech Stack  

- **Frontend:** React, Vite, CSS (modular structure)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Other Tools:** JWT (authentication), RESTful API, ESLint (code quality)  

---

## 🚀 Setup & Installation  

### ✅ Prerequisites  
- Node.js (v16+ recommended)  
- npm or yarn  
- MongoDB (local or Atlas cloud)  

### 📥 Installation Steps  

1. **Clone the repository**  
   ```sh
   git clone <repo-url>
   cd Turf-Booking-App
   ```

2. **Install dependencies**  
   - Backend:  
     ```sh
     cd backend
     npm install
     ```  
   - Frontend:  
     ```sh
     cd ../frontend
     npm install
     ```  
   - Admin:  
     ```sh
     cd ../admin
     npm install
     ```  

3. **Configure environment variables**  
   - Create a `.env` file inside `backend/` (see [Environment Variables](#environment-variables)).  

4. **Start the backend server**  
   ```sh
   cd backend
   npm start
   ```

5. **Run the frontend & admin apps (in separate terminals)**  
   ```sh
   cd frontend
   npm run dev
   ```  
   ```sh
   cd admin
   npm run dev
   ```  

---

## 🔐 Environment Variables  

Create a `.env` file inside the **backend/** directory with:  

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 📜 Scripts  

### Backend  
- `npm start` → Start Express server  

### Frontend / Admin  
- `npm run dev` → Start Vite development server  

---

## 📁 Folder Overview  

- `admin/` → React app for admin dashboard (manage turfs, bookings, users)  
- `frontend/` → React app for customers (browse turfs, book slots, view bookings)  
- `backend/` → Express API with MongoDB models, controllers, routes  

### Backend Structure  
```
backend/
│── config/        # Database connection
│── controllers/   # Business logic (auth, bookings, turfs)
│── middleware/    # Custom middleware (e.g., authentication)
│── models/        # Mongoose models (User, Turf, Booking)
│── routes/        # API routes
│── server.js      # Entry point
```

---

## 🔗 API Overview  

### Auth  
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → User login  

### Turfs  
- `GET /api/turfs` → List all turfs  
- `POST /api/turfs` → Add new turf (admin)  
- `PUT /api/turfs/:id` → Edit turf (admin)  
- `DELETE /api/turfs/:id` → Delete turf (admin)  

### Bookings  
- `POST /api/bookings` → Create a booking  
- `GET /api/bookings/user/:userId` → Get user bookings  
- `GET /api/bookings` → Get all bookings (admin)  

---


## 📜 License  

This project is licensed under the **MIT License**.  
