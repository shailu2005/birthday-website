import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedGift, AnimatedHeart, AnimatedSparkle, AnimatedCrown } from './AnimatedIcons';

export default function FunFacts() {
  const [flipped, setFlipped] = useState({});
  const facts = [
    { text: "You make everday better", icon: <AnimatedGift size={60} />, back: "Every moment with you is pure joy!" },
    { text: "The fights with you", icon: <AnimatedHeart size={60} />, back: "It's hurting at that movement but after effects were better" },
    { text: "Talking to you feels peaceful", icon: <AnimatedSparkle size={60} />, back: "Your presence is so calming!" },
    { text: "You understand me perfectly", icon: <AnimatedHeart size={60} />, back: "Like you can read my mind!" },
    { text: "You are one in a billion", icon: <AnimatedCrown size={60} />, back: "Truly irreplaceable, Madam!" },
  ];

  const toggleFlip = (index) => { setFlipped(prev => ({ ...prev, [index]: !prev[index] })); };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-pink-50">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-pink-600 text-center mb-8 md:mb-12 flex items-center justify-center gap-4 flex-wrap">
        <AnimatedSparkle size={40} />Things I Like About You<AnimatedSparkle size={40} />
      </motion.h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6">
        {facts.map((fact, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ perspective: "1000px" }}>
            <motion.div animate={{ rotateY: flipped[i] ? 180 : 0 }} transition={{ duration: 0.6 }} style={{ transformStyle: "preserve-3d" }} onClick={() => toggleFlip(i)} className="relative cursor-pointer h-48">
              <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-pink-200 flex flex-col items-center justify-center">
                <div className="mb-3">{fact.icon}</div>
                <p className="text-gray-800 text-base md:text-lg font-semibold text-center">{fact.text}</p>
                <p className="text-xs text-gray-500 mt-2">Click to flip! 🔄</p>
              </div>
              <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <AnimatedHeart size={50} className="mb-4" />
                <p className="text-lg font-bold text-center">{fact.back}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}