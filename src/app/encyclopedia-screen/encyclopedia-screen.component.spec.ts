import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncyclopediaScreenComponent } from './encyclopedia-screen.component';

describe('EncyclopediaScreenComponent', () => {
  let component: EncyclopediaScreenComponent;
  let fixture: ComponentFixture<EncyclopediaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncyclopediaScreenComponent]
    });
    fixture = TestBed.createComponent(EncyclopediaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
