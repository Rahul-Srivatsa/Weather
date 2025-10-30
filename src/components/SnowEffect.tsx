import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
        size: 3 + Math.random() * 8,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white/90 shadow-lg shadow-white/50 animate-snow-fall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            filter: `blur(${flake.size > 6 ? 1 : 0}px)`,
          }}
        />
      ))}
    </div>
  );
};
