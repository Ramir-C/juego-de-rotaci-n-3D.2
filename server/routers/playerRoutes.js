const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/save', playerController.savePlayer);

router.get('/users', playerController.getPlayers);
router.get('/search', playerController.getPlayersByName);

module.exports = router;

