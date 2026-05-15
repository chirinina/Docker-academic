const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'database',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root_password',
    database: process.env.DB_NAME || 'cv_db',
    port: 3306
};

// Reintentar conexión a la base de datos
const connectWithRetry = () => {
    console.log('Intentando conectar a la base de datos...');
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos, reintentando en 5 segundos...', err.message);
            setTimeout(connectWithRetry, 5000);
            return;
        }
        console.log('Conectado a la base de datos MySQL.');
        global.db = connection;
    });
};

connectWithRetry();

// Endpoint GET /cv
app.get('/cv', (req, res) => {
    if (!global.db) {
        return res.status(503).json({ message: 'La base de datos aún se está inicializando, por favor intente en unos segundos.' });
    }

    const queryPersona = 'SELECT * FROM persona LIMIT 1';
    const queryFormacion = 'SELECT * FROM formacion';

    global.db.query(queryPersona, (err, personaResult) => {
        if (err) {
            console.error('Error query persona:', err.message);
            return res.status(500).json({ error: 'Error al consultar datos personales' });
        }

        global.db.query(queryFormacion, (err, formacionResult) => {
            if (err) {
                console.error('Error query formacion:', err.message);
                return res.status(500).json({ error: 'Error al consultar formación académica' });
            }

            if (!personaResult || personaResult.length === 0) {
                return res.status(404).json({ message: 'No se encontró información del perfil' });
            }

            const cvData = {
                personal: personaResult[0],
                formacion: formacionResult
            };

            res.json(cvData);
        });
    });
});

app.listen(port, () => {
    console.log(`Backend ejecutándose en http://localhost:${port}`);
});
