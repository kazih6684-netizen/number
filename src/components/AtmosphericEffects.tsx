import React from 'react';
import { motion } from 'motion/react';

export default function AtmosphericEffects() {
  const stars = Array.from({ length: 120 });
  const nebulas = Array.from({ length: 4 });
  const glimmers = Array.from({ length: 20 });
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000208]">
      {/* Deep Space Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#000510_0%,#000000_100%)]" />

      {/* Cosmic Nebulas (Soft Glowing Clouds) */}
      {nebulas.map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20 + i * 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          className={`absolute w-[70vw] h-[70vw] rounded-full blur-[180px] will-change-transform ${
            i % 2 === 0 ? 'bg-blue-600/10' : 'bg-cyan-800/10'
          }`}
        />
      ))}

      {/* Static Starfield (Tiny Blue & White Stars) */}
      {stars.map((_, i) => (
        <div
          key={`star-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : 'bg-white'} shadow-[0_0_3px_white]`}
        />
      ))}

      {/* Pulsing Galactic Points (Blue Flickering dots) */}
      {glimmers.map((_, i) => (
        <motion.div
          key={`glimmer-${i}`}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh', 
            scale: 0 
          }}
          animate={{ 
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            boxShadow: ['0 0 0px #3b82f6', '0 0 15px #3b82f6', '0 0 0px #3b82f6']
          }}
          transition={{ 
            duration: Math.random() * 4 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 10 
          }}
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[0.5px] translate-z-0 will-change-transform"
        />
      ))}

      {/* Floating Space Dust Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh', 
          }}
          animate={{ 
            y: ['0vh', '-100vh'],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-[2px] h-[2px] bg-blue-400/30 rounded-full will-change-transform"
        />
      ))}

      {/* Occasional Shooting Stars */}
      {[1, 2].map((i) => (
        <motion.div
          key={`shooting-star-${i}`}
          initial={{ x: '-10%', y: Math.random() * 50 + '%', opacity: 0 }}
          animate={{ 
            x: ['0%', '150%'],
            y: [null, '+=20%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatDelay: Math.random() * 20 + 10,
            ease: "easeOut"
          }}
          className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-[-15deg] blur-[1px]"
        />
      ))}
    </div>
  );
}
