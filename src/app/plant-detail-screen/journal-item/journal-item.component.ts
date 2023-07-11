import { Component, Input, OnInit } from '@angular/core';
import { IJournalEntry } from 'src/app/models/IJournalEntry';
import moment from 'moment';
import { getJournalImageSrcFromType } from 'src/app/utils/helpers';


@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent implements OnInit {
  @Input() entry!: IJournalEntry;
  formattedDate!: string;
  imageSrc!: string;

  ngOnInit() {
    this.formattedDate = moment.unix(this.entry.timestamp).format('DD [de] MMM YYYY');
    this.imageSrc = `/assets/${getJournalImageSrcFromType(this.entry.type)}`;
  }

}
