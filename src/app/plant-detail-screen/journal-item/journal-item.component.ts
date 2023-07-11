import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IJournalEntry } from 'src/app/models/IJournalEntry';
import moment from 'moment';
import { getJournalImageSrcFromType } from 'src/app/utils/helpers';
import { JournalService } from 'src/app/services/journal.service';
import { Router } from '@angular/router';
import { IPlant } from 'src/app/models/Iplant';


@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent implements OnInit {
  @Input() entry!: IJournalEntry;
  @Input() plant!: IPlant;
  @Output() refreshJournal: EventEmitter<void> = new EventEmitter<void>();
  formattedDate!: string;
  imageSrc!: string;

  constructor(
    private journalService: JournalService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.formattedDate = moment.unix(this.entry.timestamp).format('DD [de] MMM YYYY');
    this.imageSrc = `/assets/${getJournalImageSrcFromType(this.entry.type)}`;
  }

  onDelete(entryId: number) {
    this.journalService.deleteJournalEntry(entryId)
      .subscribe(result => {
        this.refreshJournal.emit();
      });
  }

  onEdit(entryId: number) {
    this.router.navigate([`edit-journal/${entryId}`], { state: { plant: this.plant, entry: this.entry } });
  }

}
