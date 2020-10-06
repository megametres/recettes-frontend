import { Recipe, Keyword, HowToStectionFull } from './recipe';

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Biscuit',
    category: 'Dessert',
    author: 'RicardoCuisine',
    image: '',
    prep_time: 'PT12M',
    cook_time: 'PT1H',
    total_time: 'PT1H12M',
    recipe_yield: '4 Portions',
    description: 'Recette de biscuit',
    keywords: [{ id: 1, name: 'Biscuit' }],
    ingredients: [{ id: 1, name: 'Sucre' }],
    how_to_section_full: [
      {
        id: 1,
        name: 'Préparation',
        how_to_steps: [{ id: 1, name: 'Mettre au four' }],
      },
    ],
  },
];
