import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantScreenComponent } from './plant-screen.component';

describe('PlantScreenComponent', () => {
  let component: PlantScreenComponent;
  let fixture: ComponentFixture<PlantScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantScreenComponent]
    });
    fixture = TestBed.createComponent(PlantScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
