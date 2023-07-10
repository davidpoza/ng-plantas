import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { IPlant } from '../models/Iplant';
import { JournalEntryType } from '../models/IJournalEntry';
import {Location} from '@angular/common';
import moment from 'moment';
@Component({
  selector: 'app-add-journal-screen',
  templateUrl: './add-journal-screen.component.html',
  styleUrls: ['./add-journal-screen.component.scss']
})
export class AddJournalScreenComponent implements OnInit {
  plant: IPlant;
  type!: JournalEntryType;
  journalForm! : FormGroup;

  constructor(
    private _location: Location,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state;
    this.journalForm = this.initForm();
  }

  initForm() : FormGroup {
    return this.fb.group({
      date: ['', [Validators.required]],
      text: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.type = params['type'];
      }
    )

    this.journalForm.get('text')?.setValue(`${this.type} realizado a las ${moment().format('HH:mm')}`);
  }

  goBack() {
    this._location.back();
  }


  addJournal() {

  }
}
