import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer as TimerIcon } from 'lucide-react';

interface CountdownTimerProps {
  isActive: boolean;
}

export default function CountdownTimer({ isActive }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isActive) {
      setTimeLeft(3600); // Reset if deactivated
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  if (!isActive) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex items-center gap-6 px-7 py-4 bg-[#05070A]/90 backdrop-blur-3xl rounded-[2.5rem] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3),0_25px_60px_rgba(0,0,0,0.8)] group cursor-grab active:cursor-grabbing z-[200] relative overflow-hidden"
    >
      {/* HUD Holographic Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] bg-[size:4px_4px] pointer-events-none" />
      
      {/* HUD Scanner Effect */}
      <motion.div 
        animate={{ y: ['-100%', '300%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent pointer-events-none"
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className="relative flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
            timeLeft < 300 ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]'
          }`} />
          <motion.div 
            animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute inset-0 rounded-full blur-md ${
              timeLeft < 300 ? 'bg-red-500' : 'bg-cyan-400'
            }`}
          />
          {/* Orbital Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-blue-500/10 rounded-full border-t-blue-500/40"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em] leading-none mb-1">Session Node</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-500/40" />
            <span className="text-[7.5px] text-blue-500/60 uppercase font-bold tracking-[0.15em]">Secure Matrix Link</span>
          </div>
        </div>
      </div>

      <div className="w-[1.5px] h-8 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent relative z-10" />

      <div className="relative z-10 pl-2">
        <div className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
           <span className="text-[7px] font-black text-blue-400 uppercase tracking-widest">Active</span>
        </div>
        <span className={`text-2xl font-mono font-black tabular-nums tracking-[0.2em] drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] ${
          timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'
        }`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/20 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/20 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/20 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/20 rounded-br-xl" />
      
      {/* Drag Indicator */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-20 group-hover:opacity-60 transition-opacity">
        <div className="w-1 h-1 rounded-full bg-blue-400" />
        <div className="w-1 h-1 rounded-full bg-blue-400" />
        <div className="w-1 h-1 rounded-full bg-blue-400" />
      </div>
    </motion.div>
  );
}
