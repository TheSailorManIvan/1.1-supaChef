import { Home } from "lucide-react";
import { motion } from "motion/react";

export function HomeButton({ onClick }) {
  return (
    <motion.button
      className="home-button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-label="Return to all categories"
      title="Home"
    >
      <Home size={20} strokeWidth={2.2} />
    </motion.button>
  );
}
