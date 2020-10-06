import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { LuxonModule } from 'luxon-angular';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
})
export class RecipeViewComponent implements OnInit {
  @Input() recipe: Recipe;
  public how_to_step_index = 1;
  math = Math;

  constructor(
    private route: ActivatedRoute,
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

  /**
   * Method getTimeFromSchema
   * Utility to convert ISO 8601 to human readable time
   * @param duration string in the ISO 8601 format
   */
  getTimeFromSchema(duration: String) {
    // const time_duration = Moment.duration(duration);
    // var return_time = '';
    // if (duration.indexOf('H') >= 0) {
    //   return_time += time_duration.hours() + ' Heures ';
    // }
    // if (duration.indexOf('M') >= 0) {
    //   return_time += time_duration.minutes() + ' Minutes ';
    // }
    // return return_time;
  }

  /**
   * Method incrementStep
   * * Hook to count the steps through all sections to display the right step number ( <ol start="x"> )
   */
  incrementStep(): void {
    this.how_to_step_index++;
  }
  /**
   * Method incrementStep
   * * Hook to trick angular that the value has not changed ( not need after display is done )
   */
  resetStep(): void {
    this.how_to_step_index = 1;
  }
}
