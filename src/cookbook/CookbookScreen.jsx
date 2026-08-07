import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatedTileGrid } from "../components/AnimatedTileGrid";
import { CategoryTile } from "../components/CategoryTile";
import { ContextTile } from "../components/ContextTile";
import { HomeButton } from "../components/HomeButton";
import { PizzaTile } from "../components/PizzaTile";
import { RecipeTile } from "../components/RecipeTile";
import { ShareButton } from "../components/ShareButton";
import { ShareDialog } from "../components/ShareDialog";
import { playBackSound, playButtonSound, playHomeSound } from "../audio/sounds";
import {
  categories,
  getCategory,
  getPizza,
  getPizzasForCategory,
  getRecipeSteps,
} from "./catalog";

function parseLocation(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return { depth: 0 };
  if (parts[0] !== "category") return { invalid: true, depth: 0 };
  if (parts.length === 2) return { categoryId: parts[1], depth: 1 };
  if (parts.length === 3) {
    return { categoryId: parts[1], pizzaId: parts[2], depth: 2 };
  }

  return { invalid: true, depth: 0 };
}

export function CookbookScreen({ reduceMotion }) {
  const location = useLocation();
  const navigate = useNavigate();
  const previousDepth = useRef(0);
  const logoAnimationTimer = useRef(null);
  const [openComment, setOpenComment] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLogoTapped, setIsLogoTapped] = useState(false);
  const route = parseLocation(location.pathname);
  const category = route.categoryId ? getCategory(route.categoryId) : null;
  const pizza =
    category && route.pizzaId ? getPizza(category.id, route.pizzaId) : null;
  const direction = route.depth >= previousDepth.current ? "forward" : "back";
  const configuredShareUrl = import.meta.env.VITE_PUBLIC_APP_URL;
  const shareUrl = configuredShareUrl
    ? `${configuredShareUrl.replace(/\/$/, "")}/`
    : `${window.location.origin}/`;

  useEffect(() => {
    previousDepth.current = route.depth;
    setOpenComment(null);
  }, [location.pathname, route.depth]);

  useEffect(
    () => () => {
      window.clearTimeout(logoAnimationTimer.current);
    },
    [],
  );

  function animateLogoForTouch() {
    if (!window.matchMedia("(hover: none)").matches) return;

    playBackSound().catch(() => {});
    window.clearTimeout(logoAnimationTimer.current);
    setIsLogoTapped(true);
    logoAnimationTimer.current = window.setTimeout(() => {
      setIsLogoTapped(false);
    }, 260);
  }

  function playLogoHoverSound() {
    if (!window.matchMedia("(hover: hover)").matches) return;

    playBackSound().catch(() => {});
  }

  function playTileSound(event) {
    if (!(event.target instanceof Element)) return;

    const control = event.target.closest("button, .tile");
    if (!control || control.classList.contains("home-button")) return;

    playButtonSound().catch(() => {});
  }

  function goHome() {
    playHomeSound().catch(() => {});
    navigate("/");
  }

  function goBack(fallback) {
    if ((window.history.state?.idx ?? 0) > 0) {
      navigate(-1);
      return;
    }

    navigate(fallback, { replace: true });
  }

  if (route.invalid || (route.categoryId && !category) || (route.pizzaId && !pizza)) {
    return <Navigate to="/" replace />;
  }

  let children;
  let viewKey;

  if (!category) {
    viewKey = "categories";
    children = categories.map((item) => (
      <CategoryTile
        key={`category-${item.id}`}
        category={item}
        onSelect={() => navigate(`/category/${item.id}`)}
      />
    ));
  } else if (!pizza) {
    viewKey = `category-${category.id}`;
    children = [
      <ContextTile
        key={`category-${category.id}`}
        item={category}
        type="category"
        color={category.color}
        onBack={() => goBack("/")}
        backLabel="Back to categories"
      />,
      ...getPizzasForCategory(category.id).map((item) => (
        <PizzaTile
          key={`pizza-${item.id}`}
          pizza={item}
          category={category}
          onSelect={() => navigate(`/category/${category.id}/${item.id}`)}
        />
      )),
    ];
  } else {
    viewKey = `pizza-${pizza.id}`;
    children = [
      <ContextTile
        key={`pizza-${pizza.id}`}
        item={pizza}
        type="pizza"
        color={category.color}
        fallbackImage={category.image}
        onBack={() => goBack(`/category/${category.id}`)}
        backLabel={`Back to ${category.name} pizzas`}
      />,
      ...getRecipeSteps(pizza).map((step) => (
        <RecipeTile
          key={`ingredient-${step.index}-${step.ingredientId}`}
          step={step}
          isOpen={openComment === step.index}
          onToggle={() =>
            setOpenComment((current) => (current === step.index ? null : step.index))
          }
        />
      )),
    ];
  }

  return (
    <main className="cookbook-shell" onClickCapture={playTileSound}>
      <div className="utility-row">
        <span
          className={`wordmark ${isLogoTapped ? "wordmark-tapped" : ""}`}
          aria-label="supaChef"
          onPointerDown={animateLogoForTouch}
          onPointerEnter={playLogoHoverSound}
        >
          <span className="wordmark-supa">supa</span>
          <span className="wordmark-chef">Chef</span>
          <span className="wordmark-signal" aria-hidden="true" />
        </span>
        {route.depth > 0 && <HomeButton onClick={goHome} />}
        <ShareButton onClick={() => setIsShareOpen(true)} />
      </div>

      <AnimatedTileGrid
        viewKey={viewKey}
        direction={direction}
        reduceMotion={reduceMotion}
      >
        {children}
      </AnimatedTileGrid>

      <AnimatePresence>
        {isShareOpen && (
          <ShareDialog url={shareUrl} onClose={() => setIsShareOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
