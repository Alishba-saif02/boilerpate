# boilerpate
Boilerplate concept implemented in Node project 
Created auths using token and otp

# 🛒 NestJS Shopping Cart & Order Management API

This is a modular boilerplate built with **NestJS**, **Prisma**, and **JWT Authentication**. It supports:

- ✅ User authentication
- ✅ Login with email & password
- ✅ OTP verification after registration
- ✅ Resend OTP
- ✅ JWT-based access token generation
- ✅ Protected routes using `JwtAuthGuard`

---

## 📁 Folder Structure
src/
├── auth/ # Authentication module
├── cart/ # Cart module (add, update, remove items)
├── orders/ # Order placement and management
├── prisma/ # Prisma client and schema
├── users/ # User management
└── main.ts # Application bootstrap


## ⚙️ Technologies

- **NestJS** – Framework
- **Prisma ORM** – Database access
- **PostgreSQL** – Database (configurable)
- **JWT Auth** – Authentication and role-based access
- **Class Validator** – Request validation

**🔐 API Endpoints**
📝 Auth
**Endpoint	      Method	  Description**
/auth/register	  POST	  Register new user (sends OTP)
/auth/login	POST	Login and get JWT token
/auth/verify-otp	POST	  Verify OTP after registration
/auth/resend-otp	POST	  Resend OTP to email

✅ verify-otp and resend-otp are protected using JWT.
