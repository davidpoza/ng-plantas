import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareInstructionsComponent } from './care-instructions.component';

describe('CareInstructionsComponent', () => {
  let component: CareInstructionsComponent;
  let fixture: ComponentFixture<CareInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareInstructionsComponent]
    });
    fixture = TestBed.createComponent(CareInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
