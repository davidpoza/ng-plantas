import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IPlant } from '../models/Iplant';
import { PlantsService } from '../services/plants.service';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { JournalService } from 'src/app/services/journal.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { IJournalEntry } from 'src/app/models/IJournalEntry';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-plant-detail-screen',
  templateUrl: './plant-detail-screen.component.html',
  styleUrls: ['./plant-detail-screen.component.scss']
})
export class PlantDetailScreenComponent implements OnInit {
  plant!: IPlant;
  sheet!: IPlantSheet;
  journal!: IJournalEntry[];
  @Output() refreshJournal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plantsService: PlantsService,
    private plantSheetService: PlantsSheetsService,
    private journalService: JournalService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    let id;
    this.route.params.subscribe(
      (params: Params) => {
        id = params['id'];
      }
    )

    if (id) {
      this.loaderService.setVisibility(true);
      this.plantsService.getPlantById(id)
        .subscribe({
          next: plantResponse => {
            this.plant = { ...plantResponse };
            this.plantSheetService.getPlantSheetById(this.plant.sheetId)
              .subscribe({
                next: sheetResponse => {
                  this.loaderService.setVisibility(false);
                  this.sheet = { ...sheetResponse };
                },
                error: (e: string) => {
                  this.loaderService.setVisibility(false);
                  this._snackBar.open(e, "OK", { duration: 3000 });
                }
              });
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    }

  }

  onTabChange(tabIndex: number) {
    if (tabIndex === 1) {
      this.loaderService.setVisibility(true);
      this.journalService.getJournalEntries(this.plant.id)
        .subscribe({
          next: journalResponse => {
            this.loaderService.setVisibility(false);
            this.journal = [...journalResponse];
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    }
  }

  refresh() {
    this.loaderService.setVisibility(true);
    this.journalService.getJournalEntries(this.plant.id)
      .subscribe({
        next: journalResponse => {
          this.loaderService.setVisibility(false);
          this.journal = [...journalResponse];
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }

  goToEditPlant() {
    this.router.navigate([`edit-plant`], { state: { plant: this.plant, sheet: this.sheet }});
  }

}
