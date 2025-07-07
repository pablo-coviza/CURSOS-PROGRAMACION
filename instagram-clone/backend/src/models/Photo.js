// src/models/Photo.js

const mongoose = require('mongoose');

// Definir el esquema de una foto
const photoSchema = new mongoose.Schema({
    // Información del archivo
    nombre: {
        type: String,
        required: true
    },
    nombreOriginal: {
        type: String,
        required: true
    },
    ruta: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

    // Metadatos
    tamaño: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        default: 'Sin descripción'
    },

    // Información temporal
    fechaSubida: {
        type: Date,
        default: Date.now
    }
}, {
    // Opciones del esquema
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Crear y exportar el modelo
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;