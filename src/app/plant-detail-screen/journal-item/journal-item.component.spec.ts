import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalItemComponent } from './journal-item.component';

describe('JournalItemComponent', () => {
  let component: JournalItemComponent;
  let fixture: ComponentFixture<JournalItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalItemComponent]
    });
    fixture = TestBed.createComponent(JournalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
