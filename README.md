# Student Management API

A simple REST API built using Node.js, Express.js, and MongoDB to perform CRUD operations on student records.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

```bash
git clone YOUR_REPOSITORY_URL
cd student-management-api
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Run the Project

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students` | Create a student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Testing

Use Postman to test the API endpoints.

## Author

Anuj Patel
