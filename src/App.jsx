import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import HeroSection from "./components/HeroSection";
import Timeline from "./components/Timeline";
import FunFacts from "./components/FunFacts";
import MessageSection from "./components/MessageSection";
import Surprise from "./components/Surprise";

export default function App() {
  return (
    <Router>
      <AnimatedBackground />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Timeline />
              <FunFacts />
              <MessageSection />
              {/* REMOVED THE DUPLICATE MessageSection HERE */}
            </>
          }
        />
        <Route path="/surprise" element={<Surprise />} />
      </Routes>
    </Router>
  );
}
