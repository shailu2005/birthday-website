import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedCake, AnimatedCrown, AnimatedHeart, AnimatedGift, AnimatedSparkle } from './AnimatedIcons';

function Confetti() {
  useEffect(() => {
    const colors = ["#ec4899", "#000000", "#a855f7", "#f472b6", "#1f2937"];
    const confetti = [];
    for (let i = 0; i < 150; i++) {
      const piece = document.createElement("div");
      piece.style.position = "fixed";
      piece.style.width = "10px";
      piece.style.height = "10px";
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = "-20px";
      piece.style.opacity = Math.random();
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
      piece.style.pointerEvents = "none";
      piece.style.zIndex = "9999";
      document.body.appendChild(piece);
      confetti.push(piece);
      setTimeout(() => piece.remove(), 5000);
    }
    const style = document.createElement("style");
    style.textContent = `@keyframes confettiFall { to { transform: translateY(100vh) rotate(${Math.random() * 720}deg); } }`;
    document.head.appendChild(style);
    return () => { confetti.forEach((c) => c.remove()); style.remove(); };
  }, []);
  return null;
}

function Fireworks() {
  useEffect(() => {
    const createFirework = () => {
      const firework = document.createElement("div");
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.5);
      firework.style.position = "fixed";
      firework.style.left = x + "px";
      firework.style.top = y + "px";
      firework.style.pointerEvents = "none";
      firework.style.zIndex = "9999";
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 100;
        particle.style.position = "absolute";
        particle.style.width = "6px";
        particle.style.height = "6px";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = ["#ec4899", "#fbbf24", "#a855f7"][Math.floor(Math.random() * 3)];
        particle.style.animation = `fireworkBurst 1s ease-out forwards`;
        particle.style.setProperty('--angle', angle + 'rad');
        particle.style.setProperty('--distance', distance + 'px');
        firework.appendChild(particle);
      }
      document.body.appendChild(firework);
      setTimeout(() => firework.remove(), 1000);
    };
    const style = document.createElement("style");
    style.textContent = `@keyframes fireworkBurst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(0); opacity: 0; } }`;
    document.head.appendChild(style);
    const interval = setInterval(createFirework, 800);
    return () => { clearInterval(interval); style.remove(); };
  }, []);
  return null;
}

