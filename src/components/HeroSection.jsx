import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedCake, AnimatedHeart, AnimatedSparkle, AnimatedCrown } from './AnimatedIcons';

function Confetti() {
  useEffect(() => {
    const colors = ["#ec4899", "#000000", "#a855f7", "#f472b6", "#1f2937"];
    const confetti = [];

    for (let i = 0; i < 100; i++) {
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

    return () => {
      confetti.forEach((c) => c.remove());
      style.remove();
    };
  }, []);
  return null;
}

function FriendshipCounter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date("2024-07-01T00:00:00");
    const updateCounter = () => {
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime({ days, hours, minutes, seconds });
    };
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.8 }} className="bg-gradient-to-r from-pink-600 to-black text-white p-6 rounded-2xl shadow-2xl my-8 max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <AnimatedSparkle size={30} className="absolute top-2 left-4 animate-pulse" />
        <AnimatedSparkle size={25} className="absolute bottom-2 right-4 animate-pulse" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-center relative z-10 flex items-center justify-center gap-2">
        <AnimatedHeart size={30} /> Our Friendship Duration <AnimatedHeart size={30} />
      </h3>
      <div className="grid grid-cols-4 gap-2 md:gap-4 text-center relative z-10">
        <div><motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl md:text-4xl font-bold">{time.days}</motion.div><div className="text-xs md:text-sm opacity-80">Days</div></div>
        <div><motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="text-3xl md:text-4xl font-bold">{time.hours}</motion.div><div className="text-xs md:text-sm opacity-80">Hours</div></div>
        <div><motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="text-3xl md:text-4xl font-bold">{time.minutes}</motion.div><div className="text-xs md:text-sm opacity-80">Minutes</div></div>
        <div><motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} className="text-3xl md:text-4xl font-bold">{time.seconds}</motion.div><div className="text-xs md:text-sm opacity-80">Seconds</div></div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.8) {
        const sparkle = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
        setSparkles(prev => [...prev.slice(-20), sparkle]);
        setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== sparkle.id)), 1000);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <Confetti />
      {sparkles.map(sparkle => (
        <motion.div key={sparkle.id} initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1.5 }} transition={{ duration: 1 }} style={{ position: "fixed", left: sparkle.x - 20, top: sparkle.y - 20, pointerEvents: "none", zIndex: 9999 }}>
          <AnimatedSparkle size={40} />
        </motion.div>
      ))}
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1.5 }} whileHover={{ scale: 1.1, rotate: 5 }} className="mb-6 cursor-pointer">
        <AnimatedCake size={120} />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-black bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4 flex-wrap">
        Happy Birthday Madam! <AnimatedCrown size={50} />
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-gray-700 text-lg md:text-2xl max-w-2xl leading-relaxed">
        To the one who's sometimes angry but always sweet<br />This magical website is crafted just for YOU!
      </motion.p>
      <FriendshipCounter />
      <motion.a href="#timeline" whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)" }} whileTap={{ scale: 0.95 }} className="mt-8 bg-gradient-to-r from-pink-600 to-black text-white py-3 md:py-4 px-8 md:px-10 rounded-full shadow-2xl text-lg font-semibold hover:shadow-pink-500/50 transition-all flex items-center gap-2">
        Explore Our Journey <AnimatedSparkle size={25} />
      </motion.a>
    </section>
  );
}