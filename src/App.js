import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Register from './components/Register';
import Login from './components/Login'; 
import Intro from './components/Intro';
import Main from './components/Main';
// Tablas
import TablaBarrios from './components/TablaBarrios';
import TablaEdificios from './components/TablaEdificios';
import TablaPreciosVivienda from './components/TablaPreciosVivienda';
import TablaNegociosLocales from './components/TablaNegociosLocales';
import TablaEventosDesplazamiento from './components/TablaEventosDesplazamiento';
import TablaSegregacionSocial from './components/TablaSegregacionSocial';
import TablaDesplazamientoBarrios from './components/TablaDesplazamientoBarrios';
import TablaDesplazamientoZonasCosteras from './components/TablaDesplazamientoZonasCosteras';
import TablaZonasGentrificacion from './components/TablaZonasGentrificacion';
import TablaIdentidadCultural from './components/TablaIdentidadCultural'; // Asegúrate de que este archivo exista
// Termina tabla
import SeccionVideos from './components/SeccionVideos';
import ContactoSoporte from './components/ContactoSoporte';
import HighlightFlipBox from "./components/HighlightFlipBox";
import Navbar from './components/Navbar';
import ChatRoom from './components/ChatRoom';
import IdentidadCulturalFlipBox from './components/IdentidadCulturalFlipBox';
// React Icons
import { FaUserCircle, FaHeartBroken, FaRegSadTear } from 'react-icons/fa';
import { GiMoneyStack } from "react-icons/gi";
import { BsFillHousesFill } from "react-icons/bs";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaChartLine, FaStore, FaCity, FaPeopleArrows, FaLandmark, FaDollarSign } from "react-icons/fa";


// Fix para íconos rotos en Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const zonasCosteras = [
  { id: 1, name: "Puntarenas Centro", coords: [9.9768, -84.8373], description: "El desarrollo turístico ha generado aumento en los precios y desplazamiento de comunidades costeras tradicionales." },
  { id: 2, name: "Jacó", coords: [9.6237, -84.6333], description: "La construcción de condominios y hoteles de lujo ha provocado el aumento del costo de vida para los residentes originales." },
  { id: 3, name: "Limón Centro", coords: [9.9905, -83.0350], description: "Las mejoras en infraestructura han atraído inversión turística que está desplazando a comunidades vulnerables." },
  { id: 4, name: "Cahuita", coords: [9.7412, -82.8378], description: "El auge turístico ha transformado la economía local, afectando el acceso a vivienda para los residentes." },
  { id: 5, name: "Puerto Viejo", coords: [9.6687, -82.7510], description: "Zona de alto turismo internacional, con desplazamiento cultural y encarecimiento de la vida." },
  { id: 6, name: "Tamarindo", coords: [10.2991, -85.8415], description: "El turismo masivo ha convertido esta playa en un centro comercializado, con impacto en las comunidades locales." },
  { id: 7, name: "Nosara", coords: [9.9792, -85.6641], description: "El crecimiento de villas de lujo y turismo de yoga ha aumentado la exclusión social y económica." },
  { id: 8, name: "Santa Teresa", coords: [9.6395, -85.1602], description: "Popular entre extranjeros, los precios de propiedad y alquiler se han disparado." },
  { id: 9, name: "Manuel Antonio", coords: [9.3899, -84.1393], description: "Zona de alto turismo donde los habitantes locales se ven desplazados por la expansión hotelera." },
  { id: 10, name: "Dominical", coords: [9.3256, -83.8853], description: "El desarrollo inmobiliario para turistas ha reducido el acceso a servicios y tierras locales." },
  { id: 11, name: "Herradura", coords: [9.6351, -84.6363], description: "El turismo de lujo ha reemplazado muchas viviendas tradicionales." },
  { id: 12, name: "Playa Hermosa", coords: [9.6453, -84.6345], description: "El auge de surfistas extranjeros ha cambiado el tejido social local." },
  { id: 13, name: "Playas del Coco", coords: [10.5531, -85.6393], description: "Gran cantidad de inversión extranjera ha desplazado a residentes por especulación inmobiliaria." },
  { id: 14, name: "Sámara", coords: [9.8964, -85.1712], description: "La presión por convertir casas en Airbnb ha afectado a inquilinos locales." },
  { id: 15, name: "Mal País", coords: [9.6398, -85.1633], description: "El crecimiento turístico ha generado desplazamiento de familias locales y aumento en precios." },
  { id: 16, name: "Uvita", coords: [9.1561, -83.8176], description: "El auge de visitantes ha hecho que muchas casas se conviertan en alojamientos turísticos." },
  { id: 17, name: "Monteverde", coords: [10.2765, -84.7833], description: "Aunque no está en la costa, se ha visto afectada por el turismo desmedido y alzas en la tierra." },
  { id: 18, name: "Pochote", coords: [9.8990, -85.1720], description: "La construcción de proyectos turísticos ha despojado tierras comunales." },
  { id: 19, name: "Isla Chira", coords: [10.1582, -85.0721], description: "Proyectos turísticos han generado tensiones entre desarrollo y conservación local." },
  { id: 20, name: "Bahía Ballena", coords: [9.1056, -83.7430], description: "El turismo en auge ha generado un cambio en el uso del suelo, afectando a los habitantes." },
];

