// server.js
const express = require('express');
require('dotenv').config(); 
const createSequelizeInstance = require('./database/database.js');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({ express: 'Bienvenido a la API de Dev|Mind, éxitos te deseamos Juan y Sergio' });
});

async function connectionDataBase() {
    try {
        const sequelize = await createSequelizeInstance();
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.log("Error en la conexión:", error);
    }
}

app.listen(port, () => {
    console.log(`Activado escuchando en el puerto: ${port}`);
    connectionDataBase();
});
