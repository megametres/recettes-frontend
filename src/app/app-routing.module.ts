import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeImportComponent } from './recipe-import/recipe-import.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/edit/:id', component: RecipeEditComponent },
  { path: 'recipe/view/:id', component: RecipeViewComponent },
  { path: 'recipe/import', component: RecipeImportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
