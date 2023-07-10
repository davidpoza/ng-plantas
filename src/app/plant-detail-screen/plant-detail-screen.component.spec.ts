import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDetailScreenComponent } from './plant-detail-screen.component';

describe('PlantDetailScreenComponent', () => {
  let component: PlantDetailScreenComponent;
  let fixture: ComponentFixture<PlantDetailScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantDetailScreenComponent]
    });
    fixture = TestBed.createComponent(PlantDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
