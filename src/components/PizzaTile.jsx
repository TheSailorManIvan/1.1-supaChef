import { motion } from "motion/react";
import { FoodImage } from "./FoodImage";
import { transitions } from "../animation/transitions";

export function PizzaTile({ pizza, category, onSelect }) {
  return (
    <motion.button
      layout
      layoutId={`pizza-${pizza.id}`}
      className={`tile pizza-tile ${category.id === "chicken" ? "tile-dark-copy" : ""}`}
      style={{ "--category-color": category.color }}
      onClick={onSelect}
      whileTap={{ scale: 0.965 }}
      transition={{ layout: transitions.spring }}
      aria-label={`Open ${pizza.name} recipe`}
    >
      <FoodImage
        className="tile-image"
        src={pizza.image}
        fallback={category.image}
        alt=""
      />
      <span className="tile-label">{pizza.name}</span>
    </motion.button>
  );
}
