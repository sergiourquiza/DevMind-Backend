// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const dbName = process.env.DB_NAME || 'DevMindDB';
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS || 'sergio00';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

const sequelizeWithoutDB = new Sequelize(`postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/postgres`, {
    dialect: "postgres",
});

async function checkDatabaseExists() {
    try {
        await sequelizeWithoutDB.authenticate();
        const result = await sequelizeWithoutDB.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (result[0].length === 0) {
            await sequelizeWithoutDB.query(`CREATE DATABASE "${dbName}"`);
            console.log("La base de datos ha sido creada exitosamente.");
        } else {
            console.log("La base de datos ya existe.");
        }
    } catch (error) {
        console.error("Error al comprobar la existencia de la base de datos:", error);
    }
}

async function createSequelizeInstance() {
    await checkDatabaseExists();
    
    const sequelize = new Sequelize(`postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, {
        dialect: "postgres",
    });
    
    return sequelize;
}

module.exports = createSequelizeInstance;
