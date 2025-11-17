import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AnimatedHeart, AnimatedGift, AnimatedSparkle, AnimatedCrown } from './AnimatedIcons';

export default function MessageSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const correctPassword = "madam";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword) {
      setIsUnlocked(true);
      setError(false);
      setTimeout(() => setIsOpen(true), 500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 text-center bg-gradient-to-b from-pink-50 to-purple-100 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto w-full">
        {!isUnlocked ? (
          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <motion.div animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-6 flex justify-center">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>
                <rect x="30" y="45" width="40" height="35" rx="5" fill="url(#lockGradient)" />
                <circle cx="50" cy="62" r="5" fill="#ffffff" />
                <rect x="48" y="62" width="4" height="10" rx="2" fill="#ffffff" />
                <path d="M 35,45 L 35,35 Q 35,20 50,20 Q 65,20 65,35 L 65,45" fill="none" stroke="url(#lockGradient)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="20" cy="30" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></circle>
                <circle cx="80" cy="30" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
                <circle cx="50" cy="10" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" /></circle>
              </svg>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-black mb-6 flex items-center justify-center gap-3 flex-wrap">
              <AnimatedHeart size={40} />Secret Message<AnimatedHeart size={40} />
            </h2>
            <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-2xl border-4 border-pink-200">
              <p className="text-gray-700 text-lg mb-6">This special message is locked!<br />Enter the secret password to unlock it...</p>
              <form onSubmit={handleUnlock} className="space-y-4">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." className={`w-full px-6 py-3 rounded-full border-2 ${error ? 'border-red-500' : 'border-pink-300'} focus:outline-none focus:border-pink-600 text-center text-lg`} />
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-semibold">❌ Wrong password! Try again...</motion.p>}
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-pink-600 to-black text-white py-3 px-8 rounded-full shadow-xl text-lg font-bold">🔓 Unlock Message</motion.button>
              </form>
              <p className="text-sm text-gray-500 mt-4">Hint: It's what I call you! 😉</p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1, type: "spring" }} className="relative">
              {!isOpen && <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute inset-0 bg-pink-200 rounded-lg origin-top z-10" style={{ transformOrigin: "top" }} />}
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="relative bg-gradient-to-br from-amber-50 to-yellow-100 p-8 md:p-12 rounded-lg shadow-2xl border-8 border-amber-200" style={{ backgroundImage: `linear-gradient(to right, rgba(139, 69, 19, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 69, 19, 0.05) 1px, transparent 1px)`, backgroundSize: "20px 20px" }}>
                <div className="absolute top-4 right-4 w-16 h-16 bg-red-600 rounded border-4 border-white shadow-lg flex items-center justify-center rotate-12">
                  <AnimatedCrown size={35} />
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-600 rounded-full border-4 border-red-800 shadow-xl flex items-center justify-center">
                  <AnimatedHeart size={30} />
                </motion.div>
                <div className="mt-8 space-y-6 font-serif">
                  <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6" style={{ fontFamily: "'Brush Script MT', cursive" }}>Dearest Madam,</motion.h3>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4" style={{ fontFamily: "'Georgia', serif" }}>
                    <p className="indent-8">On this most special of days, I write to you with a heart full of gratitude and joy. You are incredibly special to me, Madam.</p>
                    <p className="indent-8">Thank you for being who you are — sometimes angry, yet always sweet. Your fierce spirit and gentle heart make you truly unforgettable.</p>
                    <p className="indent-8">Through laughter and tears, through calm moments and chaotic ones, you've been the greatest friend anyone could ask for.</p>
                    <p className="indent-8 font-bold text-pink-700">Here's to many more amazing moments together!<br />May this year bring you all the happiness you deserve.</p>
                    <p className="text-right mt-8 text-xl">With love and friendship,<br /><span className="text-2xl font-bold text-pink-600">Your Best Friend</span></p>
                  </motion.div>
                  <div className="flex justify-center gap-6 text-3xl mt-6">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><AnimatedHeart size={40} /></motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}><AnimatedGift size={45} /></motion.div>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}><AnimatedHeart size={40} /></motion.div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="mt-8 text-center">
                  <motion.a href="/surprise" whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} whileTap={{ scale: 0.9 }} className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-black text-white py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl text-base md:text-lg font-bold hover:shadow-pink-500/50 transition-all">
                    <AnimatedGift size={30} />One More Surprise Awaits!<AnimatedSparkle size={30} />
                  </motion.a>
                </motion.div>
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-amber-200 opacity-50" style={{ clipPath: "polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)" }} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
