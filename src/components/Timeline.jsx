import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedHeart, AnimatedSparkle, AnimatedGift, AnimatedCrown } from './AnimatedIcons';

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const events = [
    { year: "Jul 2024", text: "The day we became friends", icon: <AnimatedHeart size={50} />, detail: "Best decision ever!" },
    { year: "Aug 2024", text: "Getting to know each other", icon: <AnimatedSparkle size={50} />, detail: "So many laughs!" },
    { year: "Sep 2024", text: "Endless conversations begin", icon: <AnimatedGift size={50} />, detail: "Never-ending chats!" },
    { year: "Oct 2024", text: "Understanding each other deeply", icon: <AnimatedHeart size={50} />, detail: "True connection!" },
    { year: "Nov 2024", text: "Still the best friendship ever", icon: <AnimatedCrown size={50} />, detail: "Forever and always!" },
  ];

  return (
    <section id="timeline" className="py-12 md:py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-black text-center mb-8 md:mb-12 flex items-center justify-center gap-4 flex-wrap">
        <AnimatedSparkle size={40} />Our Journey Together<AnimatedSparkle size={40} />
      </motion.h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-6 md:gap-8">
        {events.map((event, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }} onHoverStart={() => setHoveredIndex(i)} onHoverEnd={() => setHoveredIndex(null)} className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-l-8 border-pink-600 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden">
            {hoveredIndex === i && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400" />}
            <div className="flex items-center gap-4 relative z-10">
              <motion.div animate={hoveredIndex === i ? { scale: 1.2 } : { scale: 1 }} transition={{ duration: 0.3 }} className="bg-pink-50 p-3 rounded-full">{event.icon}</motion.div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-semibold">{event.year}</p>
                <p className="text-lg md:text-xl font-bold text-gray-800">{event.text}</p>
                {hoveredIndex === i && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-pink-600 font-semibold mt-1">{event.detail}</motion.p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}