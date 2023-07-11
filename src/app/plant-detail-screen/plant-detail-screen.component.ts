import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IPlant } from '../models/Iplant';
import { PlantsService } from '../services/plants.service';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { JournalService } from 'src/app/services/journal.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { IJournalEntry } from 'src/app/models/IJournalEntry';

@Component({
  selector: 'app-plant-detail-screen',
  templateUrl: './plant-detail-screen.component.html',
  styleUrls: ['./plant-detail-screen.component.scss']
})
export class PlantDetailScreenComponent implements OnInit {
  plant!: IPlant;
  sheet!: IPlantSheet;
  journal!: IJournalEntry[];

  constructor(
    private route: ActivatedRoute,
    private plantsService: PlantsService,
    private plantSheetService: PlantsSheetsService,
    private journalService: JournalService
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
      this.plantsService.getPlantById(id)
        .subscribe(plantResponse => {
          this.plant = { ...plantResponse };
          this.plantSheetService.getPlantSheetById(this.plant.sheetId)
            .subscribe(sheetResponse => {
              this.sheet = { ...sheetResponse };
            });
        });
    }

  }

  onTabChange(tabIndex: number) {
    if (tabIndex === 1) {
      this.journalService.getJournalEntries(this.plant.id)
      .subscribe(journalResponse => {
        this.journal = [...journalResponse];
      });
    }
  }

}
