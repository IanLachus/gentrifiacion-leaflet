# Proyecto: Gentrificación CR – Despliegue en Azure

Este proyecto corresponde al despliegue en Microsoft Azure de una aplicación web desarrollada en **React** con **React-Leaflet** para visualizar, registrar y analizar el impacto de la gentrificación en Costa Rica.

## 🌐 Enlace público de la aplicación
[https://TU-URL-DE-AZURE](https://TU-URL-DE-AZURE)

## 📂 Repositorio
[GitHub Repo](https://github.com/TU-USUARIO/TU-REPO)

---

## 🚀 Arquitectura elegida
Se utilizó una **arquitectura monolítica** con los siguientes componentes:

- **Frontend:** React + React-Leaflet, desplegado en Azure App Service.
- **Backend:** Node.js con Express para exponer API REST.
- **Base de datos:** Azure SQL Database para almacenamiento estructurado de datos.
- **Almacenamiento:** Azure Storage para recursos estáticos.
- **Exposición pública:** URL pública vía App Service.

---

## ⚙️ Servicios de Azure utilizados
| Servicio              | Función                                      | Justificación |
|-----------------------|----------------------------------------------|---------------|
| **App Service**       | Hospedaje del frontend + backend             | Simplicidad de despliegue, escalabilidad básica |
| **Azure SQL Database**| Persistencia de datos de zonas, usuarios y tablas | Requiere consultas estructuradas |
| **Azure Storage**     | Almacenamiento de recursos estáticos (imágenes, mapas) | Bajo costo y alta disponibilidad |
| **Azure Monitor**     | Métricas y monitoreo                        | Seguimiento de rendimiento |

---

## 🛠️ Proceso de despliegue
1. Creación de **App Service** para frontend y backend.
2. Creación de **Azure SQL Database** e importación del esquema (5 tablas).
3. Configuración de **conexión segura** entre App Service y SQL.
4. Subida del código vía GitHub Actions (CI/CD).
5. Validación de la URL pública y pruebas de funcionamiento.

---

## 🔒 Seguridad
- Restricciones de acceso a la base de datos solo desde el App Service.
- Configuración de firewall en Azure SQL Database.
- Uso de credenciales seguras con variables de entorno en App Service.

---

## 📸 Capturas
- Interfaz principal con mapa Leaflet.
- Tablas de datos conectadas a SQL.
- Evidencia de despliegue en Azure.

---

## ✅ Conclusiones
Este despliegue demuestra cómo una arquitectura **monolítica en Azure** es suficiente para un sistema académico de análisis social.  
Las mejoras futuras incluyen migrar a microservicios para escalabilidad y usar Azure Functions para procesamiento serverless.