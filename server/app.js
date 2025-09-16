const express = require('express');
const bodyParser = require('body-parser');
const playerRoutes = require('./routers/playerRoutes');
const { initDB, getPlayersByName } = require('./controllers/playerController');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // frontend


// Rutas
app.use('/', playerRoutes);

// Página de búsqueda y resultados
app.get('/search-page', async (req, res) => {
  const nombre = req.query.nombre || '';
  let users = [];
  if (nombre) {
    try {
      users = await require('./models/playerModel').getPlayersByName(nombre);
    } catch (error) {
      return res.render('resultados', { users: [], error: error.message });
    }
  }
  res.render('resultados', { users });
});

// Inicializar base de datos
initDB();

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
 