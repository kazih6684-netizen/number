import React from 'react';
import { motion } from 'motion/react';
import { AppSettings } from '../types';

interface PaymentPosterProps {
  settings?: AppSettings;
}

const PaymentPoster: React.FC<PaymentPosterProps> = ({ settings }) => {
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
      accent: '#F34F22'
    },
    { 
      name: 'Rocket', 
      number: '013397-869094', 
      logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png',
      accent: '#8C3494'
    },
    { 
      name: 'mCash', 
      number: '013397-869095', 
      logo: 'https://seeklogo.com/images/I/islami-bank-mcash-logo-4E3E5B5B5E-seeklogo.com.png',
      accent: '#00A2E8'
    },
    { 
      name: 'Upay', 
      number: '013397-86909', 
      logo: 'https://seeklogo.com/images/U/upay-logo-8A1A2B5E5B-seeklogo.com.png',
      accent: '#FFBE00'
    }
  ];

  return (
    <div className="w-full h-full flex items-start justify-center p-2 pt-12 md:pt-20">
      <div className="w-full h-full max-w-[1400px] bg-[#05070a] rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,1)] border-[1px] border-white/5 relative overflow-hidden flex flex-col select-none">
        
        {/* Futuristic Background elements */}
        <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />

        {/* Header Area */}
        <div className="relative pt-6 pb-2 px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-1">
               <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-blue-500" />
               <div className="w-8 h-8 rounded-lg border-2 border-blue-500 flex items-center justify-center bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 <div className="w-4 h-4 border-2 border-white/80 rounded-sm" />
               </div>
               <div className="h-[2px] w-12 bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500" />
            </div>

            <h1 className="text-3xl md:text-5xl font-[1000] tracking-[0.15em] text-white italic uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              PAYMENT <span className="text-orange-500 drop-shadow-[0_0_25px_rgba(249,115,22,0.5)]">METHODS</span>
            </h1>
            
            <div className="mt-2 flex items-center gap-4">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-orange-500" />
              <p className="text-[10px] md:text-sm font-black text-white tracking-[0.5em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                SEND MONEY & CASH IN ONLY
              </p>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-orange-500" />
            </div>
            
            <div className="mt-2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
               <span className="text-[8px] font-black text-orange-500/80 uppercase tracking-[0.6em]">Mobile Financial Services</span>
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            </div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-12 pb-6 flex flex-col gap-2 justify-center relative">
          {/* Side Atmospheric Blue Glows */}
          <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
          
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 top-1/4 w-1 h-24 bg-blue-400/20 blur-md rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-4 bottom-1/4 w-1 h-32 bg-blue-500/20 blur-md rounded-full pointer-events-none"
          />

          {/* Additional Flickering Blue Lights - More Vibrant */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                  filter: ['blur(80px)', 'blur(120px)', 'blur(80px)']
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.2
                }}
                className="absolute w-80 h-80 bg-blue-500/15 rounded-full"
                style={{
                  top: `${10 + i * 20}%`,
                  left: i % 2 === 0 ? '-15%' : '85%',
                }}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            {methods.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group relative flex items-center h-16 md:h-20"
              >
                {/* Logo Box - Angled effect */}
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
  );
};

export default PaymentPoster;

