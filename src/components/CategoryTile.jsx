import { motion } from "motion/react";
import { FoodImage } from "./FoodImage";
import { transitions } from "../animation/transitions";

export function CategoryTile({ category, onSelect }) {
  return (
    <motion.button
      layout
      layoutId={`category-${category.id}`}
      className="tile category-tile"
      style={{ "--category-color": category.color }}
      onClick={onSelect}
      whileTap={{ scale: 0.965 }}
      transition={{ layout: transitions.spring }}
      aria-label={`Open ${category.name} pizzas`}
    >
      <FoodImage
        className="tile-image"
        src={category.image}
        fallback="/images/placeholders/category.jpg"
        alt=""
      />
      <span className="tile-label">{category.name}</span>
    </motion.button>
  );
}
