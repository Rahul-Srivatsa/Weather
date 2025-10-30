import { useEffect, useState } from "react";

interface Raindrop {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export const ThunderstormEffect = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    const drops: Raindrop[] = [];
    for (let i = 0; i < 120; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        duration: 0.4 + Math.random() * 0.8,
        delay: Math.random() * 2,
        size: 1.5 + Math.random() * 2.5,
      });
    }
    setRaindrops(drops);

    const triggerLightning = () => {
      setLightning(true);
      setTimeout(() => setLightning(false), 150);
      
      // Double flash
      setTimeout(() => {
        setLightning(true);
        setTimeout(() => setLightning(false), 100);
      }, 300);
    };

    const interval = setInterval(triggerLightning, 4000 + Math.random() * 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 bg-gradient-to-b from-white to-transparent animate-rain-fall"
            style={{
              left: `${drop.left}%`,
              height: `${drop.size * 45}px`,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>
      {lightning && (
        <>
          <div className="fixed inset-0 bg-white/40 z-10 pointer-events-none animate-lightning" />
          <div className="fixed inset-0 bg-blue-200/20 z-10 pointer-events-none animate-lightning" style={{ animationDelay: '0.05s' }} />
        </>
      )}
    </>
  );
};
