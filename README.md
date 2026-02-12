# 🚜 CAT-Maintain  
### Equipment Maintenance & Work Order Management System

CAT-Maintain is a full-stack industrial equipment maintenance management system built using the MERN stack. It simulates a real-world enterprise CMMS (Computerized Maintenance Management System) used in manufacturing and heavy machinery industries.

The system manages equipment lifecycle, work order workflows, preventive maintenance scheduling, and operational analytics using role-based access control.

---

# 📌 Project Overview

CAT-Maintain allows organizations to:

- Manage equipment assets
- Track breakdown and preventive work orders
- Assign technicians
- Monitor maintenance schedules
- View operational KPIs
- Enforce role-based system access

The application follows real-world industrial maintenance workflows.

---

# 🏗️ Tech Stack

## Frontend
- React
- React Router DOM
- Axios
- Context API (Authentication state)
- Pure CSS (Responsive industrial dashboard UI)

## Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcrypt (Password hashing)

---

# 🔐 Role-Based Access Control (RBAC)

The system supports three user roles:

## 👑 Admin
- Create / Update / Delete Equipment
- Create & Assign Work Orders
- View full dashboard analytics
- Access preventive maintenance
- Manage users

## 👨‍💼 Manager
- View dashboard
- Create & assign work orders
- View maintenance schedule
- Monitor plant health

## 👷 Technician
- View assigned work orders
- Update work order status
- Add comments
- View preventive maintenance schedule

All API routes are protected using JWT authentication and role-based middleware.

---

# 🧱 Modules Implemented

---

## 1️⃣ Authentication Module

### Features
- User Registration
- User Login
- JWT token authentication
- Protected Routes
- Role-based UI rendering

### Backend Routes
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Passwords are securely hashed using bcrypt before storage.

---

## 2️⃣ Equipment Module

Each equipment contains:

- Name
- Serial Number (unique)
- Model
- Location
- Status (active / maintenance / breakdown)
- Running Hours
- Last Service Date

### Features
- Add equipment (Admin)
- Update equipment (Admin)
- Delete equipment (Admin)
- View all equipment (All roles)
- Equipment details page
- Status badges
- Dashboard equipment health metrics

### Backend Routes
```
POST   /api/equipments
GET    /api/equipments
GET    /api/equipments/:id
PUT    /api/equipments/:id
DELETE /api/equipments/:id
```

---

## 3️⃣ Work Order Module (Core Workflow)

Each work order includes:

- Equipment reference
- Issue Type (Breakdown / Preventive)
- Priority (Low / Medium / High / Critical)
- Assigned Technician
- Status (Open → In Progress → Completed)
- Description
- Comment timeline
- isPreventive flag

### Features
- Create work order
- Assign technician
- Update work order status
- Add comments
- Technician sees only assigned tasks
- Role-based route protection

### Backend Routes
```
POST   /api/workorders
GET    /api/workorders
GET    /api/workorders/:id
PUT    /api/workorders/:id/status
POST   /api/workorders/:id/comment
```

---

## 4️⃣ Preventive Maintenance Module

The system calculates maintenance schedules based on:

```
lastServiceDate + 30 days interval
```

### Features
- Due Soon maintenance list
- Overdue maintenance list
- Status highlighting
- Equipment linking
- Dashboard overdue tracking

### Backend Routes
```
GET /api/maintenance/due-soon
GET /api/maintenance/overdue
```

---

## 5️⃣ Dashboard Analytics

The dashboard separates two important views:

### 🔹 Asset Health
- Total Equipment
- Active
- Maintenance
- Breakdown

### 🔹 Operations Overview
- Open Work Orders
- In Progress
- Completed This Month
- Overdue Maintenance

### Backend Route
```
GET /api/dashboard/summary
```

The dashboard combines:
- Frontend-calculated equipment stats
- Backend-aggregated operational metrics

---

# 🖥️ UI Architecture

Layout Structure:
- Sidebar (Role-based navigation)
- Topbar (User info & context)
- Responsive KPI cards
- Grid panels
- Status indicators
- Dark industrial theme

Design Principles:
- Clear visual hierarchy
- Color-coded statuses
- Modular components
- Responsive layout

---

# 📁 Project Structure

## Backend
```
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    server.js
```

## Frontend
```
frontend/
  src/
    api/
    components/
    context/
    pages/
    styles/
    App.jsx
```

---

# 🧠 Key Concepts Applied

- MVC architecture
- RESTful API design
- JWT authentication
- Role-based authorization
- Data aggregation for dashboards
- Preventive maintenance business logic
- React state management
- Modular component design
- Separation of asset vs operational metrics

---

# 🚀 Future Improvements

- Cron-based automatic maintenance scheduler
- Charts using Recharts
- Notification badges
- Email alerts
- File attachments in work orders
- Deployment (Render + Vercel)
- Audit logs
- Performance optimization

---

# 🧪 How to Run Locally

## Backend
```
cd backend
npm install
npm run dev
```

## Frontend
```
cd frontend
npm install
npm run dev
```

---

# 🎯 Resume Summary (Short Version)

Built a full-stack Equipment Maintenance & Work Order Management system using the MERN stack with JWT authentication, role-based access control, preventive maintenance scheduling, and operational KPI dashboards.

---

# 📌 Project Status

Core Modules Completed:
✔ Authentication  
✔ Equipment Management  
✔ Work Order Workflow  
✔ Preventive Maintenance Tracking  
✔ Dashboard Analytics  


