require('dotenv').config();

const { Sequelize } = require("sequelize");

const connection = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT, 
        dialect: "postgres"
    }
);

const connectDB = async () => {
    try {
        await connection.authenticate();
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Connection Error:", error.message);
    }
};

module.exports = { connection, connectDB };