// src/server.js

// 1. CARGAR VARIABLES DE ENTORNO PRIMERO
require('dotenv').config();

// 2. IMPORTAR DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// 3. IMPORTAR CONFIGURACIÓN Y MODELOS
const connectDB = require('./config/database');
const Photo = require('./models/Photo');

// 4. CONECTAR A LA BASE DE DATOS
connectDB();

// 5. CREAR LA APLICACIÓN EXPRESS
const app = express();

// 6. CONFIGURAR MULTER (sin cambios)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// 7. CONFIGURAR MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 8. ELIMINAR EL ARRAY TEMPORAL - ¡Ya no lo necesitamos!
// let fotos = []; ← COMENTAR O ELIMINAR ESTA LÍNEA

// 9. ENDPOINT DE BIENVENIDA (actualizado)
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Hola Instagram Clone con MongoDB!',
        estado: 'Servidor funcionando con base de datos',
        database: 'MongoDB Atlas conectado',
        endpoints: {
            subir_foto: 'POST /api/fotos',
            ver_fotos: 'GET /api/fotos',
            ver_imagen: 'GET /uploads/nombre-archivo'
        }
    });
});

// 10. ENDPOINT ACTUALIZADO: SUBIR FOTO CON MONGODB
app.post('/api/fotos', upload.single('foto'), async (req, res) => {
    try {
        // Verificar que se subió un archivo
        if (!req.file) {
            return res.status(400).json({
                error: 'No se subió ninguna foto'
            });
        }

        // Crear nueva foto en MongoDB
        const nuevaFoto = new Photo({
            nombre: req.file.filename,
            nombreOriginal: req.file.originalname,
            ruta: req.file.path,
            url: `http://localhost:${process.env.PORT || 3000}/uploads/${req.file.filename}`,
            tamaño: req.file.size,
            descripcion: req.body.descripcion || 'Sin descripción'
        });

        // Guardar en MongoDB
        const fotoGuardada = await nuevaFoto.save();

        console.log('📸 Foto guardada en MongoDB:', fotoGuardada._id);

        res.json({
            mensaje: '¡Foto subida y guardada en MongoDB!',
            foto: {
                id: fotoGuardada._id,
                nombre: fotoGuardada.nombre,
                nombreOriginal: fotoGuardada.nombreOriginal,
                url: fotoGuardada.url,
                tamaño: fotoGuardada.tamaño,
                fechaSubida: fotoGuardada.fechaSubida,
                descripcion: fotoGuardada.descripcion
            }
        });

    } catch (error) {
        console.error('❌ Error al guardar foto:', error);
        res.status(500).json({
            error: 'Error al subir la foto: ' + error.message
        });
    }
});

// 11. ENDPOINT ACTUALIZADO: VER TODAS LAS FOTOS DESDE MONGODB
app.get('/api/fotos', async (req, res) => {
    try {
        // Buscar todas las fotos en MongoDB
        const fotos = await Photo.find().sort({ fechaSubida: -1 }); // Más recientes primero

        console.log(`📱 Enviando ${fotos.length} fotos desde MongoDB`);

        res.json({
            mensaje: `Tienes ${fotos.length} foto(s) en la base de datos`,
            fotos: fotos.map(foto => ({
                id: foto._id.toString(),
                nombre: foto.nombre,
                nombreOriginal: foto.nombreOriginal,
                url: foto.url,
                tamaño: foto.tamaño,
                fechaSubida: foto.fechaSubida,
                descripcion: foto.descripcion
            }))
        });

    } catch (error) {
        console.error('❌ Error al obtener fotos:', error);
        res.status(500).json({
            error: 'Error al obtener las fotos: ' + error.message
        });
    }
});

// 12. ENDPOINT ACTUALIZADO: VER UNA FOTO ESPECÍFICA
app.get('/api/fotos/:id', async (req, res) => {
    try {
        const foto = await Photo.findById(req.params.id);

        if (!foto) {
            return res.status(404).json({
                error: 'Foto no encontrada'
            });
        }

        res.json({
            id: foto._id,
            nombre: foto.nombre,
            nombreOriginal: foto.nombreOriginal,
            url: foto.url,
            tamaño: foto.tamaño,
            fechaSubida: foto.fechaSubida,
            descripcion: foto.descripcion
        });

    } catch (error) {
        console.error('❌ Error al obtener foto:', error);
        res.status(500).json({
            error: 'Error al obtener la foto: ' + error.message
        });
    }
});

// NUEVO ENDPOINT: ELIMINAR FOTO
app.delete('/api/fotos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar la foto antes de eliminarla para obtener la ruta del archivo
        const foto = await Photo.findById(id);

        if (!foto) {
            return res.status(404).json({
                error: 'Foto no encontrada'
            });
        }

        // Eliminar archivo físico del servidor
        const fs = require('fs');
        const filePath = foto.ruta;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Archivo eliminado: ${filePath}`);
        }

        // Eliminar registro de MongoDB
        await Photo.findByIdAndDelete(id);

        console.log(`✅ Foto eliminada de MongoDB: ${id}`);

        res.json({
            mensaje: 'Foto eliminada exitosamente',
            fotoEliminada: {
                id: foto._id,
                nombre: foto.nombre,
                descripcion: foto.descripcion
            }
        });

    } catch (error) {
        console.error('❌ Error al eliminar foto:', error);
        res.status(500).json({
            error: 'Error al eliminar la foto: ' + error.message
        });
    }
});

// 13. CONFIGURAR EL PUERTO
const PORT = process.env.PORT || 3000;

// 14. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor Instagram corriendo en http://localhost:${PORT}`);
    console.log(`💾 Base de datos: MongoDB Atlas`);
    console.log(`📸 Subir fotos: POST http://localhost:${PORT}/api/fotos`);
    console.log(`👀 Ver fotos: GET http://localhost:${PORT}/api/fotos`);
    console.log(`🖼️  Ver archivos: http://localhost:${PORT}/uploads/`);
});