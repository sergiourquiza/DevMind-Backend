const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('--- Bienvenidos a la API de DEV|MIND, A LA ORDEN PARA EL DESORNDEN 😊 ---');
});

// Usar las rutas
app.use('/', routes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server activo en el puerto ${PORT}`);
});

