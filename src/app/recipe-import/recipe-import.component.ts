import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-import',
  templateUrl: './recipe-import.component.html',
  styleUrls: ['./recipe-import.component.css'],
})
export class RecipeImportComponent implements OnInit {
  @Input() recipeUrl = String();
  recipe_id: String;

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {}

  addRecipe(): void {
    console.log(this.recipeUrl);
    this.recipeService
      .importRecipe(this.recipeUrl)
      .subscribe((recipe) => this.router.navigate(['recipe/view/' + recipe]));
  }
}
