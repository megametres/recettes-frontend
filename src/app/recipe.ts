import { FormArray, FormControl } from '@angular/forms';
import { RecipeIngredientsComponent } from './recipe-edit/recipe-ingredients/recipe-ingredients.component';

export interface Recipe {
  id: number;
  name: string;
  category: string;
  author: string;
  image: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  recipe_yield: string;
  description: string;
  ingredients: Ingredient[];
  keywords: Keyword[];
  how_to_section_full: HowToStectionFull[];
}

export interface Category {
  id: number;
  name: string;
}

export interface HowToStectionFull {
  id: number;
  name: string;
  how_to_steps: HowToStep[];
}

export interface HowToStep {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  name: string;
}
