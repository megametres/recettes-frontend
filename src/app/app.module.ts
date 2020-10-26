import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeImportComponent } from './recipe-import/recipe-import.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ModalDeleteComponent } from './recipes/modal-delete/modal-delete.component';
import { LuxonModule } from 'luxon-angular';
import { DurationReadablePipe } from './utils/duration-readable.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeViewComponent,
    MessagesComponent,
    NavbarComponent,
    RecipeImportComponent,
    RecipeEditComponent,
    ModalDeleteComponent,
    DurationReadablePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LuxonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeleteComponent],
})
export class AppModule {}
