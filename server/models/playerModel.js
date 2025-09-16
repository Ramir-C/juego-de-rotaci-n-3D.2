const pool = require('../config/db');

// Crear tabla si no existe
async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS players (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      intento INT,
      tiempo INT,
      errores INT
    )
  `);
}

async function savePlayer({ nombre, intento, tiempo, errores }) {
  const [result] = await pool.query(
    `INSERT INTO players (nombre, intento, tiempo, errores) VALUES (?, ?, ?, ?)`,
    [nombre, intento, tiempo, errores]
  );
  return result.insertId;
}

async function getPlayers() {
  const [rows] = await pool.query(`SELECT * FROM players`);
  return rows;
}

async function getPlayersByName(nombre) {
  const [rows] = await pool.query(
    `SELECT * FROM players WHERE nombre LIKE ?`,
    [`%${nombre}%`]
  );
  return rows;
}

module.exports = { createTable, savePlayer, getPlayers, getPlayersByName };

