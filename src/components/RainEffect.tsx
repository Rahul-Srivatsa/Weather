import { useEffect, useState } from "react";

interface Raindrop {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export const RainEffect = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const drops: Raindrop[] = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        duration: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 2,
        size: 1.5 + Math.random() * 2.5,
      });
    }
    setRaindrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 bg-gradient-to-b from-white/70 to-transparent animate-rain-fall"
          style={{
            left: `${drop.left}%`,
            height: `${drop.size * 40}px`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            filter: `blur(${Math.random() * 0.5}px)`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
    </div>
  );
};
