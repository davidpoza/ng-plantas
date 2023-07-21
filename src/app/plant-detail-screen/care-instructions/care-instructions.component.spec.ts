import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareInstructionsComponent } from './care-instructions.component';
import { VisualIndicatorsComponent } from '../visual-indicators/visual-indicators.component';

describe('CareInstructionsComponent', () => {
  let component: CareInstructionsComponent;
  let fixture: ComponentFixture<CareInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareInstructionsComponent, VisualIndicatorsComponent]
    });
    fixture = TestBed.createComponent(CareInstructionsComponent);
    component = fixture.componentInstance;
    component.sheet = {
      id: 1,
      fertilizationText: 'fertilizar',
      lightNum: 1,
      lightText: 'cantidad luz',
      name: 'planta',
      otherNames: 'nombre científico',
      photoURL: 'https://plantas.com/xxx',
      repottingText: 'replantar',
      soilText: 'tipo suelo',
      toxic: true,
      toxicText: 'es tóxica',
      waterNum: 2,
      waterText: 'cantidad de agua'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
