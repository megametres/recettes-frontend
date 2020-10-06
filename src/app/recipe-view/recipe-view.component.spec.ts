import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeViewComponent } from './recipe-view.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeViewComponent;
  let fixture: ComponentFixture<RecipeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
