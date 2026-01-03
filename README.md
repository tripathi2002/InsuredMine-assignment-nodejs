# InsuredMine – Technical Assessment

This project is a Node.js + MongoDB backend service built as part of the **InsuredMine technical assessment**.

It provides APIs to upload insurance data from XLSX/CSV files, store it in MongoDB using normalized collections, and expose search, aggregation, scheduling, and system monitoring features.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Worker Threads
- Multer
- xlsx
- node-cron
- PM2

---

## 📁 Project Structure

src/
├── app.js
├── server.js
├── config/
│ └── db.js
├── models/
│ ├── Agent.js
│ ├── User.js
│ ├── Account.js
│ ├── LOB.js
│ ├── Carrier.js
│ ├── Policy.js
│ └── ScheduledMessage.js
├── routes/
│ ├── upload.routes.js
│ ├── policy.routes.js
│ └── schedule.routes.js
├── controllers/
├── workers/
│ └── upload.worker.js
├── services/
│ └── cpuMonitor.service.js
├── ecosystem.config.js
├── package.json
└── .env


---

## ⚙️ Environment Setup

### Prerequisites
- Node.js (>= 18)
- MongoDB (local)

### `.env`

PORT=3000
DB_CONNECTION_STRING=mongodb://localhost:27017/insuredmine
NODE_ENV=development


---

## ▶️ Run the Application

```bash
npm install
node src/server.js


## Run with PM2 (optional)
pm2 start ecosystem.config.js

🧩 Data Model

The following collections are used as required:

Agent

User

Account

Policy Category (LOB)

Carrier

Policy

ScheduledMessage

Relationships are maintained using MongoDB ObjectId references.

📤 Task 1 – APIs
1. Upload XLSX / CSV Data

Endpoint

POST /api/upload

Description

Accepts XLSX/CSV files

Uses Worker Threads for file parsing and DB insertion

Prevents blocking the main event loop

Inserts data into multiple MongoDB collections

Form Data

file: <xlsx or csv file>

2. Search Policy by Username

Endpoint

GET /api/policies/search?username=<firstName | email>


Description

Searches policy information using user's first name or email

Uses MongoDB aggregation pipeline

Returns user, account, policy, carrier, and category details

3. Aggregate Policies by Each User

Endpoint

GET /api/policies/aggregate


Description

Aggregates policies per user

Returns:

Total number of policies

Total premium amount

Policy list per user

🧠 Task 2 – System Services
1. CPU / Memory Monitoring

System usage is monitored every 5 seconds

If usage exceeds 70%, the process exits

PM2 automatically restarts the application

Memory-based usage is used as a practical approximation for system load.

2. Scheduled Message API

Endpoint

POST /api/schedule


Request Body

{
  "message": "Policy reminder",
  "day": "2026-01-05",
  "time": "18:30"
}


Description

Schedules a message to be inserted into MongoDB at the given date and time

Implemented using node-cron

⚠️ Assumptions

Email is treated as a unique identifier for users

Each row in the uploaded file represents one policy for one user

Category (LOB) and Carrier data are de-duplicated

Scheduled jobs are in-memory

If the server restarts before execution, the job will not persist

For production, a persistent job queue (Bull / Agenda) is recommended

✅ Key Highlights

Worker Threads for heavy file processing

MongoDB aggregation pipelines for efficient queries

Normalized schema design

Clean API separation

Production-aware setup with PM2

📌 Health Check
GET /health


Response:

{ "status": "OK" }

👤 Author

Vibhu Tripathi