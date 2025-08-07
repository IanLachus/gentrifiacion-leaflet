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

    // Tabla 7: Desplazamiento Barrios
  db.run(`CREATE TABLE IF NOT EXISTS desplazamiento_barrios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barrio TEXT,
    anio INTEGER,
    personas_desplazadas INTEGER,
    motivo TEXT,
    nuevo_destino TEXT
  )`);

  db.get('SELECT COUNT(*) as count FROM desplazamiento_barrios', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO desplazamiento_barrios 
        (barrio, anio, personas_desplazadas, motivo, nuevo_destino) VALUES
        ('Barrio Amón', 2021, 36, 'Aumento alquileres', 'Goicoechea'),
        ('Escalante', 2022, 58, 'Nuevos desarrollos inmobiliarios', 'Guadalupe'),
        ('Barrio Otoya', 2021, 15, 'Remodelaciones y venta de viviendas', 'Heredia'),
        ('Barrio La California', 2023, 44, 'Expansión de restaurantes y bares', 'Desamparados'),
        ('Barrio México', 2020, 29, 'Aumento del costo de vida', 'Alajuelita'),
        ('San Pedro', 2023, 60, 'Residencias estudiantiles y Airbnb', 'Sabanilla'),
        ('Pavas', 2021, 18, 'Cambios en uso de suelo', 'Hatillo'),
        ('Rohrmoser', 2022, 23, 'Nuevas torres residenciales', 'Tibás')
      `);
    }
  });

  // Tabla 8: Desplazamiento Zonas Costeras
  db.run(`CREATE TABLE IF NOT EXISTS desplazamiento_zonas_costeras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zona TEXT,
    anio INTEGER,
    personas_desplazadas INTEGER,
    motivo TEXT,
    nuevo_destino TEXT
  )`);

  db.get('SELECT COUNT(*) as count FROM desplazamiento_zonas_costeras', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO desplazamiento_zonas_costeras 
        (zona, anio, personas_desplazadas, motivo, nuevo_destino) VALUES
        ('Tamarindo', 2022, 110, 'Aumento de alquileres por turismo', 'Santa Cruz'),
        ('Puerto Viejo', 2023, 85, 'Venta de propiedades a extranjeros', 'Limón Centro'),
        ('Nosara', 2021, 70, 'Nuevos condominios y resorts', 'Nicoya'),
        ('Jacó', 2022, 92, 'Conversión de viviendas a Airbnb', 'Parrita'),
        ('Santa Teresa', 2023, 48, 'Incremento de precios y especulación', 'Cóbano'),
        ('Playas del Coco', 2021, 62, 'Expansión de proyectos inmobiliarios', 'Sardinal'),
        ('Cahuita', 2020, 36, 'Cambios en regulación de tierras', 'Bribrí'),
        ('Bahía Ballena', 2023, 51, 'Urbanización turística', 'Uvita'),
        ('Herradura', 2022, 27, 'Reemplazo de viviendas por hoteles', 'Puntarenas'),
        ('Dominical', 2021, 44, 'Venta masiva a desarrolladores', 'San Isidro de El General')
      `);
    }
  });

    // Tabla 9: Zonas Gentrificación
  db.run(`CREATE TABLE IF NOT EXISTS zonas_gentrificacion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zona TEXT,
    anio_inicio INTEGER,
    descripcion TEXT
  )`);

  db.get('SELECT COUNT(*) as count FROM zonas_gentrificacion', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO zonas_gentrificacion 
        (zona, anio_inicio, descripcion) VALUES
        ('Puntarenas Centro', 2010, 'El desarrollo turístico ha generado aumento en los precios y desplazamiento de comunidades costeras tradicionales.'),
        ('Jacó', 2005, 'La construcción de condominios y hoteles de lujo ha provocado el aumento del costo de vida para los residentes originales.'),
        ('Limón Centro', 2013, 'Las mejoras en infraestructura han atraído inversión turística que está desplazando a comunidades vulnerables.'),
        ('Cahuita', 2015, 'El auge turístico ha transformado la economía local, afectando el acceso a vivienda para los residentes.'),
        ('Puerto Viejo', 2011, 'Zona de alto turismo internacional, con desplazamiento cultural y encarecimiento de la vida.'),
        ('Tamarindo', 2000, 'El turismo masivo ha convertido esta playa en un centro comercializado, con impacto en las comunidades locales.'),
        ('Nosara', 2017, 'El crecimiento de villas de lujo y turismo de yoga ha aumentado la exclusión social y económica.'),
        ('Santa Teresa', 2016, 'Popular entre extranjeros, los precios de propiedad y alquiler se han disparado.'),
        ('Manuel Antonio', 2008, 'Zona de alto turismo donde los habitantes locales se ven desplazados por la expansión hotelera.'),
        ('Dominical', 2014, 'El desarrollo inmobiliario para turistas ha reducido el acceso a servicios y tierras locales.'),
        ('Herradura', 2009, 'El turismo de lujo ha reemplazado muchas viviendas tradicionales.'),
        ('Playa Hermosa', 2018, 'El auge de surfistas extranjeros ha cambiado el tejido social local.'),
        ('Playas del Coco', 2012, 'Gran cantidad de inversión extranjera ha desplazado a residentes por especulación inmobiliaria.'),
        ('Sámara', 2019, 'La presión por convertir casas en Airbnb ha afectado a inquilinos locales.'),
        ('Mal País', 2017, 'El crecimiento turístico ha generado desplazamiento de familias locales y aumento en precios.'),
        ('Uvita', 2020, 'El auge de visitantes ha hecho que muchas casas se conviertan en alojamientos turísticos.'),
        ('Monteverde', 2010, 'Aunque no está en la costa, se ha visto afectada por el turismo desmedido y alzas en la tierra.'),
        ('Pochote', 2018, 'La construcción de proyectos turísticos ha despojado tierras comunales.'),
        ('Isla Chira', 2021, 'Proyectos turísticos han generado tensiones entre desarrollo y conservación local.'),
        ('Bahía Ballena', 2015, 'El turismo en auge ha generado un cambio en el uso del suelo, afectando a los habitantes.')
      `);
    }
  });

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

// 7. Desplazamiento Barrios
app.get('/api/desplazamiento_barrios', (req, res) => {
  db.all('SELECT * FROM desplazamiento_barrios', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 8. Desplazamiento Zonas Costeras
app.get('/api/desplazamiento_zonas_costeras', (req, res) => {
  db.all('SELECT * FROM desplazamiento_zonas_costeras', (err, rows) => {
    if (err) res.status(500).json({error: err});
    else res.json(rows);
  });
});

// 9. Zonas Gentrificación
app.get('/api/zonas_gentrificacion', (req, res) => {
  db.all('SELECT * FROM zonas_gentrificacion', (err, rows) => {
    if (err) res.status(500).json({ error: err });
    else res.json(rows);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
