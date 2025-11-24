"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// JUET Guna coordinates
const JUET_GUNA: [number, number] = [24.6475, 77.3103];

// Create custom JUET marker
const createJUETMarker = () =>
  L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translateY(-100%);">
        
        <div class="pulse-ring" style="
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
        "></div>

        <div style="
          position: relative;
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-top: 30px solid #3b82f6;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        "></div>

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
          border: 2px solid white;
          transform: translateX(-50%);
          left: 50%;
          box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        ">🎓 JUET</div>
      </div>
    `,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
  });

export default function MapComponent() {
  const [mapType, setMapType] = useState<"satellite" | "street">("satellite");
  const [mounted, setMounted] = useState(false);

  const MAPPLS_KEY = process.env.NEXT_PUBLIC_MAPPLS_KEY || "";
  const hasKey = MAPPLS_KEY !== "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-300">Loading map...</div>
      </div>
    );
  }

  // Mappls tile URLs
  const MAPPLS_STREET = `https://apis.mappls.com/advancedmaps/v1/${MAPPLS_KEY}/tile/map/{z}/{x}/{y}.png`;
  const MAPPLS_SAT = `https://apis.mappls.com/advancedmaps/v1/${MAPPLS_KEY}/tile/hybrid/{z}/{x}/{y}.png`;

  const OSM_STREET = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const customIcon = createJUETMarker();

  return (
    <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
      
      {/* Map Type Toggle */}
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <button
          onClick={() => setMapType("satellite")}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
            mapType === "satellite"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white/20 text-gray-200"
          }`}
        >
          🛰️ Satellite
        </button>

        <button
          onClick={() => setMapType("street")}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
            mapType === "street"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white/20 text-gray-200"
          }`}
        >
          🗺️ Street
        </button>
      </div>

      <MapContainer
        center={JUET_GUNA}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
        key={mapType + hasKey}
      >
        {hasKey ? (
          <TileLayer
            url={mapType === "satellite" ? MAPPLS_SAT : MAPPLS_STREET}
            maxZoom={20}
            minZoom={2}
            attribution='&copy; <a href="https://www.mappls.com/">Mappls</a>'
          />
        ) : (
          <TileLayer url={OSM_STREET} />
        )}

        <Marker icon={customIcon} position={JUET_GUNA}>
          <Popup>
            <div className="text-center" style={{ color: "white" }}>
              <h3 className="text-lg font-bold mb-2">
                Jaypee University of Engineering and Technology
              </h3>
              <p>📍 Guna, Madhya Pradesh, India</p>
              <p>🏛️ CIRD - Centre for Industrial Research & Development</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
