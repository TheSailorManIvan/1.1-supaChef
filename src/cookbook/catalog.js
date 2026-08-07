import catalog from "../data/catalog.json";
import availableImagePaths from "virtual:supachef-image-manifest";

const availableImages = new Set(availableImagePaths);

function resolveImage(image, fallback) {
  return image && availableImages.has(image) ? image : fallback;
}

export const categories = catalog.categories
  .map((category) => ({
    ...category,
    image: resolveImage(category.image, "/images/placeholders/category.jpg"),
  }))
  .sort((a, b) => a.order - b.order);

function resolvePizza(pizza) {
  const category = getCategory(pizza.categoryId);

  return {
    ...pizza,
    image: resolveImage(
      pizza.image,
      category?.image ?? "/images/placeholders/pizza.jpg",
    ),
  };
}

function resolveIngredient(ingredientId) {
  const ingredient = catalog.ingredients.find((item) => item.id === ingredientId);

  return ingredient
    ? {
        ...ingredient,
        image: resolveImage(
          ingredient.image,
          "/images/placeholders/ingredient.jpg",
        ),
      }
    : undefined;
}

export function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getPizzasForCategory(categoryId) {
  return catalog.pizzas
    .filter((pizza) => pizza.categoryId === categoryId)
    .map(resolvePizza)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPizza(categoryId, pizzaId) {
  const pizza = catalog.pizzas.find(
    (pizza) => pizza.categoryId === categoryId && pizza.id === pizzaId,
  );

  return pizza ? resolvePizza(pizza) : undefined;
}

export function getRecipeSteps(pizza) {
  if (!pizza) return [];

  return pizza.steps.map((step, index) => ({
    ...step,
    index,
    ingredient: resolveIngredient(step.ingredientId),
  }));
}

export function getPizzaPreviewImages() {
  return catalog.pizzas.map((pizza) => resolvePizza(pizza).image);
}

export function getCategoryRecipeImages(categoryId) {
  const sources = getPizzasForCategory(categoryId).flatMap((pizza) => [
    pizza.image,
    ...getRecipeSteps(pizza).map((step) => step.ingredient?.image),
  ]);

  return [...new Set(sources.filter(Boolean))];
}
