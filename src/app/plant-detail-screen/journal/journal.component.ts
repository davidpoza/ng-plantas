import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IJournalEntry } from 'src/app/models/IJournalEntry';
import { IPlant } from 'src/app/models/Iplant';
import { IPaginationOptions } from 'src/app/utils/types/ipagination-options';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent{
  @Input() journal!: IJournalEntry[];
  @Input() plant!: IPlant;
  @Input() journalPaginationOptions!: IPaginationOptions;
  @Output() refreshJournal: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  propagateEvent() {
    this.refreshJournal.emit();
  }

  onChangePage(e: PageEvent) {
    console.log("onChangePage", e)
    this.refreshJournal.emit(e.pageIndex);
  }

}
