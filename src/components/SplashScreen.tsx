import { motion } from 'motion/react';
import { Headphones } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#0EA5E9] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
          <Headphones className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-white text-center px-4">AI Call Transcriber</h1>
        <p className="text-white/80 text-center px-4">Restore clarity to your calls.</p>
      </motion.div>
    </div>
  );
}
