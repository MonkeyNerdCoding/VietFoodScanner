import { useEffect, useState } from 'react';

/**
 * Fireworks Component
 * Creates a celebratory firework effect from both sides of the screen
 */
function Fireworks({ trigger }) {
  const [particles, setParticles] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      createFireworks();
      setShow(true);
      
      // Hide after animation completes
      const timeout = setTimeout(() => {
        setShow(false);
        setParticles([]);
      }, 4000);
      
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  const createFireworks = () => {
    const newParticles = [];
    const colors = [
      '#E23744', // Pho red
      '#2D5A27', // Herb green
      '#FFD700', // Gold
      '#FF6B6B', // Coral
      '#4ECDC4', // Teal
      '#FFE66D', // Yellow
      '#95E1D3', // Mint
      '#F38181', // Pink
      '#A855F7', // Purple
      '#3B82F6', // Blue
    ];

    // Create particles from left side
    for (let i = 0; i < 25; i++) {
      const angle = (Math.random() * 60 - 30 + 45) * (Math.PI / 180); // 15-75 degrees
      const speed = Math.random() * 300 + 150;
      newParticles.push({
        id: `left-${i}`,
        startX: 0,
        startY: Math.random() * 40 + 30, // 30-70% from top
        endX: Math.cos(angle) * speed,
        endY: -Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6,
        delay: Math.random() * 0.6,
        duration: Math.random() * 1 + 1.5,
        type: Math.random() > 0.3 ? 'circle' : 'star',
      });
    }

    // Create particles from right side
    for (let i = 0; i < 25; i++) {
      const angle = (Math.random() * 60 - 30 + 135) * (Math.PI / 180); // 105-165 degrees
      const speed = Math.random() * 300 + 150;
      newParticles.push({
        id: `right-${i}`,
        startX: 100,
        startY: Math.random() * 40 + 30,
        endX: Math.cos(angle) * speed,
        endY: -Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6,
        delay: Math.random() * 0.6,
        duration: Math.random() * 1 + 1.5,
        type: Math.random() > 0.3 ? 'circle' : 'star',
      });
    }

    setParticles(newParticles);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Particle explosions */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            animation: `particle-fly ${particle.duration}s ease-out ${particle.delay}s forwards`,
            '--end-x': `${particle.endX}px`,
            '--end-y': `${particle.endY}px`,
          }}
        >
          {particle.type === 'circle' ? (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size}px ${particle.color}, 0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          ) : (
            <svg
              width={particle.size * 1.5}
              height={particle.size * 1.5}
              viewBox="0 0 24 24"
              fill={particle.color}
              style={{
                filter: `drop-shadow(0 0 ${particle.size / 2}px ${particle.color})`,
              }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </div>
      ))}
      
      {/* Emoji confetti falling from top */}
      {['🎉', '🎊', '✨', '🌟', '🍜', '🥢', '🔥', '💯', '🎆', '🎇'].map((emoji, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-3xl"
          style={{
            left: `${5 + i * 10}%`,
            top: '-5%',
            animation: `emoji-fall 3.5s ease-in ${i * 0.12}s forwards`,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Extra sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute text-xl"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 60 + 20}%`,
            animation: `sparkle ${0.5 + Math.random() * 0.5}s ease-in-out ${Math.random() * 1}s infinite`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

export default Fireworks;

