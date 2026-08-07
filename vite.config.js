import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

const imageManifestId = "virtual:supachef-image-manifest";
const resolvedImageManifestId = `\0${imageManifestId}`;
const supportedImageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function collectImagePaths(directory, publicDirectory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(directory, entry.name);

    if (entry.isDirectory()) return collectImagePaths(entryPath, publicDirectory);
    if (!supportedImageExtensions.has(extname(entry.name).toLowerCase())) return [];

    return [`/${relative(publicDirectory, entryPath).split(sep).join("/")}`];
  });
}

function imageManifest() {
  return {
    name: "supachef-image-manifest",
    resolveId(id) {
      return id === imageManifestId ? resolvedImageManifestId : null;
    },
    load(id) {
      if (id !== resolvedImageManifestId) return null;

      const publicDirectory = resolve(process.cwd(), "public");
      const imagesDirectory = resolve(publicDirectory, "images");
      return `export default ${JSON.stringify(collectImagePaths(imagesDirectory, publicDirectory))}`;
    },
  };
}

export default defineConfig({
  plugins: [imageManifest(), react()],
});
