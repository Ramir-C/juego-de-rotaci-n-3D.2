const db = require('./db'); // importa la conexión desde db.js

async function testDB() {
  try {
    console.log("🔄 Probando conexión con la base de datos...");

    // Insertar un registro de prueba
    const [result] = await db.query(
      `INSERT INTO players (nombre, intento, tiempo, errores, gano) VALUES (?, ?, ?, ?, ?)`,
      ["Ramiro", 2, 15, 1, true]
    );

    console.log("✅ Jugador insertado con ID:", result.insertId);

    // Consultar todos los registros
    const [rows] = await db.query(`SELECT * FROM players`);
    console.log("📋 Jugadores en la tabla:");
    console.table(rows);

    process.exit(0); // salir después de la prueba
  } catch (err) {
    console.error("❌ Error en la prueba:", err.message);
    process.exit(1);
  }
}

testDB();
