import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

export const SunEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 3,
        size: 2 + Math.random() * 4,
      });
    }
    setParticles(particleArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Sun rays */}
      <div className="absolute top-10 right-10 w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-yellow-300/40 blur-3xl animate-pulse-glow" />
        <div className="absolute inset-0 rounded-full bg-yellow-200/30 blur-2xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-32 bg-gradient-to-b from-yellow-200/40 to-transparent origin-top animate-sun-ray"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-yellow-200/60 shadow-lg shadow-yellow-200/30 animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
