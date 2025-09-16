const playerModel = require('../models/playerModel');

async function initDB() {
  try {
    await playerModel.createTable();
    console.log('Tabla players lista.');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

async function savePlayer(req, res) {
  try {
    const id = await playerModel.savePlayer(req.body);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlayers(req, res) {
  try {
    const players = await playerModel.getPlayers();
    res.json({ users: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlayersByName(req, res) {
  try {
    const nombre = req.query.nombre || '';
    const players = await playerModel.getPlayersByName(nombre);
    res.json({ users: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { initDB, savePlayer, getPlayers, getPlayersByName };
