# 🌍 Proyecto Final Azure – Gentrificación CR

Este proyecto implementa una aplicación web en **React** con **React-Leaflet** que permite visualizar y analizar los impactos de la **gentrificación en Costa Rica**.  

El sistema incluye:  
- Autenticación básica de usuario (registro e inicio de sesión).  
- Visualización de zonas costeras y montañosas en un **mapa interactivo**.  
- Integración con **Azure SQL Database** para mostrar información en 5 tablas:  
  1. **Barrios**  
  2. **Edificios**  
  3. **Precios de Vivienda**  
  4. **Negocios Locales**  
  5. **Eventos de Desplazamiento**  

---

## 🏗️ Arquitectura del sistema

La aplicación está desplegada en **Microsoft Azure** bajo un modelo **monolítico**:  
- **Azure App Service** aloja tanto el **frontend** (React) como el **backend** (Node.js/Express).  
- **Azure SQL Database** guarda los datos estructurados (5 tablas).  
- **Azure Storage** se emplea para recursos estáticos (imágenes, íconos, etc.).  
- **Azure Monitor** recolecta métricas y logs de la aplicación.  

### 📌 Diagrama lógico de infraestructura
![Arquitectura en Azure](./azure_architecture_diagram.png)

---

## ⚙️ Servicios de Azure utilizados

| Servicio              | Rol en el proyecto                           |
|-----------------------|-----------------------------------------------|
| **App Service**       | Hospedaje del frontend + backend (monolítico)|
| **Azure SQL Database**| Almacenamiento relacional de los datos        |
| **Azure Storage**     | Recursos estáticos (imágenes, íconos)        |
| **Azure Monitor**     | Monitoreo de métricas y logs                 |

---

## 🖥️ Comandos ejecutados

### 1. Inicialización del proyecto React
```bash
npx create-react-app gentrificacion-leaflet
cd gentrificacion-leaflet
npm install react-leaflet leaflet