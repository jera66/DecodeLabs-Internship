# Project 3 — Digital Vault (Database Integration)

A backend system that integrates a database to store, retrieve, update, and delete data with reliability. This project expands the previous API by adding persistent storage, transforming the backend into a functional digital vault.

---

## 📌 Purpose

The goal of this project is to demonstrate:

- How to connect a backend API to a real database
- How to design a simple and reliable schema
- How to perform CRUD operations
- How to ensure proper data handling and validation

This project is intentionally built using **vanilla Node.js** to reinforce core backend fundamentals without relying on frameworks.

---

## 🧱 Features

- SQLite database integration
- Simple and reliable schema design
- Full CRUD operations (Create, Read, Update, Delete)
- Clean, modular, rule‑compliant code
- Pure Node.js (no Express or frameworks)
- Persistent storage via `vault.db`

---

## 🗄️ Database Schema

The digital vault stores “items” — each representing a secure record.

### **Table: `vault_items`**

| Column | Type | Description |
| -------- | ------ | ------------- |
| id | INTEGER | Primary key, auto‑increment |
| title | TEXT | Required |
| content | TEXT | Required |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

This schema is intentionally simple, predictable, and suitable for CRUD operations.

---

## 📁 Project Structure

project3-digital-vault/
server.js
db.js
vault.db        (auto‑created)
README.md

---

## ▶️ How to Run the Project

### 1. Install Node.js

Download from: [Node.js official site](https://nodejs.org)

### 2. Install dependencies

npm install better-sqlite3

### 3. Start the server

node server.js

### 4. Expected output

Digital Vault API running on [http://localhost:3000](http://localhost:3000)

Your backend and database are now live.

---

## 📡 API Endpoints (CRUD)

Below are the endpoints your digital vault exposes.

---

## **CREATE — POST /vault**

Creates a new vault item.

### Request Body

```json
{
  "title": "Passport",
  "content": "Stored securely"
}
```

### Response

```json
{
  "id": 1
}
```

## READ ALL — GET /vault

## Returns all stored items

 Response:

```json
[
  {
    "id": 1,
    "title": "Passport",
    "content": "Stored securely",
    "created_at": "...",
    "updated_at": "..."
  }
]
```

## READ ONE — GET /vault/:id

## Example

GET /vault/1

Response:

```json
{
  "id": 1,
  "title": "Passport",
  "content": "Stored securely",
  "created_at": "...",
  "updated_at": "..."
}
```

## UPDATE — PUT /vault/:id

## Request Body (Update)

```json
{
  "title": "Updated Title",
  "content": "Updated Content"
}
```

Response:

```json
{
  "success": true
}
```

## DELETE — DELETE /vault/:id

Response:

```json
{
  "success": true
}
```

## 🧪 Testing the API

You can test using:

- Postman
- curl
- VS Code REST Client
- Browser (GET only)
