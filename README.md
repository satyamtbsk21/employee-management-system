# Employee Management System

## Overview
A fullstack employee management app:
- Backend: Express + Mongoose (MongoDB)
- Frontend: React (create-react-app)

## Requirements
- Node 18+ (tested with Node 25 on macOS)
- MongoDB running locally, or MongoDB Atlas URI

## Setup
### 1) Clone and install
```bash
cd /Users/satyam/Documents/employee-management-system
npm install # optional, not needed at root
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure MongoDB connection
copy `backend/.env.example` to `backend/.env` and set:
- `MONGO_URI` (local or atlas)
- optional `PORT` (default 3001)

### 3) Start backend
```bash
cd backend
npm run dev
```

### 4) Start frontend
```bash
cd frontend
npm start
```

## API Endpoints
- `POST /api/employees` (create)
- `POST /api/employees/login`
- `GET /api/employees` (list)
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
- `POST /api/employees/:id/punch`
- `GET /api/employees/:id/punch-records`
- `GET /api/debug/all`

## GitHub Deployment
1. `git init` (root)
2. `git add .`
3. `git commit -m "initial working employee management app"
4. `gh repo create <username>/employee-management-system --public --source=. --remote=origin --push`

## Notes
- Backend uses environment `MONGO_URI`; defaults to local if absent.
- CORS enabled for frontend access.
- Remove `mongodb-memory-server` if not needed for production (already not used currently).

