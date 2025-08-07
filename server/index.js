const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./gentrificacion.db');

// CREACIÓN DE TABLAS Y DATOS DE EJEMPLO
db.serialize(() => {
  // Tabla 1: Barrios
  db.run(`CREATE TABLE IF NOT EXISTS barrios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    distrito TEXT,
    poblacion INTEGER,
    lat REAL,
    lng REAL
  )`);

  // Tabla 2: Edificios
  db.run(`CREATE TABLE IF NOT EXISTS edificios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    direccion TEXT,
    barrio_id INTEGER,
    año_construccion INTEGER
  )`);

  // Tabla 3: PreciosVivienda
  db.run(`CREATE TABLE IF NOT EXISTS precios_vivienda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barrio_id INTEGER,
    anio INTEGER,
    precio_promedio REAL,
    tipo TEXT
  )`);

  // Tabla 4: NegociosLocales
  db.run(`CREATE TABLE IF NOT EXISTS negocios_locales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    tipo TEXT,
    barrio_id INTEGER,
    año_apertura INTEGER
  )`);

  // Tabla 5: EventosDesplazamiento
  db.run(`CREATE TABLE IF NOT EXISTS eventos_desplazamiento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barrio_id INTEGER,
    año INTEGER,
    personas_desplazadas INTEGER,
    causa TEXT
  )`);

  // Tabla 6: SegregacionSocial
  db.run(`CREATE TABLE IF NOT EXISTS segregacion_social (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barrio TEXT,
    porcentaje_desplazados INTEGER,
    indice_diversidad TEXT,
    ingreso_promedio TEXT,
    cambios_comercio TEXT,
    observaciones TEXT
  )`);

  // Insertar datos de ejemplo solo si está vacío
  db.get('SELECT COUNT(*) as count FROM barrios', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO barrios (nombre, distrito, poblacion, lat, lng) VALUES 
        ('Barrio Central', 'Distrito 1', 3500, 9.933, -84.080),
        ('Barrio Sur', 'Distrito 2', 2200, 9.920, -84.070)
      `);

      db.run(`INSERT INTO edificios (nombre, direccion, barrio_id, año_construccion) VALUES
        ('Edificio A', 'Calle 1, #10', 1, 1980),
        ('Edificio B', 'Avenida 5, #23', 2, 2005)
      `);

      db.run(`INSERT INTO precios_vivienda (barrio_id, anio, precio_promedio, tipo) VALUES
        (1, 2020, 120000, 'venta'),
        (1, 2020, 600, 'alquiler'),
        (2, 2020, 95000, 'venta'),
        (2, 2020, 500, 'alquiler')
      `);

      db.run(`INSERT INTO negocios_locales (nombre, tipo, barrio_id, año_apertura) VALUES
        ('Café Central', 'Cafetería', 1, 2015),
        ('Mini Súper Sur', 'Supermercado', 2, 2018)
      `);

      db.run(`INSERT INTO eventos_desplazamiento (barrio_id, año, personas_desplazadas, causa) VALUES
        (1, 2021, 50, 'Aumento de alquileres'),
        (2, 2022, 20, 'Construcción')
      `);
    }
  });

  // Insertar datos de ejemplo para segregación social solo si está vacío
  db.get('SELECT COUNT(*) as count FROM segregacion_social', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO segregacion_social 
        (barrio, porcentaje_desplazados, indice_diversidad, ingreso_promedio, cambios_comercio, observaciones)
        VALUES 
        ('Barrio Central', 35, 'Bajo', 'Alto', '+60% tiendas gourmet', 'Aumento de precios y desplazamiento evidente'),
        ('Pueblo Antiguo', 22, 'Medio-Bajo', 'Medio', '+30% cafeterías nuevas', 'Pérdida de negocios tradicionales'),
        ('Colonia Verde', 44, 'Bajo', 'Alto', '+70% restaurantes', 'Familias originales mudándose a suburbios'),
        ('Santa Rosa', 17, 'Medio', 'Medio', '+20% galerías de arte', 'Mezcla de residentes nuevos y antiguos'),
        ('Las Lomas', 40, 'Muy Bajo', 'Muy Alto', '+85% locales exclusivos', 'Red de apoyo comunitaria debilitada')
      `);
    }
  });
});

// ENDPOINTS para cada tabla

// 1. Barrios
app.get('/api/barrios', (req, res) => {
  db.all('SELECT * FROM barrios', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 2. Edificios
app.get('/api/edificios', (req, res) => {
  db.all('SELECT * FROM edificios', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 3. Precios de Vivienda
app.get('/api/precios_vivienda', (req, res) => {
  db.all('SELECT * FROM precios_vivienda', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 4. Negocios Locales
app.get('/api/negocios_locales', (req, res) => {
  db.all('SELECT * FROM negocios_locales', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 5. Eventos de Desplazamiento
app.get('/api/eventos_desplazamiento', (req, res) => {
  db.all('SELECT * FROM eventos_desplazamiento', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 6. Segregacion Social
app.get('/api/segregacion_social', (req, res) => {
  db.all('SELECT * FROM segregacion_social', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
