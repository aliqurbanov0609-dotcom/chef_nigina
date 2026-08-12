import { motion } from 'framer-motion';
import splashImg from '../assets/images/splash_chef_1786540704109.jpg';

interface Props {
  onEnter: () => void;
}

export function SplashScreen({ onEnter }: Props) {
  return (
    <motion.div
      className="fixed inset-0 max-w-md mx-auto w-full bg-app-gradient flex flex-col items-center justify-center p-6 box-border cursor-pointer overflow-hidden z-50 select-none"
      onClick={onEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Floating stars */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-16 left-8 text-3xl pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-8 text-2xl pointer-events-none"
      >
        🌟
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-10 text-xl pointer-events-none"
      >
        🌸
      </motion.div>

      {/* Chef Avatar Portrait */}
      <motion.div
        className="relative w-48 h-48 sm:w-56 sm:h-56 mb-3 flex-shrink-0"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
      >
        <img
          src={splashImg}
          alt="Chef Nigina"
          className="w-full h-full object-cover rounded-full shadow-[0_15px_30px_rgba(205,184,255,0.5)] border-4 border-white/80"
        />
      </motion.div>

      {/* Glowing Chef Nigina Neon Header */}
      <motion.div
        className="relative z-20 mb-6 text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        <motion.h2 
          className="text-4xl sm:text-5xl text-white tracking-wider"
          style={{ fontFamily: "'Pacifico', cursive" }}
          animate={{ 
            textShadow: [
              "0 0 10px #FF90B3, 0 0 20px #FF90B3, 0 0 30px #BFA7FF",
              "0 0 20px #FF90B3, 0 0 40px #FF90B3, 0 0 60px #BFA7FF, 0 0 80px #BFA7FF",
              "0 0 10px #FF90B3, 0 0 20px #FF90B3, 0 0 30px #BFA7FF"
            ] 
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          Chef Nigina
        </motion.h2>
      </motion.div>

      {/* Bistro Title Clay Card */}
      <motion.div
        className="text-center clay-card px-8 py-4 mb-10 flex flex-col items-center w-full max-w-[280px]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        <h1 className="text-2xl sm:text-3xl font-black text-[#8B5CF6] mb-1">Le Buffet</h1>
        <p className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">
          Bistro • Wine • Coffee
        </p>
      </motion.div>

      {/* Tap instruction */}
      <motion.div
        className="absolute bottom-10 font-extrabold text-[#8B5CF6]/80 tracking-widest text-xs"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        НАЖМИТЕ ДЛЯ ВХОДА
      </motion.div>
    </motion.div>
  );
}
