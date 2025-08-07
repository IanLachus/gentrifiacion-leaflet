import React from "react";
import "./SeccionVideos.css"; // Asegúrate de tener estilos para el grid

const VIDEOS = [
  {
    titulo: "La cruda realidad de la gentrificación",
    url: "https://www.youtube.com/embed/nqIQm9AYHE4?si=UFsjRlEMQG41W-ZE"
  },
  {
    titulo: "Costa Rica: El paraíso vendido a los millonarios",
    url: "https://www.youtube.com/embed/BW1lDJzRyLA?si=wlpSjzxfe-mcVUQq"
  },
  {
    titulo: "Gentrificación en Costa Rica ¿Qué está pasando?",
    url: "https://www.youtube.com/embed/-1gxl3KXQ_s?si=yGMWokz5n58TNy1Q"
  },
  {
    titulo: "¿Playas privadas en Costa rica?",
    url: "https://www.youtube.com/embed/Pmem3bXt4fk?si=ZATsC-swGsjMtfQH"
  },
  {
    titulo: "¿Quién gana y quién pierde con la gentrificación?",
    url: "https://www.youtube.com/embed/BW1lDJzRyLA?si=wlpSjzxfe-mcVUQq"
  },
  {
    titulo: "¿Qué es la gentrificación?",
    url: "https://www.youtube.com/embed/vlS_VZGPvC0?si=WOugZSrCBWRhzT9c"
  },
  {
    titulo: "Costa Rica NO ES como todos creen",
    url: "https://www.youtube.com/embed/_tgl-oAVQ4Q?si=BomVtq-EbJ7QcN7U"
  },
  {
    titulo: "Cosas que no sabía de la gentrificación",
    url: "https://www.youtube.com/embed/gvLZaBoXeOs?si=M9YxheI8Vj-lSFJe"
  }
];

export default function SeccionVideos() {
  return (
    <div className="videos-section">
      <div className="videos-grid">
        {VIDEOS.map((video, idx) => (
          <div key={idx} className="video-card">
            <h2 className="video-title">{video.titulo}</h2>
            <div className="video-iframe-wrapper">
              <iframe
                width="100%"
                height="260"
                src={video.url}
                title={video.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}