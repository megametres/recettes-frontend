import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder
  ) {}

  leagueForm: FormGroup;
  recipeForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    category: [''],
    author: [''],
    image: [''],
    prep_time: [''],
    cook_time: [''],
    total_time: [''],
    recipe_yield: [''],
    description: [''],
    ingredients: this.formBuilder.array([
      this.formBuilder.group({
        id: new FormControl(0),
        name: new FormControl(''),
      }),
    ]),
    keywords: this.formBuilder.array([
      this.formBuilder.group({
        id: new FormControl(0),
        name: new FormControl(''),
      }),
    ]),
    how_to_section_full: this.formBuilder.array([this.how_to_section_full]),
  });

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeService
      .getRecipe(+this.route.snapshot.paramMap.get('id'))
      .subscribe((recipe) => {
        this.recipeForm.patchValue({
          id: recipe.id,
          name: recipe.name,
          category: recipe.category,
          author: recipe.author,
          image: recipe.image,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
          total_time: recipe.total_time,
          recipe_yield: recipe.recipe_yield,
          description: recipe.description,
        });
        this.recipeForm.setControl(
          'ingredients',
          this.formBuilder.array(
            recipe.ingredients.map((ingredient) =>
              this.formBuilder.group(ingredient)
            ) || []
          )
        );
        this.recipeForm.setControl(
          'keywords',
          this.formBuilder.array(
            recipe.keywords.map((keyword) => this.formBuilder.group(keyword)) ||
              []
          )
        );

        (this.recipeForm.get("how_to_section_full") as FormArray).removeAt(0);
        recipe.how_to_section_full.forEach((how_to_section, sectionIndex) => {
          let new_section = this.formBuilder.group(how_to_section);
          new_section.patchValue({
            id: how_to_section.id,
            name: how_to_section.name
          });
          new_section.setControl(
            'how_to_steps',
            this.formBuilder.array(
              how_to_section.how_to_steps.map((how_to_step) => this.formBuilder.group(how_to_step)) ||
                []
            )
          );
          (this.recipeForm.get("how_to_section_full") as FormArray).push(new_section);
        })

      });
  }

  saveRecipe(): void {
    this.recipeService
      .saveRecipe(this.recipeForm.value)
      .subscribe((recipe_id) =>
        this.router.navigate(['recipe/view/' + recipe_id])
      );
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
      this.formBuilder.group({
        id: new FormControl(0),
        name: new FormControl(''),
      })
    );
  }

  removeIngredient(index): void {
    this.ingredients.removeAt(index);
  }

  get keywords() {
    return this.recipeForm.get('keywords') as FormArray;
  }

  addKeyword() {
    this.keywords.push(
      this.formBuilder.group({
        id: new FormControl(0),
        name: new FormControl(''),
      })
    );
  }

  removeKeyword(index): void {
    this.keywords.removeAt(index);
  }

  get how_to_section_full(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(0),
      name: new FormControl(""),
      how_to_steps: this.formBuilder.array([this.how_to_steps])
    });
  }

  get how_to_steps(): FormGroup {
    return this.formBuilder.group({
      id:  new FormControl(0),
      name: new FormControl("")
    });
  }

  how_to_section_steps(how_to_section_index) {
    return ((this.recipeForm.controls.how_to_section_full as FormArray).at(how_to_section_index) as FormGroup).controls.how_to_steps as FormGroup;
  }

  addHowToSection() {
    (this.recipeForm.get("how_to_section_full") as FormArray).push(this.how_to_section_full);
  }

  removeHowToSection(index) {
    (this.recipeForm.get("how_to_section_full") as FormArray).removeAt(index);
  }

  addHowToStep(how_to_section) {
    how_to_section.get("how_to_steps").push(this.how_to_steps);
  }

  removeHowToStep(how_to_section, index) {
    how_to_section.get("how_to_steps").removeAt(index);
  }

}
