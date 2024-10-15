![Liq.Detail Logo](https://www.dropbox.com/home?preview=liq-detail.jpg)

## **Table of Contents**
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Setup and Installation](#setup-and-installation)

## **Introduction**
Liq.Detail is a full-stack web application designed to simplify car detailing bookings. It allows customers to book services, manage vehicles, and track bookings, while administrators can manage the services offered by the company.

## Backend Repository
You can find the backend code for this project [here](https://github.com/xsm3z/liq-detail-backend).

## **Features**
- **User Authentication:** Sign up, sign in, and manage accounts using JWT authentication.
- **Dashboard:** View and manage vehicles and bookings.
- **Booking System:** Book services, modify bookings, and view service details.
- **Admin Functions:** Admins will be able manage Bookings, services and vehicles. (Still needs implementation)

## **Technologies Used**
### **Frontend**
- React.js
- CSS
- Day.js

### **Backend**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing

### **Other Tools**
- Postman for API testing
- Vite for build tool

## Future Enhancements

As development continues for Liq.Detail, here are some of the planned future features:

### 1. Payment Integration
Integration of payment to allow users to make payments for services directly through the app. 

### 2. Admin Functions
- **Admin Dashboard:** An administrative panel for managing services, users, and bookings.
- **Service Management:** Admins will be able to add, edit, and delete services.
- **User Management:** Admins will have the ability to manage user roles and permissions.

### 3. Booking Status
- **Service Progress Tracking:** Users will be able to view the status of their bookings (e.g., "Pending", "In Progress", "Completed").
- **Notifications:** Users will receive notifications as the status of their booking is updated.

## **Setup and Installation**

### Prerequisites
Make sure you have these installed:
- Node.js and npm
- MongoDB running locally or in the cloud (e.g., MongoDB Atlas)

### Installation Steps
1. **Clone the repository:**
    git clone https://github.com/your-username/liq-detail.git
    cd liq-detail

2. **Install dependencies for the frontend and backend:**
    # In the root directory for the frontend
    npm install

    # For the backend directory
    cd backend
    npm install

3. **Configure Environment Variables:**
   Create a .env file in the backend folder with the following:

4. **Run the app:**
    # Start the backend server
    nodemon server.js

    # Start the frontend
    npm run dev
