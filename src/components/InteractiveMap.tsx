import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, MapPin as MapPinIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MapPinData {
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
  pins: MapPinData[];
  variant?: "light" | "dark";
  className?: string;
}

const InteractiveMap = ({ pins, variant = "dark", className = "" }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activePin, setActivePin] = useState<MapPinData | null>(null);
  const nigeriaCenter: [number, number] = [8.5, 4.5];
  const defaultZoom = 7;

  const tileUrl = variant === "dark"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: nigeriaCenter,
      zoom: defaultZoom,
      scrollWheelZoom: true,
      zoomControl: false,
    });

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add markers
    pins.forEach((pin) => {
      const icon = L.divIcon({
        className: "custom-map-marker",
        html: `<div style="
          width: 16px; height: 16px;
          background: hsl(160, 50%, 38%);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
      marker.on("click", () => {
        setActivePin((prev) => (prev?.id === pin.id ? null : pin));
        map.flyTo([pin.lat, pin.lng], 10, { duration: 0.8 });
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleClose = () => {
    setActivePin(null);
    mapInstanceRef.current?.flyTo(nigeriaCenter, defaultZoom, { duration: 0.8 });
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-border ${className}`}>
      <div ref={mapRef} className="w-full h-[450px] sm:h-[550px] lg:h-[600px]" />

      {/* Detail Panel */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="absolute top-0 left-0 bottom-0 w-full sm:w-[340px] z-[1000] bg-background border-r border-border shadow-2xl overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            {activePin.imageUrl && (
              <div className="w-full h-48 overflow-hidden">
                <img src={activePin.imageUrl} alt={activePin.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-1">{activePin.title}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPinIcon className="w-3.5 h-3.5" />
                <span>{activePin.state}</span>
              </div>

              <div className="h-px bg-border mb-4" />

              <div className="text-center mb-4">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Men Screened</p>
                <p className="text-3xl font-bold text-primary">{activePin.detail}</p>
              </div>

              <div className="h-px bg-border mb-4" />

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
