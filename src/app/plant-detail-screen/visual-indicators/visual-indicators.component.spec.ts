import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualIndicatorsComponent } from './visual-indicators.component';

describe('VisualIndicatorsComponent', () => {
  let component: VisualIndicatorsComponent;
  let fixture: ComponentFixture<VisualIndicatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualIndicatorsComponent]
    });
    fixture = TestBed.createComponent(VisualIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
