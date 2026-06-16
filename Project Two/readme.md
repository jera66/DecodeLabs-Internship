# Project 2 — Backend API (Vanilla JavaScript)

A simple backend API built using pure Node.js, without any external frameworks. This project demonstrates core backend fundamentals: routing, JSON handling, validation, and server‑side logic.

---

## Purpose

This API was created to satisfy the requirements of **Project 2: Backend API Development**, focusing on:

- Understanding backend logic without frameworks  
- Handling HTTP requests manually  
- Parsing and validating user input  
- Returning structured JSON responses  

---

## Features

- GET and POST endpoints  
- JSON request parsing  
- Basic input validation  
- Clean, readable, rule‑compliant code  
- No external dependencies  
- Fully functional HTTP server  

---

## Project Structure

project2-api/
server.js
README.md

---

## How to Run the Server

### 1. Install Node.js  

Download from: [https://nodejs.org](https://nodejs.org)

### 2. Navigate to the project folder

cd project2-api

### 3. Start the server

node server.js

### 4. Expected output

API running at [http://localhost:3000](http://localhost:3000)

---

## How to Test the API

You can test using:

- Browser (GET only)  
- Postman  
- curl  
- VS Code REST Client  

---

## API Endpoints

## GET /api/hello

**Description:** Returns a simple JSON message confirming the API is running.

**Example Request:**
GET <http://localhost:3000/api/hello>


**Example Response:**

```json
{
  "message": "Hello from your vanilla JavaScript API"
}
```

## POST /api/user

Description: Accepts a JSON body containing a user name. Validates the input and returns a success message.

Required Body:

```json
{
  "name": "YourName"
}
```

## Example Request[:]

Request URL: `http://localhost:3000/api/user`
Content-Type: application/json

## Body[:]

```json
{
  "name": "Jerathel"
}
```

## Example Response [:]

```json
{
  "success": true,
  "message": "User 'Jerathel' created successfully"
}
```

## Validation Error Example[:]

## if you send[:]

```json
{}
```

## Response[:]

```json
{
  "error": "Invalid input: 'name' (string) is required"
}
```

