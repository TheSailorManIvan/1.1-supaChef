import { LayoutGroup, MotionConfig, useReducedMotion } from "motion/react";
import { CookbookScreen } from "../cookbook/CookbookScreen";
import { transitions } from "../animation/transitions";

export function App() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion="user"
      transition={reduceMotion ? transitions.reduced : transitions.spring}
    >
      <LayoutGroup id="cookbook-grid">
        <CookbookScreen reduceMotion={reduceMotion} />
      </LayoutGroup>
    </MotionConfig>
  );
}
