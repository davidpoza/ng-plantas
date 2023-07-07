import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalScreenComponent } from './add-journal-screen.component';

describe('AddJournalScreenComponent', () => {
  let component: AddJournalScreenComponent;
  let fixture: ComponentFixture<AddJournalScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJournalScreenComponent]
    });
    fixture = TestBed.createComponent(AddJournalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
