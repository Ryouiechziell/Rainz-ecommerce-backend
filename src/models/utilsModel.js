const db = require("./db.js")

async function begin() {
  return await db.execute('BEGIN');
}

async function rollback() {
  return await db.execute("ROLLBACK")
}

async function commit() {
  return await db.execute("COMMIT")
}

module.exports = { begin, rollback, commit }
