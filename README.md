# 💰 ExpenseFlow - Intelligent Financial Analysis Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

ExpenseFlow is a premium, intelligent, and user-friendly financial analytics platform that empowers users to make smarter spending decisions through comprehensive expense tracking, budget planning, and beautiful, responsive UI/UX.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 **Authentication & Security**
- **Premium Onboarding** with secure login and dynamic validation
- **Password encryption** using bcrypt hashing
- **Protected routes** enforcing JWT-based validation
- **Automatic token validation** and session handling via `localStorage` state APIs

### 💸 **Expense Management**
- **Add Expenses** with high-end graphical inputs, categorizations, and merchant details
- **Recurring Expenses Automation** integrated cleanly within sidebars
- **Category-wise** expense allocations with custom `react-icons` configurations
- **Date-wise** expense tracking allowing for deep history views

### 📊 **Budget Planning Dashboard**
- **Monthly Budget Planning** designed tightly into a SaaS-style user experience
- **Budget vs Actual** dynamic gradient and progress bars tracking
- **Auto-distribute** interactive layout allocation algorithms
- **Cross-module syncing**: Modifying monthly allocations directly impacts user constraints 

### 👤 **User Profile & Support**
- **Personal profile settings** with glassmorphism UI structures
- **Real-time data sync** across backend databases
- **Integrated Support Hub / Chat Mockup** matching native dashboard aesthetics
- **Image upload capabilities** tightly bound to avatars

### 📱 **Premium User Experience (UI/UX)**
- **Modern Premium Interface** heavily relying on `Tailwind CSS` for glass effects, dropping soft shadows, gradients, and custom ring boundaries
- **Animated Toast & Checkboxes**: Built directly using React architectures overriding native OS inputs
- **Responsive design** optimized elegantly across wide-monitor grids down to mobile flexboxes

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Utilizing modern Server/Client boundary concepts
- **TypeScript** - Strict interface mapping for all schemas
- **Tailwind CSS** - Advanced atomic classes for high-end styling
- **react-icons (`fi`)** - Complete library replacement for vector iconography

### **Backend**
- **Node.js + Express.js** - Robust application framework
- **MongoDB Atlas + Mongoose** - Cloud NoSQL database
- **JWT & bcrypt** - Industry-standard authorization protocols

## 📁 Project Structure

```
ExpenseFlow/
│
├── 📁 backend/                    # Node.js/Express backend
│   ├── 📁 config/                # MongoDB configuration
│   ├── 📁 middleware/            # JWT authentication layers
│   ├── 📁 models/                # Database Schemas (User, Budget Plans)
│   ├── 📁 routes/
│   │   ├── authRoutes.js         # Authentication (login/signup)
│   │   ├── addExpense.js         # Standard operations under /api/
│   │   ├── recurringExpense.js   
│   │   ├── updateRecurring.js    
│   │   ├── profile.js            # User retrieval logic
│   │   └── planMonth.js          # Monthly budget planning logic
│   └── server.js                 # Express server entry point
│
├── 📁 src/                       # Next.js frontend application
│   ├── 📁 app/                   # App Router directory
│   │   ├── 📁 dashboard/         # Protected dashboard modules
│   │   │   ├── 📁 addexpense/
│   │   │   ├── 📁 chats/         # Support hub mockup UI
│   │   │   ├── 📁 planmonth/
│   │   │   ├── 📁 profile/
│   │   │   └── page.tsx          # Central analytical dashboard
│   │   ├── 📁 login/
│   │   ├── 📁 signup/
│   │   ├── layout.tsx            # Root configuration
│   │   └── page.tsx              # Modern SaaS Landing Page
│   └── 📁 components/            # Reusable UI architectures
│       └── Header.tsx            # JWT-aware Global Header Nav
│
└── 📋 Configurations (Package.json, Tailwind, NextConfig)
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v18+)
- **MongoDB Atlas** Account

### 1. Clone & Install
```bash
git clone https://github.com/baymax1705/ExpenseFlow.git
cd ExpenseFlow

# Install frontend
npm install

# Install backend
cd backend
npm install
cd ..
```

### 2. Environment Setup
Create `.env` in the root (ensure exact paths based on your deployment):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expenseflow
JWT_SECRET=your-secure-jwt-secret-key
PORT=5000
NODE_ENV=development
```

### 3. Start Engines
It's recommended to run two terminal sessions:
```bash
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend
npm run dev
```

## 📚 API Documentation

> **Note**: API structure has been modernized. Only core Identity features remain in `/auth/`. Operating features sit directly on `/api/`.

### Authentication
- `POST /api/auth/signup` - Register a standard user
- `POST /api/auth/login` - Authenticate and fetch JWT

### Core Operational APIs (Requires Bearer JWT)
- `GET /api/profile` - Fetch User Information
- `POST /api/addexpense` - Append expense mapping
- `GET /api/recurringexpenses` - Retrieve recurring ledger entries
- `PUT /api/update-recurring/:id` - Mutate existing recurring plans
- `POST /api/plan-month` - Update allocation distributions
- `GET /api/plan-months` - Retrieve historical planning ledgers

*All payload schemas exactly map to Mongoose schemas detailed in specific route endpoints.*

## 🗃️ Database Schema

### User Schema (with embedded Expenses)
```javascript
{
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  profileImage: String,
  phone: String,
  address: String,
  expenses: [{
    date: String,
    amount: Number,
    merchant: String,
    category: String,
    notes: String,
    recurring: Boolean
  }]
}
```

### PlanMonth Schema
```javascript
{
  userId: ObjectId (ref: 'User'),
  month: String, // "YYYY-MM"
  totalBudget: Number,
  categoryBudgets: { Food, Travel, Bills, Shopping, Entertainment, Others },
  planned: [{ name: String, category: String, amount: Number }]
}
```

## 📄 License
This project is licensed under the MIT License.

<<<<<<< HEAD
## 👥 Authors
- **baymax1705** - *Sole owner & maintainer* - [GitHub Profile](https://github.com/baymax1705)

=======
>>>>>>> cbb92af54dc88331d38b67ab5dd6c048a9393eb6
---
**Built with ❤️ for better financial management**
