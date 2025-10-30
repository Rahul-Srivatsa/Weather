import { useEffect, useState } from "react";

interface Cloud {
  id: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

export const CloudEffect = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const cloudArray: Cloud[] = [];
    for (let i = 0; i < 8; i++) {
      cloudArray.push({
        id: i,
        top: Math.random() * 70,
        duration: 25 + Math.random() * 20,
        delay: Math.random() * 8,
        size: 100 + Math.random() * 150,
      });
    }
    setClouds(cloudArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-cloud-drift"
          style={{
            top: `${cloud.top}%`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <div 
            className="rounded-full bg-white/25 blur-2xl"
            style={{
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.5}px`,
            }}
          />
          <div 
            className="absolute -top-2 left-1/4 rounded-full bg-white/20 blur-xl"
            style={{
              width: `${cloud.size * 0.7}px`,
              height: `${cloud.size * 0.4}px`,
            }}
          />
          <div 
            className="absolute -top-3 right-1/4 rounded-full bg-white/15 blur-xl"
            style={{
              width: `${cloud.size * 0.6}px`,
              height: `${cloud.size * 0.35}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
