import { useEffect, useState } from "react";

export function FoodImage({ src, alt, fallback, className = "" }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [fallback, src]);

  function handleError() {
    if (currentSrc !== fallback) setCurrentSrc(fallback);
  }

  return (
    <img
      className={className}
      src={currentSrc}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable="false"
      onError={handleError}
    />
  );
}
