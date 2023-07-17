import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetDetailScreenComponent } from './sheet-detail-screen.component';

describe('SheetDetailScreenComponent', () => {
  let component: SheetDetailScreenComponent;
  let fixture: ComponentFixture<SheetDetailScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheetDetailScreenComponent]
    });
    fixture = TestBed.createComponent(SheetDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
