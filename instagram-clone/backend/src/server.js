// 1. IMPORTAR DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// 2. CREAR LA APLICACIÓN EXPRESS
const app = express();

// 3. CONFIGURAR MULTER PARA SUBIDA DE ARCHIVOS
const storage = multer.diskStorage({
    // Donde guardar los archivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta uploads que creamos
    },
    // Cómo nombrar los archivos
    filename: function (req, file, cb) {
        // Crear nombre único: timestamp + nombre original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configurar multer con filtros
const upload = multer({
    storage: storage,
    // Filtrar solo imágenes
    fileFilter: function (req, file, cb) {
        // Verificar que sea una imagen
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    },
    // Límite de tamaño: 5MB
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB en bytes
    }
});

// 4. CONFIGURAR MIDDLEWARES
app.use(cors());
app.use(express.json());

// NUEVO: Servir archivos estáticos (para ver las fotos)
app.use('/uploads', express.static('uploads'));

// 5. ARRAY TEMPORAL PARA GUARDAR INFO DE FOTOS
// (Más adelante esto irá a MongoDB)
let fotos = [];

// 6. ENDPOINTS EXISTENTES
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Hola Instagram Clone!',
        estado: 'Servidor funcionando perfectamente',
        endpoints: {
            subir_foto: 'POST /api/fotos',
            ver_fotos: 'GET /api/fotos',
            ver_imagen: 'GET /uploads/nombre-archivo'
        }
    });
});

// 7. NUEVO ENDPOINT: SUBIR FOTO
app.post('/api/fotos', upload.single('foto'), (req, res) => {
    try {
        // Verificar que se subió un archivo
        if (!req.file) {
            return res.status(400).json({
                error: 'No se subió ninguna foto'
            });
        }

        // Crear objeto con info de la foto
        const nuevaFoto = {
            id: fotos.length + 1,
            nombre: req.file.filename,
            nombreOriginal: req.file.originalname,
            ruta: req.file.path,
            url: `http://localhost:3000/uploads/${req.file.filename}`,
            tamaño: req.file.size,
            fechaSubida: new Date().toISOString(),
            descripcion: req.body.descripcion || 'Sin descripción'
        };

        // Agregar al array temporal
        fotos.push(nuevaFoto);

        res.json({
            mensaje: '¡Foto subida exitosamente!',
            foto: nuevaFoto
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al subir la foto: ' + error.message
        });
    }
});

// 8. ENDPOINT ACTUALIZADO: VER TODAS LAS FOTOS
app.get('/api/fotos', (req, res) => {
    res.json({
        mensaje: `Tienes ${fotos.length} foto(s) subida(s)`,
        fotos: fotos
    });
});

// 9. NUEVO ENDPOINT: VER UNA FOTO ESPECÍFICA
app.get('/api/fotos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const foto = fotos.find(f => f.id === id);

    if (!foto) {
        return res.status(404).json({
            error: 'Foto no encontrada'
        });
    }

    res.json(foto);
});

// 10. CONFIGURAR EL PUERTO
const PORT = 3000;

// 11. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor Instagram corriendo en http://localhost:${PORT}`);
    console.log(`📸 Subir fotos: POST http://localhost:${PORT}/api/fotos`);
    console.log(`👀 Ver fotos: GET http://localhost:${PORT}/api/fotos`);
    console.log(`🖼️  Ver archivos: http://localhost:${PORT}/uploads/`);
});