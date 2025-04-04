# Online Auction Platform

## Objective
This application serves the requirement of an online auction platform, designed to revamp the current offline number plate auction system and make it convenient for end users.

## Table of Contents
- Objective
- Technology Stack
- Features
- Project Setup
  - Backend (Server)
  - Online-auction-frontend (Frontend)
- Usage
- Authentication Flow
- API Documentation
- Contributing
- License
- Contact Information

## Technology Stack
This is a MERN Stack Application which follows a 3-tier architecture:
- **User**: React + Vite Application (Lightweight UI)
- **Server**: Node.js + Express (Services and APIs)
- **Database**: MongoDB

## Features
- User registration and authentication
- Real-time bidding system
- User profile management
- Admin dashboard for managing auctions

## Project Setup

### Backend (Server)
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```
   
2. **Install dependencies**:
    ```
    npm install
    ```
3. **Start the server**:
    ```
    npm start
    ```

### Online-auction-frontend (Frontend)

1. **Clone the repository**:
    ```
    git clone <repository-url>
    cd online-auction-frontend
    ```
2. **Install dependencies**:
    ```
    npm install
    ```
3. **Start the server**:
    ```
    npm run dev
    ```

## Usage

After setting up the project, you can start the backend and frontend servers. Edit the .env files for your desired endpoints and access the application at the ports defined in the .env files for the frontend and backend.

## Authentication Flow

### Register Screen
![image](https://github.com/user-attachments/assets/b56b50f3-ac20-40cf-b236-70d851fb9671)


### Login Screen
![image](https://github.com/user-attachments/assets/0813c60e-b5de-486a-9ea5-ef820155f80f)

### Reset Password
![image](https://github.com/user-attachments/assets/c07ccf8c-1803-4ffa-87d3-5327c2e1eeae)

### View Profile
![image](https://github.com/user-attachments/assets/04daa4b9-6f42-4e76-8fd8-973d378a3973)


## API Documentation

1. **Register User**

- Endpoint: POST /api/auth/register
- Description: Registration of a user
- Request Body:
```
{
  "name": "",
  "email": "",
  "countryCode": "",
  "mobile": "",
  "address": "",
  "password": ""
}
```

2. Login User

- Endpoint: POST /api/auth/login
- Description: User login
- Request Body:
```
{
  "email": "",
  "password": ""
}
```

3. Complete Registration

- Endpoint: POST /api/auth/register-complete
- Request Body:
```
{
  "email": "utkrishtsolanki97gmail.com",
  "otp": "789456"
}
```

4. Request Password Reset

- Endpoint: POST /api/auth/request-password-reset
- Request Body:
```
{
  "email": "utkrishtsolanki97@gmail.com"
}
```

5. Reset Password

- Endpoint: POST /api/auth/reset-password
- Request Body:
```
{
  "email": "utkrishtsolanki97@gmail.com",
  "otp": "557559",
  "newPassword": "Microsoft1#"
}
```

6. Get User Profile

- Endpoint: GET /api/auth/profile
- Request Body:
```
{
  "email": "utkrishtsolanki97@gmail.com"
}
```

## Contributing
1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Open a pull request

## License
This project is licensed under the MIT License.


## Contact Information
For any questions or feedback, please contact utkrishtsolanki97@gmail.com.

