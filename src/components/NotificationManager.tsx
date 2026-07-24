import { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, PartyPopper, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationManagerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
  position?: 'left' | 'right' | 'center' | 'all';
}

const NotificationManager = memo(({ notifications, removeNotification, position = 'all' }: NotificationManagerProps) => {
  const filteredNotifications = position === 'all' 
    ? notifications 
    : notifications.filter(n => n.position === position);

  return (
    <div className={`flex flex-col gap-2 w-full max-w-[320px] ${position === 'right' ? 'items-end' : 'items-start'}`}>
      <AnimatePresence mode="popLayout">
        {filteredNotifications.map((notif) => (
          <NotificationItem 
            key={notif.id} 
            notif={notif} 
            onRemove={removeNotification} 
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default NotificationManager;

interface NotificationItemProps {
  key?: string;
  notif: Notification;
  onRemove: (id: string) => void;
  position?: 'left' | 'right' | 'center' | 'all';
}

const NotificationItem = memo(({ notif, onRemove, position = 'center' }: NotificationItemProps) => {
  const initialX = position === 'right' ? 40 : position === 'left' ? -40 : 0;
  
  // Auto-remove after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notif.id);
    }, 30000);
    return () => clearTimeout(timer);
  }, [notif.id, onRemove]);

  // Mask phone numbers: 01712345678 -> 017-XXXX-XXX
  const maskPhone = (text: string) => {
    return text.replace(/(01\d)(\d{3})(\d{5})/g, '$1-$2-XXXXX');
  };

  const isPayment = notif.message.toLowerCase().includes('payment');
  const isActivation = notif.message.toLowerCase().includes('activated');

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: -15,
        x: initialX, 
        scale: 0.95, 
        filter: 'blur(4px)' 
      }}
      animate={{ 
        opacity: 1, 
        y: [0, -4, 0], // Breathing/floating effect
        x: 0, 
        scale: 1, 
        filter: 'blur(0px)',
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.92, 
        y: -10,
        transition: { duration: 0.2 } 
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.16, 1, 0.3, 1],
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative group pointer-events-auto w-full max-w-[260px]"
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-0.5 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition duration-500 ${
        isPayment ? 'bg-green-500' : isActivation ? 'bg-amber-400' : 'bg-blue-500'
      }`} />
      
      <div className={`relative flex items-center gap-2 bg-[#05070A]/98 backdrop-blur-2xl border p-2.5 rounded-xl shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-all duration-300 ${
        isPayment ? 'border-green-500/50 shadow-green-500/20' : 
        isActivation ? 'border-amber-400/50 shadow-amber-400/20' : 
        'border-blue-400/30'
      }`}>
        
        {/* Progress Bar - 30 seconds duration */}
        <motion.div 
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 30, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-[3px] w-full origin-left ${
            isPayment ? 'bg-green-500' : isActivation ? 'bg-amber-400' : 'bg-blue-500'
          }`}
        />

        <div className="flex-shrink-0 z-20">
          {isPayment ? (
            <div className="p-1.5 bg-green-500/20 rounded-lg text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          ) : isActivation ? (
            <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              <PartyPopper className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-400/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
        
        <div className="flex flex-col z-20 min-w-0 flex-1">
          <p className={`text-[11px] leading-tight tracking-tight break-words font-black uppercase ${
            isPayment ? 'text-green-400' : isActivation ? 'text-amber-300' : 'text-white'
          }`}>
            {maskPhone(notif.message)}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`text-[7px] uppercase font-black tracking-[0.2em] px-1.5 py-0.5 rounded-full ${
              isPayment ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
              isActivation ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' : 
              'bg-blue-500/20 text-blue-400 border border-blue-400/30'
            }`}>
              {isPayment ? 'Payment OK' : isActivation ? 'ID ACTIVE' : 'LOG'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onRemove(notif.id)}
          className="p-1.5 text-white/30 hover:text-white transition-all hover:bg-white/5 rounded-md z-30 ml-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
});
