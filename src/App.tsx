import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Wifi, Battery, Sparkles } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, limit, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';
import SettingsPanel from './components/SettingsPanel';
import NotificationManager from './components/NotificationManager';
import CountdownTimer from './components/CountdownTimer';
import AtmosphericEffects from './components/AtmosphericEffects';
import RightSidebar from './components/RightSidebar';
import PaymentPoster from './components/PaymentPoster';
import { Notification, ViewState, AppSettings } from './types';

// Image paths from generation
const BG_IMAGE = '/src/assets/images/corporate_office_bg_1784667973671.jpg';
const POSTER_IMAGE = '/src/assets/images/payment_methods_poster_1784667989895.jpg';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('poster');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Live Firebase Firestore Notifications Sync across all devices
  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), limit(15));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Notification[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            message: data.message,
            type: data.type || 'success',
            position: data.position || (data.message?.includes('Activated') ? 'right' : 'left'),
          });
        });
        setNotifications(list);
      },
      (error) => {
        console.error('Firestore notifications subscription error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Live Firebase Firestore Settings Sync across all devices
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'global'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as AppSettings;
          setSettings((prev) => ({ ...prev, ...data }));
        }
      },
      (error) => {
        console.error('Firestore settings subscription error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const broadcastNotification = useCallback(async (message: string, type: 'success' | 'info') => {
    let position: 'left' | 'right' = 'left';
    if (message.includes('Activated')) {
      position = 'right';
    }

    try {
      await addDoc(collection(db, 'notifications'), {
        message,
        type,
        position,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Failed to add notification to Firebase:', err);
    }
  }, []);

  const removeNotification = useCallback(async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteDoc(doc(db, 'notifications', id));
    } catch (err) {
      // document might already be removed
    }
  }, []);

  const handleUpdateSettings = useCallback(async (newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      // Ensure we are saving the complete settings object including paymentMethods
      await setDoc(doc(db, 'settings', 'global'), {
        ...newSettings,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error('Failed to update settings in Firebase:', err);
    }
  }, []);

  const [settings, setSettings] = useState<AppSettings>({
    paymentMethod: 'Bkash',
    amount: '600.00',
    senderNumber: '01XXXXXXXXX',
    isTimerActive: false,
    showLiveIntelligence: true,
    autoPayment: {
      enabled: false,
      intervalMinutes: 2,
      methodPattern: 'alternating',
    },
    paymentMethods: [
      { name: 'Bkash', number: '01XXXXXXXXX', logo: 'https://seeklogo.com/images/B/bkash-logo-FBB258C90F-seeklogo.com.png', color: '#E2136E' },
      { name: 'Nagad', number: '01XXXXXXXXX', logo: 'https://seeklogo.com/images/N/nagad-logo-7A70BBDA73-seeklogo.com.png', color: '#F34F22' },
      { name: 'Rocket', number: '01XXXXXXXXX', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png', color: '#8C3494' },
      { name: 'Upay', number: '01XXXXXXXXX', logo: 'https://seeklogo.com/images/U/upay-logo-F2B8D24F3A-seeklogo.com.png', color: '#FFD700' },
      { name: 'Tap', number: '01XXXXXXXXX', logo: 'https://seeklogo.com/images/T/tap-logo-8A1C4C5C5C-seeklogo.com.png', color: '#00A1E1' },
    ],
  });

  // Dynamic Intelligence Metrics State
  const [intelMetrics, setIntelMetrics] = useState({
    meetingCount: 45,
    activeIds: 120,
    unmutedCount: 12
  });

  // Intel Metrics Update Logic
  useEffect(() => {
    if (!settings.showLiveIntelligence) return;

    const interval = setInterval(() => {
      setIntelMetrics(prev => ({
        meetingCount: Math.floor(Math.random() * (55 - 40 + 1)) + 40,
        activeIds: prev.activeIds + (Math.random() > 0.7 ? 1 : 0),
        unmutedCount: Math.floor(Math.random() * 8) + 5
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [settings.showLiveIntelligence]);

  // Auto-Payment Simulation Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let paymentCount = 0;

    if (settings.autoPayment.enabled) {
      interval = setInterval(() => {
        paymentCount++;
        
        // Pattern: 2 Bkash, 1 Nagad
        let currentMethod: 'Bkash' | 'Nagad' | 'Rocket' = 'Bkash';
        if (settings.autoPayment.methodPattern === 'alternating') {
          currentMethod = (paymentCount % 3 === 0) ? 'Nagad' : 'Bkash';
        }

        const now = new Date();
        const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const amount = (Math.floor(Math.random() * 500) + 100).toFixed(2);
        const randomPhone = `01${Math.floor(100000000 + Math.random() * 900000000)}`;

        const msg = `Payment Received. From ${randomPhone}. Amount: Tk ${amount}. Method: ${currentMethod}. at ${date} ${time}`;
        broadcastNotification(msg, 'success');

        // Optional: Auto-activate after 30 seconds
        setTimeout(() => {
          broadcastNotification(`🎉 Student ID Activated Successfully at ${time}`, 'info');
        }, 30000);

      }, settings.autoPayment.intervalMinutes * 60 * 1000);
    }

    return () => clearInterval(interval);
  }, [settings.autoPayment.enabled, settings.autoPayment.intervalMinutes, settings.autoPayment.methodPattern, broadcastNotification]);

  const handleUpload = (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        setUploadedImageUrl(e.target?.result as string);
        setViewState('uploaded');
        setIsUploading(false);
        setIsSettingsOpen(false);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const handlePaymentAction = (type: 'received' | 'activated') => {
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let msg = '';
    let msgType: 'success' | 'info' = 'success';

    if (type === 'received') {
      msg = `Payment Received. From ${settings.senderNumber}. Amount: Tk ${settings.amount}. Method: ${settings.paymentMethod}. at ${date} ${time}`;
      msgType = 'success';
    } else {
      msg = `🎉 Student ID Activated Successfully at ${time}`;
      msgType = 'info';
    }

    // Trigger multi-device real-time broadcast notification
    broadcastNotification(msg, msgType);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#000205] font-sans selection:bg-blue-500/30 flex items-center justify-center">
      <AtmosphericEffects />
      
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#000205]">
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[10%] bg-[radial-gradient(circle_at_20%_30%,rgba(30,58,138,0.2)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(29,78,216,0.15)_0%,transparent_50%)]"
        />

        {/* Holographic Master Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Animated Scanning Grid */}
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '0px 60px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:100%_60px] opacity-20"
        />

        {/* Primary Atmosphere Glows */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-30, 30, -30],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[90%] h-[90%] bg-blue-600/30 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.3, 0.15],
            x: [50, -50, 50],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[15%] -right-[10%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[180px]"
        />

        {/* Central Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[250px] pointer-events-none" />

        {/* Digital Grid Interface */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Shimmering Scanline Effect */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-blue-400/[0.12] to-transparent h-[30%] w-full"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000103_100%)]" />

        {/* Atmospheric Flickering Lights */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-blue-400/20 blur-[150px] rounded-full"
          />
          <motion.div 
            animate={{ 
              opacity: [0.05, 0.2, 0.05],
              scale: [1.5, 1, 1.5],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] bg-blue-600/15 blur-[120px] rounded-full"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2 sm:p-4 lg:p-6 pb-10">
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: -20, opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1800px] h-full flex items-center justify-center"
        >
          {/* Frameless Dashboard Glass Container */}
          <div className="relative w-full h-full max-h-[92vh] bg-[#020408]/92 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] border border-blue-500/20 shadow-[0_0_100px_-20px_rgba(30,58,138,0.4),0_80px_160px_-40px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
            
            {/* Top Navigation HUD Bar */}
            <div className="h-20 bg-blue-500/[0.03] border-b border-blue-500/10 flex items-center justify-between px-6 md:px-10 z-50">
              <div className="flex items-center gap-8">
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/10" />
                </div>
              </div>
              
              <div className="flex items-center gap-8 text-blue-400/40">
                <div className="flex items-center gap-2 mr-2">
                  <button 
                    onClick={() => {
                      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const date = new Date().toLocaleDateString();
                      const randomPhone = `01${Math.floor(100000000 + Math.random() * 900000000)}`;
                      broadcastNotification(`Payment Received. From ${randomPhone}. Amount: Tk ${settings.amount}. Method: ${settings.paymentMethod}. at ${date} ${time}`, 'success');
                    }}
                    className="w-5 h-5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/40 transition-all cursor-pointer border border-emerald-500/20 flex items-center justify-center group/btn shadow-[0_0_15px_rgba(34,197,94,0.05)]"
                    title="Simulate Payment"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover/btn:bg-emerald-400 group-hover/btn:scale-125 transition-all" />
                  </button>
                  <button 
                    onClick={() => {
                      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      broadcastNotification(`🎉 Student ID Activated Successfully at ${time}`, 'info');
                    }}
                    className="w-5 h-5 rounded-lg bg-blue-500/10 hover:bg-blue-500/40 transition-all cursor-pointer border border-blue-500/20 flex items-center justify-center group/btn shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                    title="Simulate Activation"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/btn:bg-blue-400 group-hover/btn:scale-125 transition-all" />
                  </button>
                </div>

                <div className="flex items-center gap-3 px-5 py-2 bg-blue-500/5 rounded-2xl border border-blue-500/10 group transition-all hover:bg-blue-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(59,130,246,1)]" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-blue-400/60">Node Active</span>
                </div>
                
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="group p-3.5 bg-blue-500/5 text-blue-400 hover:bg-blue-400 hover:text-black rounded-2xl transition-all duration-500 border border-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.1)]"
                >
                  <Settings className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                </button>
              </div>
            </div>

            {/* Content Layout - Split into Left Sidebar, Center, and Right Sidebar */}
            <div className="flex-1 relative flex overflow-hidden">
              {/* Left Side: Dynamic Payment Node Stream - Hugs Left Border */}
              <div className="w-56 xl:w-60 bg-blue-900/10 border-r border-blue-500/20 relative overflow-hidden hidden lg:flex flex-col flex-shrink-0">
                {/* Holographic Sidebar Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-20" />
                
                {/* Cinematic Trailing Laser Beam */}
                <motion.div 
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-[4px] h-64 bg-gradient-to-b from-transparent via-blue-400 to-transparent z-40 blur-[4px] shadow-[0_0_30px_rgba(59,130,246,1)] will-change-transform translate-z-0"
                />
                
                {/* Luminescent Side Rail */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400/0 via-blue-400/60 to-blue-400/0 z-30 shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-[#000205] via-blue-900/5 to-[#000205] z-10 pointer-events-none" />
                
                <div className="relative z-30 p-4 flex items-center gap-3 border-b border-blue-500/20 bg-[#000205]/90 backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                  <div className="relative p-2 bg-blue-500/30 rounded-xl border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <Sparkles className="w-4 h-4 text-blue-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em]">Node Matrix</span>
                    <span className="text-[7px] text-blue-400/60 uppercase tracking-[0.2em] font-bold">Live Link</span>
                  </div>
                </div>
                
                <div className="flex-1 relative overflow-hidden">
                  <motion.div
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ 
                      duration: 60, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="flex flex-col gap-3 p-0 will-change-transform"
                  >
                    {[
                      { name: 'Bkash Official', color: 'bg-[#E2136E]', glow: 'shadow-[#E2136E]/40', icon: 'bk' },
                      { name: 'Nagad Official', color: 'bg-[#F34F22]', glow: 'shadow-[#F34F22]/40', icon: 'ng' },
                      { name: 'Rocket Node', color: 'bg-[#8C3494]', glow: 'shadow-[#8C3494]/40', icon: 'rk' },
                      { name: 'Bank Transfer', color: 'bg-[#003B71]', glow: 'shadow-blue-600/40', icon: '🏦' },
                      { name: 'Google Pay', color: 'bg-white', glow: 'shadow-white/30', icon: 'G', textColor: 'text-blue-500' },
                      { name: 'Binance Smart', color: 'bg-[#F3BA2F]', glow: 'shadow-[#F3BA2F]/50', icon: 'BN', textColor: 'text-black' },
                      { name: 'UPI Gateway', color: 'bg-[#097939]', glow: 'shadow-emerald-500/40', icon: 'UPI' },
                      { name: 'mCash Node', color: 'bg-[#00A2E8]', glow: 'shadow-cyan-500/40', icon: 'mc' },
                    ].concat([
                      { name: 'Bkash Official', color: 'bg-[#E2136E]', glow: 'shadow-[#E2136E]/40', icon: 'bk' },
                      { name: 'Nagad Official', color: 'bg-[#F34F22]', glow: 'shadow-[#F34F22]/40', icon: 'ng' },
                      { name: 'Rocket Node', color: 'bg-[#8C3494]', glow: 'shadow-[#8C3494]/40', icon: 'rk' },
                      { name: 'Bank Transfer', color: 'bg-[#003B71]', glow: 'shadow-blue-600/40', icon: '🏦' },
                      { name: 'Google Pay', color: 'bg-white', glow: 'shadow-white/30', icon: 'G', textColor: 'text-blue-500' },
                      { name: 'Binance Smart', color: 'bg-[#F3BA2F]', glow: 'shadow-[#F3BA2F]/50', icon: 'BN', textColor: 'text-black' },
                      { name: 'UPI Gateway', color: 'bg-[#097939]', glow: 'shadow-emerald-500/40', icon: 'UPI' },
                      { name: 'mCash Node', color: 'bg-[#00A2E8]', glow: 'shadow-cyan-500/40', icon: 'mc' },
                    ]).map((node, idx) => (
                      <motion.div
                        key={`${node.name}-${idx}`}
                        whileHover={{ x: 6, scale: 1.01 }}
                        animate={{ 
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{ 
                          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }
                        }}
                        className="group relative flex items-center gap-4 px-4 py-3 bg-[#05070A]/60 border-y border-r border-blue-500/10 hover:border-blue-400/40 transition-all cursor-pointer overflow-hidden backdrop-blur-sm will-change-transform"
                      >
                        {/* Edge Accents */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 group-hover:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        
                        {/* Chrome Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className={`w-11 h-11 rounded-xl ${node.color} flex items-center justify-center border border-white/20 shadow-xl ${node.glow} group-hover:scale-110 transition-all duration-500 relative overflow-hidden flex-shrink-0`}>
                           <span className={`relative font-black text-sm tracking-tighter drop-shadow-md ${node.textColor || 'text-white'}`}>
                             {node.icon}
                           </span>
                        </div>
                        
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className="text-[14px] font-black text-white/95 group-hover:text-blue-300 transition-colors uppercase tracking-[0.05em] leading-none truncate">{node.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                            <span className="text-[10px] text-blue-400/60 uppercase font-black tracking-[0.1em]">Stream Link</span>
                          </div>
                        </div>

                        {/* Interactive Data Glow */}
                        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-blue-500/0 group-hover:bg-blue-400/40 transition-all" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Central Main Display - Expands wide in middle dark space */}
              <div className="flex-1 relative flex items-center justify-center p-2 md:p-4 bg-gradient-to-br from-blue-900/[0.03] to-transparent overflow-hidden">
                
                {/* Left Notifications Layer - Higher z-index, positioned above methods */}
                <div className="absolute left-2 top-4 z-[100] flex flex-col gap-2 pointer-events-none w-64">
                  <NotificationManager 
                    notifications={notifications} 
                    removeNotification={removeNotification} 
                    position="left"
                  />
                </div>

                {/* Right Notifications Layer - Higher z-index, positioned for identity info */}
                <div className="absolute right-2 top-4 z-[100] flex flex-col gap-2 pointer-events-none w-64">
                  <NotificationManager 
                    notifications={notifications} 
                    removeNotification={removeNotification} 
                    position="right"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {isUploading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="flex flex-col items-center gap-8"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 border-[3px] border-blue-400/10 border-t-blue-400 rounded-full animate-spin shadow-[0_0_30px_rgba(59,130,246,0.2)]" />
                        <div className="absolute inset-0 blur-3xl bg-blue-400/20 rounded-full" />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-blue-400 text-[12px] font-black tracking-[0.8em] uppercase animate-pulse">Initializing UI</p>
                        <div className="w-48 h-1 bg-blue-500/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-full h-full bg-blue-400/40"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={viewState}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full flex items-center justify-center p-0.5 md:p-1"
                    >
                      <div className="relative group w-full h-full flex items-center justify-center">
                        {/* Dramatic Ambient Glow behind image */}
                        <div className="absolute inset-0 bg-orange-500/5 blur-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1500" />
                        
                        {viewState === 'poster' ? (
                          <div className="w-full h-full max-w-[98%] max-h-[98%] flex items-center justify-center drop-shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
                            <PaymentPoster settings={settings} />
                          </div>
                        ) : (

                          <img
                            src={viewState === 'uploaded' && uploadedImageUrl ? uploadedImageUrl : POSTER_IMAGE}
                            alt="Interface Node"
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-[32px] md:rounded-[40px] shadow-[0_100px_200px_-50px_rgba(0,0,0,1),0_0_60px_rgba(59,130,246,0.15)] border border-white/[0.03] transition-all duration-1000 group-hover:scale-[1.015] group-hover:border-blue-500/30"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        {/* Overlay Reflection */}
                        <div className="absolute inset-0 rounded-[40px] pointer-events-none bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent opacity-50" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Intelligence Sidebar - Hugs Right Border */}
              <RightSidebar 
                enabled={settings.showLiveIntelligence} 
                metrics={intelMetrics} 
              />
            </div>

            {/* Global Settings Panel Overlay */}
            <SettingsPanel 
              isOpen={isSettingsOpen} 
              onClose={() => setIsSettingsOpen(false)}
              onUpload={handleUpload}
              onPaymentAction={handlePaymentAction}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Draggable Timer */}
      <div className="fixed top-4 left-4 z-[200]">
        <CountdownTimer isActive={settings.isTimerActive} />
      </div>
    </main>
  );
}
