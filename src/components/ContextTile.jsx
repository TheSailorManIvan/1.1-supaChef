import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { FoodImage } from "./FoodImage";
import { transitions } from "../animation/transitions";

export function ContextTile({ item, type, color, fallbackImage, onBack, backLabel }) {
  const layoutId = `${type}-${item.id}`;

  return (
    <motion.button
      layout
      layoutId={layoutId}
      className="tile context-tile"
      style={{ "--category-color": color }}
      onClick={onBack}
      whileTap={{ scale: 0.965 }}
      transition={{ layout: transitions.spring }}
      aria-label={backLabel}
    >
      <FoodImage
        className="context-image"
        src={item.image}
        fallback={fallbackImage ?? (
          type === "category"
            ? "/images/placeholders/category.jpg"
            : "/images/placeholders/pizza.jpg"
        )}
        alt=""
      />
      <span className="context-shade" />
      <span className="context-arrow" aria-hidden="true">
        <ArrowLeft size={22} strokeWidth={2.4} />
      </span>
      <span className="context-kicker">Back</span>
      <span className="context-label">{item.name}</span>
    </motion.button>
  );
}
