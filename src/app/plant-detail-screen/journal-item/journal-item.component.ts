import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IJournalEntry, JournalEntryType } from 'src/app/models/IJournalEntry';
import moment from 'moment';
import { getJournalImageSrcFromType } from 'src/app/utils/helpers';
import { JournalService } from 'src/app/services/journal.service';
import { Router } from '@angular/router';
import { IPlant } from 'src/app/models/Iplant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { config } from 'src/config';


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
    private router: Router,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.formattedDate = moment.unix(this.entry.timestamp).format('DD [de] MMM YYYY');
    if (this.entry.type === JournalEntryType.photo) {
      this.imageSrc = `${config.baseApiUrl}/assets/${this.entry.photo}`;
    } else {
      this.imageSrc = `/assets/${getJournalImageSrcFromType(this.entry.type)}`;
    }
  }

  onDelete(entryId: number) {
    this.loaderService.setVisibility(true);
    this.journalService.deleteJournalEntry(entryId)
      .subscribe({
        next: result => {
          this.loaderService.setVisibility(false);
          this.refreshJournal.emit();
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }

  onEdit(entryId: number) {
    this.router.navigate([`edit-journal/${entryId}`], { state: { plant: this.plant, entry: this.entry } });
  }

}
