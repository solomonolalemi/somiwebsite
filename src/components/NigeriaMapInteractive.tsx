import { useState } from "react";
import { MapPin } from "lucide-react";
import nigeriaMap from "@/assets/nigeria-map.svg";

interface Pin {
  id: number;
  state: string;
  title: string;
  detail: string;
  x: number;
  y: number;
}

interface NigeriaMapProps {
  pins: Pin[];
  variant?: "light" | "dark";
}

const NigeriaMapInteractive = ({ pins, variant = "dark" }: NigeriaMapProps) => {
  const [activePin, setActivePin] = useState<number | null>(null);

  const isDark = variant === "dark";

  return (
    <div className={`relative rounded-2xl border p-6 sm:p-8 overflow-hidden ${
      isDark
        ? "bg-background/5 border-background/10"
        : "bg-muted/30 border-border"
    }`}>
      <img
        src={nigeriaMap}
        alt="Map of Nigeria showing SOMI outreach locations"
        className={`w-full h-auto ${isDark ? "opacity-20 brightness-200 invert" : "opacity-15"}`}
        style={{ filter: isDark ? "invert(1) brightness(2) opacity(0.2)" : undefined }}
      />

      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute cursor-pointer group"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onMouseEnter={() => setActivePin(pin.id)}
          onMouseLeave={() => setActivePin(null)}
          onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
        >
          <div className="relative">
            <MapPin
              className="w-5 h-5 text-primary drop-shadow-lg transition-transform hover:scale-125"
              fill="hsl(160, 50%, 38%)"
            />
            <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" />
          </div>

          {activePin === pin.id && (
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 rounded-xl p-3 min-w-[200px] shadow-lg z-10 ${
              isDark
                ? "bg-foreground border border-background/20"
                : "bg-background border border-border"
            }`}>
              <p className="text-primary font-semibold text-xs mb-1">{pin.state}</p>
              <p className={`text-sm font-medium ${isDark ? "text-background" : "text-foreground"}`}>{pin.title}</p>
              <p className={`text-xs mt-1 ${isDark ? "text-background/60" : "text-muted-foreground"}`}>{pin.detail}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NigeriaMapInteractive;
