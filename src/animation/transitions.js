export const transitions = {
  spring: {
    type: "spring",
    stiffness: 520,
    damping: 38,
    mass: 0.7,
  },
  tile: {
    type: "spring",
    stiffness: 560,
    damping: 40,
    mass: 0.65,
  },
  reveal: {
    type: "spring",
    stiffness: 460,
    damping: 34,
    mass: 0.6,
  },
  reduced: {
    duration: 0.14,
    ease: "easeOut",
  },
};

export function itemTransition(index, reduceMotion) {
  if (reduceMotion) return transitions.reduced;

  return {
    ...transitions.tile,
    delay: Math.min(index * 0.052, 0.42),
  };
}
