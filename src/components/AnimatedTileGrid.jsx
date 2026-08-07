import { AnimatePresence, motion } from "motion/react";
import { itemTransition } from "../animation/transitions";

export function AnimatedTileGrid({ children, viewKey, direction, reduceMotion }) {
  return (
    <motion.div layout className="tile-grid">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {children.map((child, index) => (
          <motion.div
            layout
            className="grid-cell"
            key={`${viewKey}-${child.key ?? index}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.62, x: -24, y: -12 }
            }
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.68, x: -20, y: -10 }
            }
            transition={itemTransition(index, reduceMotion)}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
