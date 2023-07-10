import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JournalEntryType } from 'src/app/models/IJournalEntry';
import { IPlant } from 'src/app/models/Iplant';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  journalEntryType = JournalEntryType;
  @Input() plant!: IPlant;

  constructor(private router: Router) {

  }

  goAddJournalScreen(id: number, type: JournalEntryType) {
    this.router.navigate([`add-journal/${id}/${type}`], { state: this.plant })
  }
}
