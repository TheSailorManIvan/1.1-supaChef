https://supachef.onrender.com/

# supaChef

supaChef is a clean, modern, and minimalist pizza recipe prototype where
ingredient order matters. It explores route-driven interfaces, CSS Grid,
shared-layout animation, and game-like audio feedback using Vite, JavaScript,
React, and Motion.

Recipes are grouped into Meat, Chicken, Veg, and Other. Selecting a pizza
reveals its ingredients from left to right in preparation order, with optional
quantity notes available directly from the topping tiles.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Vite writes the deployable site to `dist/`.

## Editing the cookbook

Catalogue content lives in `src/data/catalog.json` and is divided into:

- `categories`: the four top-level menu groups
- `ingredients`: reusable ingredient names and image paths
- `pizzas`: pizzas and their ordered recipe steps

The position of a step in a pizza's `steps` array determines its visual order.
A step may include one optional all-purpose `comment`:

```json
{
  "ingredientId": "pepperoni",
  "comment": "Distribute evenly across the pizza."
}
```

Add local images to:

```text
public/images/categories/
public/images/pizzas/
public/images/toppings/
public/images/placeholders/
```

At build time, Vite checks which image files are present. Missing pizza images
fall back directly to their category image, and missing topping images use the
local ingredient-board image without first making a failed browser request.
Restart the Vite development server after adding a new image so it is included
in this image manifest.

## Architecture

The app uses component-driven React architecture and one-way data flow rather
than classic MVC. MVC was considered, but this project is a stateful client-side
interface without a backend controller layer. React's component and routing
model maps more directly to the interface hierarchy.

- JSON is the content model.
- In-memory navigation is the source of truth for the selected category and pizza.
- `CookbookScreen` derives the visible grid from the route and catalogue.
- Reusable tile components own presentation and local interaction.
- Motion `layoutId` values preserve tile identity between interface levels.
- Temporary state is limited to the currently revealed recipe comment.
- Shared controls provide Home navigation, QR sharing, copying, and printing.
- Interface sounds are preloaded and reused through `src/audio/sounds.js`.

Shared animation settings live in `src/animation/transitions.js`. The responsive
grid and visual treatment are defined with plain CSS.

## Render deployment

The included `render.yaml` configures a Render Static Site with:

```text
Build command: npm install && npm run build
Publish directory: dist
```

The interface uses in-memory navigation, so the public URL remains at the site
root and refreshing always returns to the category menu. The rewrite remains as
a hosting fallback for requests that arrive at an unknown path.
