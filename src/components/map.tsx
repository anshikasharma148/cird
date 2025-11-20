"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// JUET Guna coordinates
const JUET_GUNA_COORDS: [number, number] = [24.6475, 77.3103];

// Create custom marker with JUET text
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(-100%);
      ">
        <!-- Pulse animation ring -->
        <div class="pulse-ring" style="
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
        
        <!-- Marker pin -->
        <div style="
          position: relative;
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-top: 30px solid #3b82f6;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        "></div>
        
        <!-- JUET Label -->
        <div style="
          position: absolute;
          top: -50px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          border: 2px solid white;
          transform: translateX(-50%);
          left: 50%;
        ">
          🎓 JUET
        </div>
      </div>
    `,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
  });
};

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add custom styles for the map
    const style = document.createElement("style");
    style.id = "leaflet-custom-styles";
    style.textContent = `
      .leaflet-container {
        background: #1e293b !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        height: 100% !important;
        width: 100% !important;
      }
      .leaflet-popup-content-wrapper {
        background: linear-gradient(135deg, #1e40af, #3b82f6) !important;
        color: white !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
      }
      .leaflet-popup-content {
        margin: 20px !important;
        color: white !important;
      }
      .leaflet-popup-tip {
        background: #3b82f6 !important;
      }
      .leaflet-control-zoom a {
        background: rgba(30, 41, 59, 0.9) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px);
      }
      .leaflet-control-zoom a:hover {
        background: rgba(59, 130, 246, 0.9) !important;
      }
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      .pulse-ring {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    
    if (!document.getElementById("leaflet-custom-styles")) {
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById("leaflet-custom-styles");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  const customIcon = createCustomIcon();

  return (
    <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none z-10 rounded-lg" />
      
      <MapContainer
        center={JUET_GUNA_COORDS}
        zoom={15}
        style={{ height: "100%", width: "100%", minHeight: "500px", zIndex: 0 }}
        scrollWheelZoom={true}
        className="rounded-lg"
        key="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" style="color: #3b82f6;">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={JUET_GUNA_COORDS} icon={customIcon}>
          <Popup>
            <div className="text-center" style={{ color: "white" }}>
              <div className="mb-3">
                <div className="text-2xl mb-2">🎓</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "white" }}>
                  Jaypee University of Engineering and Technology
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm opacity-90">📍 Guna, Madhya Pradesh, India</p>
                <p className="text-sm opacity-90">🏛️ Centre of Industrial Research and Development (CIRD)</p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

