const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize("postgres://postgres:sergio00@localhost:5432/DevMindDB", {
    dialect: "postgres",
});

async function checkDatabaseExists() {
    try {
        await sequelize.authenticate();
        const result = await sequelize.query("SELECT 1 FROM pg_database WHERE datname = 'DevMindDB'");
        if (result[0].length === 0) {
            await sequelize.query("CREATE DATABASE DevMindDB");
            console.log("La base de datos ha sido creada exitosamente miau.");
        } else {
            console.log("La base de datos ya existe.");
        }
    } catch (error) {
        console.error("Error al comprobar la existencia de la base de datos:", error);
    }
}

checkDatabaseExists();

module.exports = sequelize;
