import { MessageSquareText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FoodImage } from "./FoodImage";
import { transitions } from "../animation/transitions";

export function RecipeTile({ step, isOpen, onToggle }) {
  const { ingredient, comment } = step;
  const Component = comment ? motion.button : motion.article;

  if (!ingredient) return null;

  return (
    <Component
      layout
      className={`tile recipe-tile ${comment ? "recipe-tile-action" : ""}`}
      onClick={comment ? onToggle : undefined}
      whileTap={{ scale: 0.975 }}
      aria-label={
        comment
          ? `${isOpen ? "Hide" : "Show"} note for ${ingredient.name}`
          : undefined
      }
    >
      {comment && (
        <span className="recipe-note-icon" aria-hidden="true">
          <MessageSquareText size={16} strokeWidth={2} />
        </span>
      )}

      <div className="recipe-media">
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.p
              key="comment"
              className="recipe-comment"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={transitions.reveal}
            >
              {comment}
            </motion.p>
          ) : (
            <motion.div
              key="image"
              className="recipe-image-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={transitions.reveal}
            >
              <FoodImage
                className="tile-image"
                src={ingredient.image}
                fallback="/images/placeholders/ingredient.jpg"
                alt=""
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="tile-label recipe-label">{ingredient.name}</span>
    </Component>
  );
}
