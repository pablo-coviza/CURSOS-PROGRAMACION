// src/config/database.js

const mongoose = require('mongoose');

// Función para conectar a MongoDB
const connectDB = async () => {
    try {
        // Conectar a MongoDB Atlas
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        console.log(`📁 Base de datos: ${conn.connection.name}`);

    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        // Salir del proceso si no se puede conectar
        process.exit(1);
    }
};

module.exports = connectDB;
