import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IJournalEntry } from 'src/app/models/IJournalEntry';
import { IPlant } from 'src/app/models/Iplant';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent{
  @Input() journal!: IJournalEntry[];
  @Input() plant!: IPlant;

  @Output() refreshJournal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  propagateEvent() {
    this.refreshJournal.emit();
  }

}
