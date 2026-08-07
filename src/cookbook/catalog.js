import catalog from "../data/catalog.json";

export const categories = [...catalog.categories].sort((a, b) => a.order - b.order);

export function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getPizzasForCategory(categoryId) {
  return catalog.pizzas
    .filter((pizza) => pizza.categoryId === categoryId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPizza(categoryId, pizzaId) {
  return catalog.pizzas.find(
    (pizza) => pizza.categoryId === categoryId && pizza.id === pizzaId,
  );
}

export function getRecipeSteps(pizza) {
  if (!pizza) return [];

  return pizza.steps.map((step, index) => ({
    ...step,
    index,
    ingredient: catalog.ingredients.find(
      (ingredient) => ingredient.id === step.ingredientId,
    ),
  }));
}
