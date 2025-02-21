# Quirky Flatmate

Quirky Flatmate is a web application designed to help manage flatmate complaints, track karma points, and enforce fun punishments for those with the most complaints. The system ensures a fair and interactive way to maintain harmony in shared living spaces.

## Features

- 🏠 **Complaint System**: Flatmates can file complaints against others.
- 📊 **Leaderboard**: Ranks flatmates based on complaints and karma points.
- 🎲 **Punishment Generator**: Random fun punishments for flatmates with low karma.
- 🔑 **Authentication**: Secure login for users.
- 📡 **Real-time Updates**: Complaints and votes update dynamically.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Real-time Communication**: WebSockets
- **Authentication**: JWT (JSON Web Tokens)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/vijaysingh60/Quirky]
cd quirky-flatmate
```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the backend directory and add:
```
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 4. Start the Application
#### Backend
```bash
cd backend
node index.js
```
#### Frontend
```bash
cd ../frontend
npm start
```

## API Endpoints

### **User Routes**
- `POST /register` → Register a new user
- `POST /login` → Authenticate user
- `GET /leaderboard` → Fetch leaderboard data

### **Complaint Routes**
- `POST /complaints` → File a new complaint
- `PATCH /vote/:id` → Upvote a complaint
- `PATCH /resolve/:id` → Resolve a complaint

## Future Improvements 🚀
- Add a **chat system** for flatmate discussions.
- Implement **AI-powered dispute resolution**.
- Mobile-friendly UI improvements.

## Contributing
Feel free to fork this repository and submit a pull request! We welcome contributions to improve the project. 😃