export default function Surprise() {
  const [cakeCut, setCakeCut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showKnife, setShowKnife] = useState(false);
  const [showCrumbs, setShowCrumbs] = useState(false);

  useEffect(() => {
    setCakeCut(false);
    setShowMessage(false);
    setShowFireworks(false);
    setShowKnife(false);
    setShowCrumbs(false);
  }, []);

  const cutCake = () => {
    setShowKnife(true);
    setTimeout(() => {
      setCakeCut(true);
      setShowCrumbs(true);
      setShowFireworks(true);
    }, 800);
    setTimeout(() => setShowMessage(true), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-pink-100 via-purple-100 to-slate-100 relative overflow-hidden">
      <Confetti />
      {showFireworks && <Fireworks />}
      
      {/* Crumbs and particles effect */}
      {showCrumbs && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2 - 100,
                scale: 1,
                opacity: 1
              }}
              animate={{ 
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 + Math.random() * 300,
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 720
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ["#fbbf24", "#ec4899", "#a855f7", "#f472b6"][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}
      
      {!cakeCut ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1 }} className="text-center relative z-10">
          
          {/* Knife Animation */}
          {showKnife && (
            <motion.div
              initial={{ x: -200, y: -100, rotate: -45, opacity: 0 }}
              animate={{ 
                x: 200, 
                y: 100, 
                rotate: 45,
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <svg width="120" height="120" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="knifeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="50%" stopColor="#f9fafb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <filter id="knifeGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Knife blade */}
                <path
                  d="M 20,80 L 80,20 L 85,25 L 25,85 Z"
                  fill="url(#knifeGradient)"
                  stroke="#9ca3af"
                  strokeWidth="1"
                  filter="url(#knifeGlow)"
                />
                {/* Knife shine */}
                <path
                  d="M 30,75 L 75,30 L 78,33 L 33,78 Z"
                  fill="rgba(255,255,255,0.6)"
                />
                {/* Handle */}
                <ellipse cx="17" cy="83" rx="8" ry="5" fill="#1f2937" transform="rotate(-45 17 83)" />
                {/* Motion blur trail */}
                <path
                  d="M 20,80 L 10,90"
                  stroke="#ec4899"
                  strokeWidth="3"
                  opacity="0.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}
          
          <motion.div
            animate={showKnife ? { 
              y: [0, -5, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
            } : { y: [0, -10, 0] }}
            transition={showKnife ? { duration: 0.3 } : { repeat: Infinity, duration: 2 }}
            className="mb-8 relative"
          >
            <AnimatedCake size={150} />
          </motion.div>
          
          <motion.h1 animate={{ textShadow: ["0 0 20px rgba(236, 72, 153, 0.5)", "0 0 40px rgba(236, 72, 153, 0.8)", "0 0 20px rgba(236, 72, 153, 0.5)"] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-black bg-clip-text text-transparent">
            Make a Wish, Madam!
          </motion.h1>
          <motion.p className="text-gray-700 text-lg mb-6 flex items-center justify-center gap-2 flex-wrap">
            Close your eyes, make your wish, and... <AnimatedSparkle size={30} />
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.2, boxShadow: "0 0 30px rgba(236, 72, 153, 0.8)" }} 
            whileTap={{ scale: 0.9 }} 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            onClick={cutCake} 
            disabled={showKnife}
            className="bg-gradient-to-r from-pink-600 to-black text-white py-4 px-8 md:px-10 rounded-full text-xl md:text-2xl font-bold shadow-2xl flex items-center gap-3 mx-auto disabled:opacity-50"
          >
            🔪 Cut The Cake! <AnimatedSparkle size={30} />
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10 w-full max-w-4xl">
            
            {/* Two Cake Pieces Separating */}
            <div className="mb-8 relative h-64 flex items-center justify-center">
              
              {/* Left Piece */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: -100, 
                  y: 20,
                  rotate: -15,
                  opacity: 1
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute"
              >
                <svg width="100" height="120" viewBox="0 0 60 100">
                  <defs>
                    <linearGradient id="cakePiece1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  {/* Left half of cake */}
                  <rect x="10" y="40" width="40" height="50" rx="3" fill="url(#cakePiece1)" />
                  <rect x="10" y="40" width="40" height="8" rx="3" fill="#f472b6" />
                  {/* Frosting drips */}
                  <path d="M 15,40 Q 15,35 20,35 Q 25,35 25,40" fill="#fbbf24" />
                  <path d="M 30,40 Q 30,35 35,35 Q 40,35 40,40" fill="#fbbf24" />
                  {/* Falling candle */}
                  <motion.g
                    animate={{ 
                      y: [0, 10, 20],
                      rotate: [0, 45, 90],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{ duration: 1 }}
                  >
                    <rect x="25" y="20" width="4" height="15" rx="1" fill="#fbbf24" />
                    <ellipse cx="27" cy="18" rx="3" ry="5" fill="#fb923c" />
                  </motion.g>
                  {/* Crack line */}
                  <path 
                    d="M 50,40 L 52,50 L 50,60 L 52,70 L 50,80 L 52,90" 
                    stroke="#9ca3af" 
                    strokeWidth="1" 
                    fill="none"
                    strokeDasharray="2,2"
                  />
                </svg>
              </motion.div>

              {/* Right Piece */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: 100, 
                  y: 20,
                  rotate: 15,
                  opacity: 1
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute"
              >
                <svg width="100" height="120" viewBox="0 0 60 100">
                  <defs>
                    <linearGradient id="cakePiece2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  {/* Right half of cake */}
                  <rect x="10" y="40" width="40" height="50" rx="3" fill="url(#cakePiece2)" />
                  <rect x="10" y="40" width="40" height="8" rx="3" fill="#f472b6" />
                  {/* Frosting drips */}
                  <path d="M 15,40 Q 15,35 20,35 Q 25,35 25,40" fill="#fbbf24" />
                  <path d="M 30,40 Q 30,35 35,35 Q 40,35 40,40" fill="#fbbf24" />
                  {/* Falling candle */}
                  <motion.g
                    animate={{ 
                      y: [0, 10, 20],
                      rotate: [0, -45, -90],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{ duration: 1 }}
                  >
                    <rect x="28" y="20" width="4" height="15" rx="1" fill="#fbbf24" />
                    <ellipse cx="30" cy="18" rx="3" ry="5" fill="#fb923c" />
                  </motion.g>
                  {/* Crack line */}
                  <path 
                    d="M 10,40 L 8,50 L 10,60 L 8,70 L 10,80 L 8,90" 
                    stroke="#9ca3af" 
                    strokeWidth="1" 
                    fill="none"
                    strokeDasharray="2,2"
                  />
                </svg>
              </motion.div>

              {/* Plate underneath */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0"
              >
                <svg width="200" height="40" viewBox="0 0 200 40">
                  <ellipse cx="100" cy="20" rx="90" ry="15" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                  <ellipse cx="100" cy="18" rx="85" ry="12" fill="#ffffff" opacity="0.5" />
                </svg>
              </motion.div>
            </div>

            {/* Beautiful Cake Slice on Plate */}
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring", duration: 0.8 }}
              className="mb-8"
            >
              <svg width="150" height="150" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="sliceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                {/* Plate */}
                <ellipse cx="50" cy="75" rx="40" ry="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
                {/* Cake slice triangle */}
                <path d="M 50,30 L 75,70 L 25,70 Z" fill="url(#sliceGradient)" stroke="#f472b6" strokeWidth="2" />
                {/* Frosting layers */}
                <path d="M 50,30 Q 45,35 42,40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 50,30 Q 55,35 58,40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Berries on top */}
                <circle cx="48" cy="38" r="3" fill="#ef4444">
                  <animate attributeName="r" values="3;3.5;3" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="54" cy="42" r="2.5" fill="#ef4444">
                  <animate attributeName="r" values="2.5;3;2.5" dur="1s" begin="0.3s" repeatCount="indefinite" />
                </circle>
                {/* Fork beside */}
                <g transform="translate(70, 60)">
                  <rect x="0" y="0" width="2" height="20" rx="1" fill="#9ca3af" />
                  <rect x="-3" y="0" width="1.5" height="8" rx="0.5" fill="#9ca3af" />
                  <rect x="0" y="0" width="1.5" height="8" rx="0.5" fill="#9ca3af" />
                  <rect x="3" y="0" width="1.5" height="8" rx="0.5" fill="#9ca3af" />
                </g>
                {/* Sparkles */}
                {[...Array(6)].map((_, i) => {
                  const angle = (Math.PI * 2 * i) / 6;
                  const x = 50 + Math.cos(angle) * 35;
                  const y = 50 + Math.sin(angle) * 35;
                  return (
                    <circle key={i} cx={x} cy={y} r="2" fill="#fbbf24">
                      <animate 
                        attributeName="opacity" 
                        values="0;1;0" 
                        dur="2s" 
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite" 
                      />
                    </circle>
                  );
                })}
              </svg>
            </motion.div>

            {showMessage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <motion.h2 animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 5, repeat: Infinity }} className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 via-black to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-4 flex-wrap" style={{ backgroundSize: "200% 200%" }}>
                  <AnimatedCrown size={50} />Happy Birthday, Madam!<AnimatedCrown size={50} />
                </motion.h2>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto mb-8 relative overflow-hidden">
                  <div className="absolute top-4 left-4"><AnimatedHeart size={30} /></div>
                  <div className="absolute top-4 right-4"><AnimatedHeart size={30} /></div>
                  <div className="absolute bottom-4 left-4"><AnimatedSparkle size={25} /></div>
                  <div className="absolute bottom-4 right-4"><AnimatedSparkle size={25} /></div>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed px-4 relative z-10">
                    May all your wishes come true!<br /><br />
                    You deserve all the happiness in the world<br />
                    Thank you for being the best friend ever!<br /><br />
                    <span className="text-pink-600 font-bold flex items-center justify-center gap-2 flex-wrap">Here's to another amazing year of our friendship!<AnimatedGift size={30} /></span>
                  </p>
                </motion.div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a href="/" whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-black to-pink-600 text-white py-3 px-8 rounded-full shadow-xl font-bold flex items-center gap-2">
                    <AnimatedSparkle size={25} />Back to Celebration
                  </motion.a>
                  <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} onClick={() => { setCakeCut(false); setShowMessage(false); setShowKnife(false); setShowCrumbs(false); setTimeout(() => setShowFireworks(true), 100); }} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-full shadow-xl font-bold flex items-center gap-2">
                    <AnimatedCake size={25} />Cut Cake Again!
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}