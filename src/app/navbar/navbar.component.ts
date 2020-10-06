import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Category } from '../recipe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public constructor(private recipeService: RecipeService) {}

  categories: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.recipeService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
