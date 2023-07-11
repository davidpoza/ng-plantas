import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Location} from '@angular/common';
import moment from 'moment';
import {  ActivatedRoute, Params, Router } from '@angular/router';

import { IPlant } from '../models/Iplant';
import { IJournalEntry, JournalEntryType } from '../models/IJournalEntry';
import { TranslateJournalTypePipe } from '../pipes/translate-journal-type.pipe';
import { JournalService } from '../services/journal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-journal-screen',
  templateUrl: './add-journal-screen.component.html',
  styleUrls: ['./add-journal-screen.component.scss']
})
export class AddJournalScreenComponent implements OnInit {
  plant!: IPlant;
  journalEntry!: IJournalEntry;
  type!: JournalEntryType;
  journalForm! : FormGroup;
  isEdit: boolean;
  activeRoutePath!: string;

  constructor(
    private _location: Location,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translateJournalType: TranslateJournalTypePipe,
    private journalService: JournalService,
    private authService : AuthService,
  ) {
    this.activeRoutePath = this.router.url;
    this.isEdit = this.activeRoutePath.startsWith('/edit-journal');


    if (this.isEdit) {
      this.journalEntry = <IJournalEntry>this.router.getCurrentNavigation()?.extras.state?.['entry'];
      this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state?.['plant'];

    } else {
      this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state;
    }

    this.journalForm = this.initForm();
  }

  initForm() : FormGroup {
    if (!this.isEdit) {
      this.route.params.subscribe(
        (params: Params) => {
          this.type = params['type'];
        }
      )
    } else {
      this.type = this.journalEntry.type;
    }

    return this.fb.group({
      date: [this.isEdit ? moment(this.journalEntry.timestamp * 1000) : moment(), [Validators.required]],
      text: [
        this.isEdit
          ? this.journalEntry.text
          : `${this.translateJournalType.transform(this.type)} realizado a las ${moment().format('HH:mm')}`,
        [Validators.required]],
    })
  }

  ngOnInit() {

  }

  goBack() {
    this._location.back();
  }


  addJournal() {
    if (this.isEdit) {
      this.journalService.editJournalEntry(this.journalEntry.id, {
        plantId: this.plant.id,
        text: this.journalForm.get('text')?.value,
        type: this.journalEntry.type,
        timestamp: moment(this.journalForm.get('date')?.value, 'DD/MM/YYYY').unix(),
        photoURL: this.journalEntry.photoURL,
        userId: this.authService.getUserId(),
      })
        .subscribe(result => {
          this._location.back();
        });
    } else {
      this.journalService.addJournalEntry({
        plantId: this.plant.id,
        text: this.journalForm.get('text')?.value,
        type: this.type,
        timestamp: moment(this.journalForm.get('date')?.value, 'DD/MM/YYYY').unix(),
        photoURL: '',
        userId: this.authService.getUserId(),
      })
        .subscribe(result => {
          this._location.back();
        });
    }

  }
}
