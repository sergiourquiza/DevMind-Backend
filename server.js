const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const { sequelize } = require("./database/database.js");



const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send({ express: 'Bienvenido a la API de Dev|Mind, exitos te deseamos Juan y Sergio' });
}, (error) => {
    console.log(error);
});

async function connectionDataBase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false});
        console.log("Conexion exitosa a la base de datos");
    } catch (error) {
        console.log("Error en la conexion",error);
    }
}

app.listen(port, () => {
    console.log(`Activado escuchando en el puerto: ${port}`)
    connectionDataBase()
})