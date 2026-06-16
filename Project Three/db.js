/************************************************************
 * DATABASE MODULE — SQLite Digital Vault
 * ----------------------------------------------------------
 * RESPONSIBILITY:
 *   - Initialize SQLite database
 *   - Create schema if not exists
 *   - Provide CRUD functions for vault items
 ************************************************************/

const Database = require("better-sqlite3");

// Open or create database file
const db = new Database("vault.db");

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS vault_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

/* ===================== CRUD OPERATIONS ===================== */

function createItem(title, content) {
  const timestamp = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO vault_items (title, content, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(title, content, timestamp, timestamp);
  return result.lastInsertRowid;
}

function getAllItems() {
  return db.prepare(`SELECT * FROM vault_items`).all();
}

function getItemById(id) {
  return db.prepare(`SELECT * FROM vault_items WHERE id = ?`).get(id);
}

function updateItem(id, title, content) {
  const timestamp = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE vault_items
    SET title = ?, content = ?, updated_at = ?
    WHERE id = ?
  `);
  return stmt.run(title, content, timestamp, id);
}

function deleteItem(id) {
  return db.prepare(`DELETE FROM vault_items WHERE id = ?`).run(id);
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
