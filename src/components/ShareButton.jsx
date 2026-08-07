import { Share2 } from "lucide-react";
import { motion } from "motion/react";

export function ShareButton({ onClick }) {
  return (
    <motion.button
      className="share-button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-label="Share supaChef"
      title="Share"
    >
      <Share2 size={19} strokeWidth={2.2} />
    </motion.button>
  );
}
