import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  public constructor(
    private modalService: NgbModal,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  recipes: Recipe[];

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService
      .getRecipes(+this.route.snapshot.paramMap.get('category_id'))
      .subscribe((recipes) => (this.recipes = recipes));
  }

  deleteRecipe(recipe: Recipe): void {
    const deleteModalRef = this.modalService.open(ModalDeleteComponent, {
      centered: true,
    });
    deleteModalRef.componentInstance.recipe = recipe;

    deleteModalRef.result.then(
      (result) => {
        this.recipeService
          .deleteRecipe(result)
          .subscribe(() => location.reload());
      },
      (reason) => {}
    );
  }
}
