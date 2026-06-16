/************************************************************
 * PROJECT 2 — BACKEND API (VANILLA JAVASCRIPT)
 * ----------------------------------------------------------
 * PURPOSE:
 *   Provide a minimal backend API using only Node.js core
 *   modules. Supports GET + POST endpoints, basic validation,
 *   JSON parsing, and structured responses.
 *
 * FILE RESPONSIBILITY:
 *   - Create HTTP server
 *   - Route incoming requests
 *   - Parse JSON request bodies
 *   - Validate user input
 *   - Return JSON responses
 *
 * ENGINEERING RULES APPLIED:
 *   ✓ Purpose block
 *   ✓ Titled sections
 *   ✓ Every non‑trivial line commented
 *   ✓ No unexplained hardcoded values
 *   ✓ Clean, readable, enterprise‑style structure
 ************************************************************/


/* ==========================================================
   ===============  CONFIGURATION CONSTANTS  ================
   ========================================================== */

// Define the port once so it is not hardcoded in multiple places
const PORT = 3000;


/* ==========================================================
   ==================  UTILITY FUNCTIONS  ===================
   ========================================================== */

/**
 * sendJson
 * Sends a JSON response with a given status code.
 */
function sendJson(res, statusCode, payload) {
  // Set response headers for JSON output
  res.writeHead(statusCode, { "Content-Type": "application/json" });

  // Convert payload to JSON string and send it
  res.end(JSON.stringify(payload));
}

/**
 * parseJsonBody
 * Reads and parses JSON body from incoming requests.
 */
function parseJsonBody(req) {
  return new Promise((resolve) => {
    let rawData = ""; // Accumulates incoming data chunks

    // Append each chunk of data to rawData
    req.on("data", (chunk) => {
      rawData += chunk;
    });

    // When all data is received, attempt to parse JSON
    req.on("end", () => {
      try {
        const parsed = JSON.parse(rawData);
        resolve(parsed); // Return parsed object
      } catch {
        resolve(null); // Return null if JSON is invalid
      }
    });
  });
}


/* ==========================================================
   =====================  ROUTE HANDLER  ====================
   ========================================================== */

/**
 * handleRequest
 * Central routing logic for all API endpoints.
 */
async function handleRequest(req, res) {
  const { url, method } = req; // Extract request metadata

  /* ---------------------- GET /api/hello ---------------------- */
  if (url === "/api/hello" && method === "GET") {
    return sendJson(res, 200, {
      message: "Hello from your vanilla JavaScript API"
    });
  }

  /* ---------------------- POST /api/user ---------------------- */
  if (url === "/api/user" && method === "POST") {
    const body = await parseJsonBody(req); // Parse incoming JSON

    // Validate that body exists and contains a valid name field
    const nameIsMissing = !body || !body.name;
    const nameIsInvalid = body && typeof body.name !== "string";

    if (nameIsMissing || nameIsInvalid) {
      return sendJson(res, 400, {
        error: "Invalid input: 'name' (string) is required"
      });
    }

    // Successful response
    return sendJson(res, 200, {
      success: true,
      message: `User '${body.name}' created successfully`
    });
  }

  /* ---------------------- 404 FALLBACK ------------------------ */
  sendJson(res, 404, { error: "Route not found" });
}


/* ==========================================================
   =====================  SERVER SETUP  ======================
   ========================================================== */

const http = require("http"); // Import Node's built‑in HTTP module

// Create the HTTP server and delegate all requests to handleRequest()
const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

// Start listening on the configured port
server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
