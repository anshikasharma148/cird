"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// JUET Guna coordinates
const JUET_GUNA: [number, number] = [24.6475, 77.3103];

// Fix default marker icons in Leaflet (required when using react-leaflet)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Tile options: OpenStreetMap (works without API key, looks normal)
const TILE_LAYERS = {
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    label: "Street",
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    label: "Light",
  },
};

export default function MapComponent() {
  const [mapType, setMapType] = useState<keyof typeof TILE_LAYERS>("street");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const style = document.createElement("style");
    style.id = "leaflet-popup-styles";
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: linear-gradient(135deg, #1A237E, #283593) !important;
        color: white !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        padding: 0 !important;
      }
      .leaflet-popup-content {
        margin: 16px !important;
        color: white !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      .leaflet-popup-content p { color: white !important; margin: 6px 0 !important; }
      .leaflet-popup-content h3 { color: white !important; margin-bottom: 8px !important; }
      .leaflet-popup-tip { background: #1A237E !important; }
      .leaflet-popup-close-button { color: white !important; font-size: 22px !important; padding: 6px !important; }
      .leaflet-popup-close-button:hover { color: #FF9800 !important; }
    `;
    if (!document.getElementById("leaflet-popup-styles")) {
      document.head.appendChild(style);
    }
    return () => {
      const existing = document.getElementById("leaflet-popup-styles");
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-100 rounded-lg flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading map...</div>
      </div>
    );
  }

  const layer = TILE_LAYERS[mapType];

  return (
    <div className="relative w-full h-full" style={{ minHeight: "400px" }}>
      <div className="absolute top-3 right-3 z-[1000] flex gap-2">
        {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMapType(key)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              mapType === key
                ? "bg-[#1A237E] text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {TILE_LAYERS[key].label}
          </button>
        ))}
      </div>

      <MapContainer
        center={JUET_GUNA}
        zoom={15}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", borderRadius: "0 0 8px 8px" }}
        className="rounded-b-lg"
      >
        <TileLayer
          url={layer.url}
          attribution={layer.attribution}
          maxZoom={19}
          minZoom={2}
        />
        <Marker position={JUET_GUNA}>
          <Popup>
            <div className="text-center text-white p-1 min-w-[200px]">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-base mb-2">Jaypee University of Engineering and Technology</h3>
              <p className="text-sm my-1">📍 Guna, Madhya Pradesh, India</p>
              <p className="text-sm my-1">🏛️ CIRD - Centre for Industrial Research & Development</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
