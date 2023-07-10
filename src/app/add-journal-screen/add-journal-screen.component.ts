import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlant } from '../models/Iplant';
import { JournalEntryType } from '../models/IJournalEntry';
@Component({
  selector: 'app-add-journal-screen',
  templateUrl: './add-journal-screen.component.html',
  styleUrls: ['./add-journal-screen.component.scss']
})
export class AddJournalScreenComponent implements OnInit {
  plant: IPlant;
  type!: JournalEntryType;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state;

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.type = params['type'];
      }
    )
  }
}