const SECCIONES = [
  {
    id: 'segregacion',
    nombre: 'Segregación social',
    contenido: (
      <div className="info-card">
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span role="img" aria-label="segregacion"></span>
          Segregación social
        </h2>
        <p>
          La <span className="resaltado">gentrificación</span> suele intensificar la <b>segregación social</b> en los barrios afectados. Al aumentar los precios de alquiler y de vivienda, las familias de menores ingresos se ven obligadas a mudarse a zonas periféricas, mientras que los nuevos residentes (generalmente de mayor poder adquisitivo) ocupan el espacio central. Esto provoca una <b>reducción en la diversidad social</b> y la pérdida de redes comunitarias, aumentando la desigualdad y dificultando la integración social.
          <br /><br />
          Además, la segregación <b>no</b> solo es económica, sino también cultural. La convivencia entre los antiguos y nuevos habitantes se ve <b>limitada</b>, pues los intereses, hábitos y valores pueden ser muy distintos. Esto puede generar conflictos y un <b>sentimiento de exclusión</b> para quienes han vivido en la comunidad por generaciones.
          <br /><br />
          Finalmente, la falta de políticas públicas que protejan a los residentes más vulnerables agrava este fenómeno, haciendo que los barrios pierdan parte de su historia y de su riqueza cultural, mientras se fortalecen dinámicas de exclusión social.
        </p>

        <ul className="nice-list">
          <li>Desplazamiento de familias tradicionales.</li>
          <li>Cambios en el tejido social del barrio.</li>
          <li>Reducción de actividades y espacios comunitarios.</li>
        </ul>
      </div>
    ),
  },
  {
  id: 'desplazamiento',
  nombre: 'Desplazamiento de habitantes',
  contenido: (
    <div className="info-card info-modern">
      <div className="icon-circle">
        <span id='casita' role="img" aria-label="Casa desplazada" style={{ fontSize: 34 }}><BsFillHousesFill /></span>
      </div>
      <h2 className="info-title">Desplazamiento de habitantes</h2>
      <p className="info-main">
        La <span className="resaltado">gentrificación</span> trae consigo el <b>desplazamiento involuntario</b> de personas que han vivido durante años en el barrio, pues los precios de alquiler y vivienda aumentan drásticamente. Esto obliga a familias y adultos mayores a buscar zonas más asequibles, perdiendo lazos comunitarios y calidad de vida.
      </p>

      <div className="info-flex-highlights">
        <HighlightFlipBox
          icon={<FaHeartBroken color="#219150" />}
          title="Ruptura de comunidad"
          description="Familias deben separarse de vecinos y amigos de toda la vida."
        />
        <HighlightFlipBox
          icon={<GiMoneyStack color="#219150" />}
          title="Dificultad en servicios"
          description="Mudanza a barrios lejanos encarece y dificulta la vida diaria."
        />
      </div>
      <div className="info-flex-highlights">
        <HighlightFlipBox
          icon={<FaRegSadTear color="#219150" />}
          title="Impacto emocional"
          description="Estrés, ansiedad y sentimiento de pérdida del hogar."
        />
        <HighlightFlipBox
          icon={<MdOutlineRemoveShoppingCart color="#219150" />}
          title="Cierre de comercios"
          description="Negocios de siempre desaparecen por falta de clientela habitual."
        />
      </div>

      <p className="info-bottom" style={{ marginTop: 30, marginBottom: 0}}>
        <b>¿Qué hacer?</b> Promover <span className="resaltado">vivienda asequible</span> y proteger a inquilinos son acciones clave para evitar el desplazamiento forzado y conservar la esencia de cada barrio.
      </p><br></br>
    </div>
  ),
  },
  {
    id: 'elementos',
    nombre: 'Elementos de la gentrificación',
    contenido: (
      <div className="elementos-grid">
      <div className="elemento-card">
        <FaChartLine className="icon-elemento" />
        <h3>Subida de precios</h3>
        <p>El valor de la propiedad y alquileres se eleva, excluyendo a residentes originales.</p>
      </div>
      <div className="elemento-card">
        <FaStore className="icon-elemento" />
        <h3>Cambio comercial</h3>
        <p>Negocios tradicionales cierran y son reemplazados por tiendas gourmet y cafés.</p>
      </div>
      <div className="elemento-card">
        <FaCity className="icon-elemento" />
        <h3>Renovación urbana</h3>
        <p>Mejoras en la infraestructura y espacios públicos atraen inversión y turismo.</p>
      </div>
      <div className="elemento-card">
        <FaPeopleArrows className="icon-elemento" />
        <h3>Desplazamiento</h3>
        <p>Familias originales se mudan por no poder costear los nuevos precios.</p>
      </div>
      <div className="elemento-card">
        <FaLandmark className="icon-elemento" />
        <h3>Cambio de identidad</h3>
        <p>El barrio pierde sus costumbres y tradiciones originales, cambiando su esencia.</p>
      </div>
      <div className="elemento-card">
        <FaDollarSign className="icon-elemento" />
        <h3>Especulación inmobiliaria</h3>
        <p>La compra de propiedades para inversión acelera la gentrificación.</p>
      </div>
    </div>
    ),
  },
  {
  id: 'identidad',
  nombre: 'Identidad cultural',
  contenido: (
    <div>
      <IdentidadCulturalFlipBox />
    </div>
  ),
  },
  {
    id: 'mapa',
    nombre: 'Mapa de zonas afectadas',
    contenido: ({ onVerMas, selectedZona, onCerrar }) => (
      <div>
        <h2>🗺️ Mapa de zonas costeras afectadas</h2>
        <div className="map-section">
          <MapContainer center={[9.7489, -83.7534]} zoom={7} className="leaflet-map" >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[9.9325, -84.0789]}>
              <Popup>San José - Capital de Costa Rica</Popup>
            </Marker>
            {zonasCosteras.map((zona) => (
              <Marker key={zona.id} position={zona.coords}>
                <Popup>
                  <div>
                    <strong>{zona.name}</strong>
                    <p>Zona afectada por gentrificación</p>
                    <button className="ver-mas-btn" onClick={() => onVerMas(zona)}>
                      Ver más
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        {selectedZona && (
          <div className="detail-section fadeIn">
            <h2>{selectedZona.name}</h2>
            <p>{selectedZona.description}</p>
            <button onClick={onCerrar}>Cerrar</button>
          </div>
        )}
      </div>
    ),
  },
  // ¡No agregues la sección de "videos" aquí!
];

function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [selectedZona, setSelectedZona] = useState(null);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleVerMas = (zona) => setSelectedZona(zona);
  const handleCerrar = () => setSelectedZona(null);
  const handleLogout = () => setUser(null);

  if (!user) {
    return (
      <>
        {showRegister ? (
          <Register
            onRegister={(user) => { setShowRegister(false); setUser(user); }}
            onSwitchLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLogin={setUser}
            onSwitchRegister={() => setShowRegister(true)}
          />
        )}
      </>
    );
  }

  return (
    <div>
      <Navbar
        onLogout={handleLogout}
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
        setSelectedZona={setSelectedZona}
        SECCIONES={SECCIONES}
      />
      {user && (
        <div className="user-info-box">
          <FaUserCircle size={28} style={{ marginRight: '8px' }} />
          <span>{user.nombre || user.username}</span>
        </div>
      )}
      <div className="page-container" style={{ marginLeft: 210, padding: 32 }}>
        <header className="header">
          <h1>Impactos Sociales de la Gentrificación</h1>
        </header>
        <main>
          {!seccionActiva ? (
            <Intro />
            ) : seccionActiva === "contacto" ? (
            <ContactoSoporte />
          ) : seccionActiva === 'videos' ? (
            <SeccionVideos />
          ) : (
            <section className="info-section fadeIn">
              {seccionActiva === 'mapa'
                ? SECCIONES.find(sec => sec.id === 'mapa').contenido({
                    onVerMas: handleVerMas,
                    selectedZona,
                    onCerrar: handleCerrar,
                  })
                : SECCIONES.find(sec => sec.id === seccionActiva)?.contenido}
            </section>
          )}

          {/* Solo la tabla correspondiente a la sección activa */}
          {seccionActiva === 'segregacion' && <TablaSegregacionSocial />}
          {seccionActiva === 'desplazamiento' && (
            <div>
              <TablaDesplazamientoBarrios />
              <TablaDesplazamientoZonasCosteras />
            </div>
          )}
          {/* {seccionActiva === 'elementos' && <TablaPreciosVivienda />} */}
          {seccionActiva === 'identidad' && <TablaIdentidadCultural />}
          {seccionActiva === 'mapa' && <TablaZonasGentrificacion />}
          {seccionActiva === 'chat' && <ChatRoom />}
        </main>
        <footer className="footer">
          Copyright © {new Date().getFullYear()} GentriCR. Todos los derechos reservados. Desarrollado por Ian Mora.
        </footer>
      </div>
    </div>
  );
}

export default App;