import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlantScreenComponent } from './edit-plant-screen.component';

describe('EditPlantScreenComponent', () => {
  let component: EditPlantScreenComponent;
  let fixture: ComponentFixture<EditPlantScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlantScreenComponent]
    });
    fixture = TestBed.createComponent(EditPlantScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
