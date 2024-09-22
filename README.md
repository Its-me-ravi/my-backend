MERN CRUD Application
A simple web application built using the MERN stack that allows users to register, log in, and manage posts (create, read, update, delete).

Table of Contents
Backend
Technologies Used
Setup Instructions
API Endpoints
Database Structure


Backend
Backend Technologies Used
Node.js: JavaScript runtime for building the backend server.
Express.js: Web application framework for Node.js to build RESTful APIs.
MongoDB: NoSQL database for storing user and post data.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
JWT (JSON Web Tokens): For secure user authentication.
Backend Setup Instructions
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name/backend
Install Dependencies Ensure you have Node.js installed. Then, run:

bash
Copy code
npm install
Create a .env File Create a .env file in the backend directory and set the following environment variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000  # Optional: Specify the port
Start the Backend Server

bash
Copy code
npm start
API Endpoints
POST /api/register: Register a new user.

Request Body: { "username": "string", "email": "string", "password": "string" }
Response: Success message and user data.
POST /api/login: Authenticate a user and return a JWT.

Request Body: { "email": "string", "password": "string" }
Response: JWT token.
POST /api/posts: Create a new post (authenticated).

Request Body: { "title": "string", "content": "string" }
Headers: Authorization: Bearer <token>
Response: Newly created post data.
GET /api/posts: Retrieve all posts (public).

Response: Array of post objects.
GET /api/posts/:id: Retrieve a single post by ID (public).

Response: Post object.
PUT /api/posts/:id: Update a post by ID (authenticated).

Request Body: { "title": "string", "content": "string" }
Headers: Authorization: Bearer <token>
Response: Updated post data.
DELETE /api/posts/:id: Delete a post by ID (authenticated).

Headers: Authorization: Bearer <token>
Response: Success message.
Database Structure
User Model:

username: String, required, unique.
email: String, required, unique.
password: String, required (hashed).
Post Model:

title: String, required.
content: String, required.
timestamp: Date, default to current date.
user: Reference to User model.
