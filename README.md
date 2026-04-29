# Lead Management System (Mini CRM)

## Overview

This is a **full-stack Lead Management System** built for managing customer inquiries in a car showroom.
It allows sales teams to track leads, update their status, and monitor conversions efficiently.

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL

---

## Features

### Core Features

  * Add new leads (Name, Phone, Car Model, Source, Email, Budget)
  * View all leads
  * Update lead status (New, Interested, Test Drive, Booked, Purchased, Lost)
  * Delete leads

### Advanced Features

  * Search leads (by name, phone, or car model)
  * Dashboard statistics:
    * Total leads
    * Conversion rate
    * Leads by source
  * Card-based UI with responsive layout
  * Real-time updates after actions

---

## Project Structure

```
lead-management-system/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│
└── README.md
```

---

## How to Run the Project Locally

### Backend Setup

```
cd backend
npm install
npm start
```

---

### Frontend Setup

```
cd frontend
npm install
npm start
```

---

## Database Setup (PostgreSQL)

1. Create database:

```
CREATE DATABASE leadsdb;
```

2. Create table:

```
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  car_model VARCHAR(50),
  source VARCHAR(20),
  status VARCHAR(30) DEFAULT 'New',
  email VARCHAR(100),
  budget INTEGER,
  notes TEXT
);
```

---

## API Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/leads`     | Add new lead       |
| GET    | `/api/leads`     | Get all leads      |
| PUT    | `/api/leads/:id` | Update lead status |
| DELETE | `/api/leads/:id` | Delete lead        |

---

## Important Note

This project uses a **local PostgreSQL database**.
To run it, you need PostgreSQL installed and configured with the above schema.

---

## Demo



---

## Key Learnings

* Built a complete full-stack application using React, Node.js, and PostgreSQL
* Implemented RESTful APIs for CRUD operations
* Integrated frontend with backend
* Designed modular and reusable components
* Added advanced features like search, filtering, and dashboard analytics

---

## Future Improvements

* User authentication (login system)
* Deployment (Vercel + Render)
* Notifications / follow-ups
* Advanced analytics dashboard

---

## Author

Vaishnavi Tallada