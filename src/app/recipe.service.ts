import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category, Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { MessageService } from './message.service';

require('dotenv').config();

const getHttpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  }),
};
const postHttpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = '${process.env.API_URL}' ?? 'http://localhost:8000/'; // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiUrl + 'categories', getHttpOptions)
      .pipe(
        tap((_) => this.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getRecipes(category: number): Observable<Recipe[]> {
    let urlParam = '';
    if (category > 0) {
      urlParam = '?category_id=' + category;
    }

    return this.http
      .get<Recipe[]>(this.apiUrl + 'recipes' + urlParam, getHttpOptions)
      .pipe(
        tap((_) => this.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  /** GET recipe by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.apiUrl}recipe/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap((_) => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}save_recipe/${recipe.id}`;
    return this.http.put<Recipe>(url, recipe).pipe(
      tap((_) => this.log(`save recipe id=${recipe.id} name=${recipe.name}`)),
      catchError(this.handleError<Recipe>(`save recipe id=${recipe.id}`))
    );
  }

  importRecipe(recipe_url: String): Observable<String> {
    const url = `${this.apiUrl}parse_recipe`;

    return this.http
      .post<String>(
        url,
        {
          url: recipe_url,
        },
        postHttpOptions
      )
      .pipe(
        tap((_) => this.log(`import recipe_url=${recipe_url}`)),
        catchError(this.handleError<String>(`import recipe_url=${recipe_url}`))
      );
  }

  deleteRecipe(id: number): Observable<String> {
    const url = `${this.apiUrl}delete_recipe/${id}`;
    return this.http.delete<String>(url).pipe(
      tap((_) => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<String>(`deleteRecipe id=${id}`))
    );
  }

  /** Log a RecipeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
