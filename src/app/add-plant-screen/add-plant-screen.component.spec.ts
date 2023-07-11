import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantScreenComponent } from './add-plant-screen.component';

describe('AddPlantScreenComponent', () => {
  let component: AddPlantScreenComponent;
  let fixture: ComponentFixture<AddPlantScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlantScreenComponent]
    });
    fixture = TestBed.createComponent(AddPlantScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
