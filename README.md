# supaChef

supaChef is a small, responsive pizza recipe prototype built to explore
route-driven interfaces, CSS Grid, and shared-layout animation. The first
milestone deliberately contains one complete path:

`Meat -> Super Supreme -> ordered recipe steps`

Chicken, Veg, and Other are intentionally empty category shells. This keeps the
prototype focused on whether the navigation and animation concept works before
more menu content is added.

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

Missing topping images currently fall back to a local ingredient-board image,
so new data can be added before every final photograph is available.

## Architecture

The app uses component-driven React architecture and one-way data flow rather
than classic MVC. MVC was considered, but this project is a stateful client-side
interface without a backend controller layer. React's component and routing
model maps more directly to the interface hierarchy.

- JSON is the content model.
- The URL is the source of truth for the selected category and pizza.
- `CookbookScreen` derives the visible grid from the route and catalogue.
- Reusable tile components own presentation and local interaction.
- Motion `layoutId` values preserve tile identity between interface levels.
- Temporary state is limited to the currently revealed recipe comment.

Shared animation settings live in `src/animation/transitions.js`. The responsive
grid and visual treatment are defined with plain CSS.

## Render deployment

The included `render.yaml` configures a Render Static Site with:

```text
Build command: npm install && npm run build
Publish directory: dist
```

All routes rewrite to `index.html` so direct recipe URLs and browser navigation
continue to work after deployment.

## Prototype content

The Super Supreme ingredients and order are illustrative training data for a
frontend study. They are not official Pizza Hut preparation instructions. Pizza
Hut product photographs from public Pizza Hut Belgium product pages are used
locally for this non-commercial prototype; the project is not affiliated with
or endorsed by Pizza Hut.

Product-image source pages:

- https://www.pizzahut.be/super-supreme
- https://www.pizzahut.be/nl/pepperoni
- https://www.pizzahut.be/nl/garden-lovers
- https://www.pizzahut.be/nl/margherita
