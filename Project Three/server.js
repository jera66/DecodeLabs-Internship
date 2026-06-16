/************************************************************
 * PROJECT 3 — DIGITAL VAULT API
 * ----------------------------------------------------------
 * PURPOSE:
 *   Provide CRUD operations backed by SQLite database.
 ************************************************************/

const http = require("http");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} = require("./db");

/* Utility: send JSON */
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

/* Utility: parse JSON body */
function parseBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
  });
}

async function handleRequest(req, res) {
  const { url, method } = req;

  /* ===================== CREATE ===================== */
  if (url === "/vault" && method === "POST") {
    const body = await parseBody(req);

    if (!body || !body.title || !body.content) {
      return sendJson(res, 400, { error: "title and content required" });
    }

    const id = createItem(body.title, body.content);
    return sendJson(res, 201, { id });
  }

  /* ===================== READ ALL ===================== */
  if (url === "/vault" && method === "GET") {
    return sendJson(res, 200, getAllItems());
  }

  /* ===================== READ ONE ===================== */
  if (url.startsWith("/vault/") && method === "GET") {
    const id = Number(url.split("/")[2]);
    const item = getItemById(id);
    return item
      ? sendJson(res, 200, item)
      : sendJson(res, 404, { error: "Not found" });
  }

  /* ===================== UPDATE ===================== */
  if (url.startsWith("/vault/") && method === "PUT") {
    const id = Number(url.split("/")[2]);
    const body = await parseBody(req);

    if (!body || !body.title || !body.content) {
      return sendJson(res, 400, { error: "title and content required" });
    }

    updateItem(id, body.title, body.content);
    return sendJson(res, 200, { success: true });
  }

  /* ===================== DELETE ===================== */
  if (url.startsWith("/vault/") && method === "DELETE") {
    const id = Number(url.split("/")[2]);
    deleteItem(id);
    return sendJson(res, 200, { success: true });
  }

  sendJson(res, 404, { error: "Route not found" });
}

http.createServer(handleRequest).listen(3000, () => {
  console.log("Digital Vault API running on http://localhost:3000");
});
