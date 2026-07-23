import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Shield, Globe, Cpu, Users, UserCheck, Mic } from 'lucide-react';

interface RightSidebarProps {
  enabled: boolean;
  metrics: {
    meetingCount: number;
    activeIds: number;
    unmutedCount: number;
  };
}

export default function RightSidebar({ enabled, metrics }: RightSidebarProps) {
  if (!enabled) {
    return (
      <div className="w-12 bg-blue-900/5 border-l border-blue-500/10 flex flex-col items-center py-10 gap-8 hidden xl:flex">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-64 bg-blue-900/10 border-l border-blue-500/20 relative overflow-hidden hidden xl:flex flex-col">
      {/* Holographic Sidebar Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-20" />
      
      {/* Glossy Edge Highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent z-30" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#000205] via-blue-900/5 to-[#000205] z-10 pointer-events-none" />
      
      <div className="relative z-30 p-4 flex items-center gap-3 border-b border-blue-500/20 bg-[#000205]/90 backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="relative p-2 bg-blue-500/30 rounded-xl border border-blue-400/50">
          <Activity className="w-4 h-4 text-blue-200" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em]">Intelligence</span>
          <span className="text-[7px] text-blue-400/60 uppercase tracking-[0.2em] font-bold">Network Status</span>
        </div>
      </div>

      <div className="flex-1 relative z-20 overflow-hidden">
        {/* Continuous Scrolling Container */}
        <motion.div 
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="p-4 space-y-6 will-change-transform"
        >
          {/* Repeating Content for Infinite Scroll Effect */}
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="space-y-6">
              {/* Meeting Metrics */}
              <div className="space-y-4">
                <MetricItem 
                  icon={<Users className="w-3 h-3" />} 
                  label="Meeting Participants" 
                  value={metrics.meetingCount.toString()} 
                  status={`${Math.floor(metrics.meetingCount / 55 * 100)}% Capacity`}
                  color="text-blue-400"
                />
                <MetricItem 
                  icon={<UserCheck className="w-3 h-3" />} 
                  label="Active Host IDs" 
                  value={metrics.activeIds.toString()} 
                  status="Increasing"
                  color="text-emerald-400"
                />
                <MetricItem 
                  icon={<Mic className="w-3 h-3" />} 
                  label="Mics Unmuted" 
                  value={metrics.unmutedCount.toString()} 
                  status="Active Stream"
                  color="text-cyan-400"
                />
              </div>

              {/* Security Metrics */}
              <div className="space-y-4">
                <MetricItem 
                  icon={<Shield className="w-3 h-3" />} 
                  label="Firewall Filter" 
                  value="100.0%" 
                  status="Hardened"
                  color="text-indigo-400"
                />
                <MetricItem 
                  icon={<Cpu className="w-3 h-3" />} 
                  label="Matrix Core" 
                  value="1.2ms" 
                  status="Low Latency"
                  color="text-amber-400"
                />
              </div>

              {/* Dynamic Traffic Log */}
              <div className="space-y-3">
                <h3 className="text-[9px] font-black text-blue-400/40 uppercase tracking-[0.3em] pl-1">Protocol Stream</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-blue-500/5 border border-blue-500/10 p-2.5 rounded-xl flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] text-blue-300/80 font-bold uppercase tracking-widest">Node_{groupIdx}_{i}</span>
                        <span className="text-[7px] text-emerald-400 font-mono">LIVE</span>
                      </div>
                      <div className="w-full h-[1px] bg-blue-500/10" />
                      <span className="text-[7px] font-mono text-blue-400/40 truncate">MTX_LINK_STABLE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MetricItem({ icon, label, value, status, color }: any) {
  return (
    <div className="bg-blue-900/10 border border-blue-500/10 p-3 rounded-2xl flex flex-col gap-2 relative group hover:border-blue-400/30 transition-all">
      <div className="flex items-center justify-between">
        <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-300">
          {icon}
        </div>
        <span className={`text-[8px] font-black uppercase tracking-widest ${color}`}>{status}</span>
      </div>
      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          <motion.span 
            key={value}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[14px] font-black text-white"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className="text-[8px] text-blue-400/40 uppercase font-bold tracking-widest">{label}</span>
      </div>
    </div>
  );
}
