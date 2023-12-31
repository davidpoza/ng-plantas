import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import moment from 'moment';

import { IPlant } from '../models/Iplant';
import { PlantsService } from '../services/plants.service';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { JournalService } from 'src/app/services/journal.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { IJournalEntry } from 'src/app/models/IJournalEntry';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'src/config';
import { IPaginationOptions } from '../utils/types/ipagination-options';

@Component({
  selector: 'app-plant-detail-screen',
  templateUrl: './plant-detail-screen.component.html',
  styleUrls: ['./plant-detail-screen.component.scss']
})
export class PlantDetailScreenComponent implements OnInit {
  plant!: IPlant;
  sheet!: IPlantSheet;
  journal!: IJournalEntry[];
  journalPhotos!: any[];
  @Output() refreshJournal: EventEmitter<number> = new EventEmitter<number>();
  journalPaginationOptions : IPaginationOptions = {
    page: 0,
    pageSize: 10,
    totalItems: 0,
  };

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
      this.journalPaginationOptions.totalItems = 0;
      this.loaderService.setVisibility(true);
      this.journalService.getJournalEntries(this.plant.id)
        .subscribe({
          next: journalResponse => {
            this.loaderService.setVisibility(false);
            this.journal = [...journalResponse.data];
            this.journalPaginationOptions.totalItems = journalResponse.meta.filter_count;
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    } else if (tabIndex === 2) {
      this.loaderService.setVisibility(true);
      this.journalService.getPhotoEntries(this.plant.id)
        .subscribe({
          next: journalResponse => {
            this.loaderService.setVisibility(false);
            this.journalPhotos = [...journalResponse].map(j => ({
              url : `${config.baseApiUrl}/assets/${j.photo}`,
              thumb : `${config.baseApiUrl}/assets/${j.photo}?key=thumb`,
              title: moment.unix(j.timestamp).format('DD/MM/YYYY')
            }));
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    }
  }

  refresh(page?: number) {
    console.log(page )
    if (page != undefined) this.journalPaginationOptions.page = page;
    this.loaderService.setVisibility(true);
    this.journalService.getJournalEntries(this.plant.id, this.journalPaginationOptions)
      .subscribe({
        next: journalResponse => {
          this.loaderService.setVisibility(false);
          this.journal = [...journalResponse.data];
          this.journalPaginationOptions.totalItems = journalResponse.meta.filter_count;
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
