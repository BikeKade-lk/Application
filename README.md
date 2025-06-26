# BikeKade.lk 🏍️

**The Ultimate Destination for Dirt Bike Enthusiasts in Sri Lanka**

BikeKade.lk is a comprehensive e-commerce platform designed specifically for dirt bike parts and accessories. Built with modern web technologies, it provides a seamless marketplace for buyers and sellers to connect, browse and trade motorcycle components.

## 🌟 Features

### For Buyers
- **Comprehensive Product Catalog**: Browse extensive collections of dirt bike parts and accessories
- **Advanced Search & Filtering**: Find products by brand, part type, bike model and price range
- **Detailed Product Information**: View comprehensive product details, images and specifications
- **Responsive Design**: Optimized for desktop and mobile devices

### For Sellers
- **User Dashboard**: Manage your product listings from a centralized dashboard
- **Easy Product Management**: Add, edit and delete products with an intuitive interface
- **Image Upload**: Support for product images with automatic optimization
- **User Authentication**: Secure login and registration system

### Platform Features
- **Real-time Product Updates**: Dynamic product listing with live search
- **Secure Authentication**: User registration, login and password reset functionality
- **Product Categorization**: Organized by product type (Spare Parts, Accessories)
- **Brand & Model Filtering**: Filter products by specific motorcycle brands and models

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot (Java)
- **Architecture**: RESTful API with MVC pattern
- **Database**: JPA/Hibernate for data persistence
- **Security**: User authentication and authorization
- **API Documentation**: RESTful endpoints for all operations

### Frontend
- **Framework**: React.js with functional components
- **UI Library**: Material-UI (MUI) for modern, responsive design
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router for navigation
- **HTTP Client**: Axios for API communication
- **Styling**: Material-UI theming with custom styling

## 📁 Project Structure

```
bikekade/
├── application/                    # Backend (Spring Boot)
│   └── src/main/java/lk/bikekade/app/
│       ├── controller/
│       ├── model/
│       ├── service/
│       └── repository/
├── applicationfrontend/            # Frontend (React)
│   └── src/
│       ├── Pages/
│       ├── components/
│       └── assets/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Node.js 14 or higher
- npm or yarn
- MySQL or PostgreSQL database

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/BikeKade-lk/Application.git
   cd bikekade/application
   ```

2. **Configure Database**
   ```properties
   # application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bikekadelk_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   ```

3. **Run the Backend**
   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd applicationfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📋 API Endpoints

### Product Management
- `GET /product/getall` - Get all products
- `GET /product/{id}` - Get product by ID
- `GET /product/user/{userId}` - Get products by user ID
- `GET /product/user/name/{username}` - Get products by username
- `POST /product/add` - Add new product
- `POST /product/user/{username}/add` - Add product for specific user
- `PUT /product/update/{id}` - Update product
- `DELETE /product/delete/{id}` - Delete product

### User Management
- `GET /user/getall` - Get all users
- `GET /user/{id}` - Get user by ID
- `GET /user/name/{username}` - Get user by username
- `POST /user/add` - Register new user
- `POST /user/login` - User login
- `POST /user/reset-password` - Reset user password
- `PUT /user/update/{id}` - Update user
- `DELETE /user/delete/{id}` - Delete user

## 🎨 Key Components

### Frontend Components
- **Header**: Navigation and branding
- **SearchFilterBar**: Product search and filter controls
- **ProductGrid**: Responsive product listing
- **ProductTable**: Dashboard product management
- **ProductFormDialog**: Add/edit product modal
- **FilterDrawer**: Advanced filtering sidebar

### Backend Controllers
- **ProductController**: Handles all product-related operations
- **UserController**: Manages user authentication and profile operations

## 📷 Screenshots

![ScreenShot (1)](https://github.com/user-attachments/assets/06ea2f86-942f-4813-aaca-f06edeac00f5)
![ScreenShot (2)](https://github.com/user-attachments/assets/1c3d1f44-0533-4eee-98bd-275531fe0c88)
![ScreenShot (3)](https://github.com/user-attachments/assets/2354dbec-7c70-4182-b675-af40c36aa8a9)
![ScreenShot (4)](https://github.com/user-attachments/assets/2324bcb2-457d-46a0-acd9-fdb991f18f87)
![ScreenShot (5)](https://github.com/user-attachments/assets/a3f88372-911c-4daf-8d11-f140e2af44e8)
![ScreenShot (6)](https://github.com/user-attachments/assets/90e28b2b-beae-4739-88ca-a479ab151eaf)
