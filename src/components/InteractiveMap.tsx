import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, MapPin, Users, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MapPin {
  id: number;
  state: string;
  title: string;
  detail: string;
  lat: number;
  lng: number;
  date?: string;
  imageUrl?: string;
}

interface InteractiveMapProps {
  pins: MapPin[];
  variant?: "light" | "dark";
  className?: string;
}

// Custom marker icon
const createCustomIcon = (isActive: boolean) =>
  L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      width: ${isActive ? "20px" : "14px"};
      height: ${isActive ? "20px" : "14px"};
      background: hsl(160, 50%, 38%);
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
      cursor: pointer;
    "></div>`,
    iconSize: [isActive ? 20 : 14, isActive ? 20 : 14],
    iconAnchor: [isActive ? 10 : 7, isActive ? 10 : 7],
  });

// Component to fly to a pin when selected
function FlyToPin({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 10, { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
}

// Component to reset view
function ResetView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

const InteractiveMap = ({ pins, variant = "dark", className = "" }: InteractiveMapProps) => {
  const [activePin, setActivePin] = useState<MapPin | null>(null);
  const nigeriaCenter: [number, number] = [8.5, 4.5];
  const defaultZoom = 6.5;

  const tileUrl = variant === "dark"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-border ${className}`}>
      {/* Map */}
      <div className="w-full h-[450px] sm:h-[550px] lg:h-[600px]">
        <MapContainer
          center={nigeriaCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
          attributionControl={true}
        >
          <TileLayer url={tileUrl} attribution={tileAttribution} />

          {activePin ? (
            <FlyToPin lat={activePin.lat} lng={activePin.lng} />
          ) : (
            <ResetView center={nigeriaCenter} zoom={defaultZoom} />
          )}

          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createCustomIcon(activePin?.id === pin.id)}
              eventHandlers={{
                click: () => setActivePin(activePin?.id === pin.id ? null : pin),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Detail Panel - slides in from left like charity:water */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="absolute top-0 left-0 bottom-0 w-full sm:w-[340px] z-[1000] bg-background border-r border-border shadow-2xl overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setActivePin(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            {/* Image */}
            {activePin.imageUrl && (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={activePin.imageUrl}
                  alt={activePin.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-1">
                {activePin.title}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePin.state}</span>
              </div>

              <div className="h-px bg-border mb-4" />

              {/* Stats */}
              <div className="text-center mb-4">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                  Men Screened
                </p>
                <p className="text-3xl font-bold text-primary">{activePin.detail}</p>
              </div>

              <div className="h-px bg-border mb-4" />

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 text-center">
                {activePin.date && (
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Date</p>
                    <p className="text-sm font-medium text-foreground">{activePin.date}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Location</p>
                  <p className="text-sm font-medium text-foreground">{activePin.state}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;
