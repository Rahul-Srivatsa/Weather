import { useEffect, useState } from "react";

interface FogLayer {
  id: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FogEffect = () => {
  const [fogLayers, setFogLayers] = useState<FogLayer[]>([]);

  useEffect(() => {
    const layers: FogLayer[] = [];
    for (let i = 0; i < 7; i++) {
      layers.push({
        id: i,
        top: i * 15,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }
    setFogLayers(layers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {fogLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute w-[120%] h-40 animate-fog-drift"
          style={{
            top: `${layer.top}%`,
            opacity: layer.opacity,
            animationDuration: `${layer.duration}s`,
            animationDelay: `${layer.delay}s`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-3xl" />
        </div>
      ))}
      <div className="absolute inset-0 bg-white/5" />
    </div>
  );
};
