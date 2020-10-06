import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeService
      .getRecipe(+this.route.snapshot.paramMap.get('id'))
      .subscribe((recipe) => (this.recipe = recipe));
  }

  saveRecipe(): void {
    this.recipeService
      .saveRecipe(this.recipe)
      .subscribe((recipe_id) =>
        this.router.navigate(['recipe/view/' + recipe_id])
      );
  }

  removeKeyword(index): void {
    this.recipe.keywords.splice(index, 1);
  }

  addKeyword(): void {
    this.recipe.keywords.push({ id: -1, name: '' });
  }
}
