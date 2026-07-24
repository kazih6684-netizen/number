import React, { memo, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Link as LinkIcon, ChevronRight, X, CreditCard, Phone, DollarSign } from 'lucide-react';
import { AppSettings, PaymentMethod } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onPaymentAction: (type: 'received' | 'activated') => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const SettingsPanel = memo(({ 
  isOpen, 
  onClose, 
  onUpload, 
  onPaymentAction,
  settings,
  onUpdateSettings
}: SettingsPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-0 h-full w-80 bg-slate-950/80 backdrop-blur-3xl border-l border-white/10 z-[60] p-8 flex flex-col gap-8 shadow-2xl"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">System Controls</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] opacity-80">Media Asset (Poster)</h3>
          
          {settings.customPosterImage ? (
            <div className="space-y-3">
              <div className="relative group w-full h-32 bg-blue-500/5 border border-blue-500/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <img 
                  src={settings.customPosterImage} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Saved Poster"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-blue-500 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                   >
                     <Upload className="w-5 h-5" />
                   </button>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ ...settings, customPosterImage: '' })}
                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Reset to Default Poster
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-4 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 p-4 rounded-xl transition-all group text-left"
            >
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <Upload className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm text-nowrap">Upload Custom Poster</span>
                <span className="text-blue-400/30 text-[10px]">Overrides generated UI</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400/20 ml-auto" />
            </button>
          )}
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] opacity-80">Payment Config</h3>
          
          <div className="space-y-3">
            {/* Method Select */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-blue-400/40 uppercase tracking-widest pl-1">Method</label>
              <div className="flex gap-2">
                {(['Bkash', 'Nagad', 'Rocket'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => onUpdateSettings({ ...settings, paymentMethod: method })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                      settings.paymentMethod === method 
                        ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-blue-400/40 uppercase tracking-widest pl-1">Amount (Tk)</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={settings.amount}
                  onChange={(e) => onUpdateSettings({ ...settings, amount: e.target.value })}
                  className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10"
                  placeholder="600.00"
                />
              </div>
            </div>

            {/* Number Input */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-blue-400/40 uppercase tracking-widest pl-1">Sender Number</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={settings.senderNumber}
                  onChange={(e) => onUpdateSettings({ ...settings, senderNumber: e.target.value })}
                  className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 mt-2">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] opacity-80">Auto Broadcast</h3>
          <div className="flex flex-col gap-3">
            {/* Auto-Payment Toggle */}
            <button
              onClick={() => onUpdateSettings({ 
                ...settings, 
                autoPayment: { ...settings.autoPayment, enabled: !settings.autoPayment.enabled } 
              })}
              className={`w-full py-4 border rounded-2xl flex items-center justify-between px-6 group transition-all ${
                settings.autoPayment.enabled 
                  ? 'bg-blue-600/20 border-blue-400/40 shadow-[0_0_20px_rgba(30,64,175,0.2)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className={`${settings.autoPayment.enabled ? 'text-blue-300' : 'text-white/60'} font-black text-xs uppercase tracking-widest`}>
                  Auto Payment
                </span>
                <span className="text-[9px] text-blue-400/20 uppercase">Periodic Matrix</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.autoPayment.enabled ? 'bg-blue-500' : 'bg-white/10'}`}>
                <motion.div 
                  animate={{ x: settings.autoPayment.enabled ? 22 : 2 }}
                  className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </div>
            </button>

            {/* Interval Input */}
            {settings.autoPayment.enabled && (
              <div className="space-y-1.5 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <label className="text-[9px] text-blue-400/40 uppercase tracking-widest pl-1">Interval (Minutes)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={settings.autoPayment.intervalMinutes}
                    onChange={(e) => onUpdateSettings({ 
                      ...settings, 
                      autoPayment: { ...settings.autoPayment, intervalMinutes: parseInt(e.target.value) } 
                    })}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="text-white font-black text-xs w-6">{settings.autoPayment.intervalMinutes}m</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4 mt-2">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] opacity-80">Actions & Display</h3>
          <div className="flex flex-col gap-3">
            {/* Timer Toggle */}
            <button
              onClick={() => onUpdateSettings({ ...settings, isTimerActive: !settings.isTimerActive })}
              className={`w-full py-4 border rounded-2xl flex items-center justify-between px-6 group transition-all ${
                settings.isTimerActive 
                  ? 'bg-blue-500/10 border-blue-500/40' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className={`${settings.isTimerActive ? 'text-blue-400' : 'text-white/60'} font-black text-xs uppercase tracking-widest`}>
                  Session Timer
                </span>
                <span className="text-[9px] text-blue-400/20 uppercase">HUD Sync</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.isTimerActive ? 'bg-blue-500' : 'bg-white/10'}`}>
                <motion.div 
                  animate={{ x: settings.isTimerActive ? 22 : 2 }}
                  className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </div>
            </button>

            {/* Intelligence Stream Toggle */}
            <button
              onClick={() => onUpdateSettings({ ...settings, showLiveIntelligence: !settings.showLiveIntelligence })}
              className={`w-full py-4 border rounded-2xl flex items-center justify-between px-6 group transition-all ${
                settings.showLiveIntelligence 
                  ? 'bg-cyan-500/10 border-cyan-500/40' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className={`${settings.showLiveIntelligence ? 'text-cyan-400' : 'text-white/60'} font-black text-xs uppercase tracking-widest`}>
                  Intelligence Stream
                </span>
                <span className="text-[9px] text-cyan-400/20 uppercase">Data Matrix</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.showLiveIntelligence ? 'bg-cyan-500' : 'bg-white/10'}`}>
                <motion.div 
                  animate={{ x: settings.showLiveIntelligence ? 22 : 2 }}
                  className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </div>
            </button>

            <button
              onClick={() => onPaymentAction('received')}
              className="w-full py-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl flex items-center justify-center gap-3 group transition-all"
            >
              <span className="text-blue-400 font-black text-xs uppercase tracking-widest">Publish Payment</span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onPaymentAction('activated')}
              className="w-full py-4 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 rounded-2xl flex items-center justify-center gap-3 group transition-all"
            >
              <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">Activate ID</span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <section className="space-y-4 mt-2 pb-20">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] opacity-80">Poster Config</h3>
          <div className="flex flex-col gap-4">
            {settings.paymentMethods.map((method, idx) => (
              <div key={idx} className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Method {idx + 1}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: method.color }} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[8px] text-blue-400/40 uppercase tracking-widest pl-1">Name</label>
                  <input
                    type="text"
                    value={method.name}
                    onChange={(e) => {
                      const newMethods = [...settings.paymentMethods];
                      newMethods[idx] = { ...method, name: e.target.value };
                      onUpdateSettings({ ...settings, paymentMethods: newMethods });
                    }}
                    className="w-full bg-[#05070A] border border-blue-500/10 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] text-blue-400/40 uppercase tracking-widest pl-1">Number</label>
                  <input
                    type="text"
                    value={method.number}
                    onChange={(e) => {
                      const newMethods = [...settings.paymentMethods];
                      newMethods[idx] = { ...method, number: e.target.value };
                      onUpdateSettings({ ...settings, paymentMethods: newMethods });
                    }}
                    className="w-full bg-[#05070A] border border-blue-500/10 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between pl-1">
                    <label className="text-[8px] text-blue-400/40 uppercase tracking-widest">Logo Configuration</label>
                  </div>
                  
                  <div 
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: any) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (re) => {
                            const base64 = re.target?.result as string;
                            const newMethods = [...settings.paymentMethods];
                            newMethods[idx] = { ...method, logo: base64 };
                            onUpdateSettings({ ...settings, paymentMethods: newMethods });
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                    className="w-full h-24 bg-[#05070A] border-2 border-dashed border-blue-500/20 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group overflow-hidden relative"
                  >
                    {method.logo ? (
                      <>
                        <img src={method.logo} className="h-full w-full object-contain p-4 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-blue-500/40 group-hover:text-blue-500" />
                        <span className="text-[10px] text-blue-500/40 font-bold uppercase tracking-widest group-hover:text-blue-500">Upload Logo</span>
                      </>
                    )}
                  </div>

                  <input
                    type="text"
                    value={method.logo}
                    onChange={(e) => {
                      const newMethods = [...settings.paymentMethods];
                      newMethods[idx] = { ...method, logo: e.target.value };
                      onUpdateSettings({ ...settings, paymentMethods: newMethods });
                    }}
                    placeholder="Or paste image URL"
                    className="w-full bg-[#05070A] border border-blue-500/10 rounded-lg py-1 px-3 text-[10px] text-white/40 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
});

export default SettingsPanel;
