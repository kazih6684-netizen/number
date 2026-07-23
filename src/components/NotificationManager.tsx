import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, PartyPopper, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationManagerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
  position?: 'left' | 'right' | 'center' | 'all';
}

export default function NotificationManager({ notifications, removeNotification, position = 'all' }: NotificationManagerProps) {
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
}

interface NotificationItemProps {
  key?: string;
  notif: Notification;
  onRemove: (id: string) => void;
  position?: 'left' | 'right' | 'center' | 'all';
}

function NotificationItem({ notif, onRemove, position = 'center' }: NotificationItemProps) {
  const initialX = position === 'right' ? 40 : position === 'left' ? -40 : 0;
  
  // Mask phone numbers: 01712345678 -> 017XXXXXXXX
  const maskPhone = (text: string) => {
    return text.replace(/(01\d)(\d{8})/g, '$1XXXXXXXX');
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
        y: 0,
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative group pointer-events-auto w-full"
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-1 rounded-xl blur-lg opacity-10 group-hover:opacity-30 transition duration-500 ${
        isPayment ? 'bg-green-500' : isActivation ? 'bg-amber-400' : 'bg-blue-500'
      }`} />
      
      <div className={`relative flex items-center gap-3 bg-[#05070A]/95 backdrop-blur-xl border p-3 rounded-xl shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-all duration-300 ${
        isPayment ? 'border-green-500/40 shadow-green-500/10' : 
        isActivation ? 'border-amber-400/40 shadow-amber-400/10' : 
        'border-blue-400/20'
      }`}>
        
        {/* Progress Bar */}
        <motion.div 
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 15, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${
            isPayment ? 'bg-green-500' : isActivation ? 'bg-amber-400' : 'bg-blue-500'
          }`}
        />

        <div className="flex-shrink-0 z-20">
          {isPayment ? (
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : isActivation ? (
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-300 border border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              <PartyPopper className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-400/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="flex flex-col z-20 min-w-0 flex-1">
          <p className={`text-[12.5px] leading-relaxed tracking-tight break-words font-black ${
            isPayment ? 'text-green-50/95' : isActivation ? 'text-amber-50/95' : 'text-white/95'
          }`}>
            {maskPhone(notif.message)}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1 h-1 rounded-full animate-pulse ${
              isPayment ? 'bg-green-400' : isActivation ? 'bg-amber-400' : 'bg-blue-400'
            }`} />
            <span className={`text-[9px] uppercase font-black tracking-[0.15em] ${
              isPayment ? 'text-green-500/60' : isActivation ? 'text-amber-500/60' : 'text-blue-500/60'
            }`}>
              {isPayment ? 'Payment Verified' : isActivation ? 'System Active' : 'Notification'}
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
}
