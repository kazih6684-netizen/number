import React, { memo } from 'react';
import { motion } from 'motion/react';
import { AppSettings } from '../types';

interface PaymentPosterProps {
  settings?: AppSettings;
}

const PaymentPoster = memo(({ settings }: PaymentPosterProps) => {
  const methods = settings?.paymentMethods || [
    { 
      name: 'bKash', 
      number: '017230-46648', 
      logo: 'https://seeklogo.com/images/B/bkash-logo-0C1572FBB0-seeklogo.com.png',
      accent: '#E2136E'
    },
    { 
      name: 'Nagad', 
      number: '013397-86909', 
      logo: 'https://seeklogo.com/images/N/nagad-logo-7A70CC6604-seeklogo.com.png',
      accent: '#F26122'
    },
    { 
      name: 'Rocket', 
      number: '01XXXXXXXXX', 
      logo: 'https://seeklogo.com/images/R/rocket-logo-5E00C54784-seeklogo.com.png',
      accent: '#8C3494'
    }
  ];

  return (
    <div className="w-full h-full p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl aspect-[16/9] bg-[#000205] rounded-[48px] overflow-hidden border-[6px] border-white/5 shadow-[0_0_150px_rgba(0,0,0,1),inset_0_0_80px_rgba(59,130,246,0.1)] relative group">
        {/* Holographic HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl" />
          <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-blue-500/30 rounded-tr-3xl" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-blue-500/30 rounded-bl-3xl" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl" />
        </div>

        {/* Pulsing Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

        <div className="relative h-full flex flex-col">
          {/* Header Section */}
          <div className="pt-12 pb-8 px-16 flex items-center justify-between relative z-20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-8 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                 <h1 className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter uppercase italic">
                   Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Methods</span>
                 </h1>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-[0.5em] pl-6">Secured Transaction Matrix</span>
                <div className="flex-1 h-[1px] bg-blue-500/20 min-w-[100px]" />
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2">
               <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-xl">
                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-sm font-black text-blue-200 uppercase tracking-widest">Live Node Active</span>
               </div>
               <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Protocol Version 8.1.0_TX</span>
            </div>
          </div>

          {/* Main Methods Content */}
          <div className="flex-1 px-16 flex flex-col justify-center gap-6 md:gap-10 pb-16 relative z-20">
            {methods.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.2, duration: 0.8, ease: "easeOut" }}
                className="group flex items-center h-20 md:h-32 relative"
              >
                {/* Method Logo Box - Clean White */}
                <div 
                  className="w-32 md:w-44 h-full bg-gradient-to-br from-white via-gray-200 to-gray-300 rounded-l-2xl flex items-center justify-center p-4 relative flex-shrink-0 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.3)]"
                  style={{
                    clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)'
                  }}
                >
                   <img 
                    src={m.logo} 
                    alt={m.name} 
                    className="max-w-[85%] max-h-[85%] object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]" 
                   />
                   
                   {/* Small accent arrow */}
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-4 border-r-4 border-t-4 border-orange-500 rotate-45 opacity-60" />
                </div>

                {/* Number Box - Intense Amber Glow */}
                <div className="flex-1 h-full -ml-4 relative">
                  <div className="h-full bg-[#05070a] border-[3px] border-orange-500 rounded-2xl flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_30px_rgba(249,115,22,0.4)] group-hover:border-orange-400 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all relative overflow-hidden">
                    {/* Glowing glass overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
                    
                    <span className="text-2xl md:text-5xl font-[1000] text-white tracking-[0.15em] font-mono drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] whitespace-nowrap">
                      {m.number}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reflection Shine overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
          
          {/* Interactive Bottom Bar */}
          <div className="bg-black/40 backdrop-blur-md border-t border-white/10 py-3 px-12 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/20 rounded border border-blue-500/40 flex items-center justify-center">
                     <div className="w-2 h-2 bg-blue-500 rounded-sm animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Unity Earning Core Node</span>
                    <span className="text-[7px] font-bold text-orange-500 uppercase tracking-[0.3em]">Verified Gateway 2.0.4</span>
                  </div>
               </div>
             </div>
             <div className="flex gap-6 items-center">
               <div className="flex gap-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                 ))}
               </div>
               <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">System Online</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PaymentPoster;
