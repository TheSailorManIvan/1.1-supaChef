import { useEffect, useState } from "react";

export function FoodImage({ src, alt, fallback, className = "" }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  function handleError() {
    if (currentSrc !== fallback) setCurrentSrc(fallback);
  }

  return (
    <img
      className={className}
      src={currentSrc}
      alt={alt}
      loading="eager"
      draggable="false"
      onError={handleError}
    />
  );
}
