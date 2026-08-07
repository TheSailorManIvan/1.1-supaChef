const imageCache = new Map();

function preloadImage(src) {
  if (!src) return Promise.resolve();
  if (imageCache.has(src)) return imageCache.get(src);

  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

export function preloadImages(sources) {
  return Promise.all([...new Set(sources)].map(preloadImage));
}
