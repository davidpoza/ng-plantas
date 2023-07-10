import { Component, OnInit } from '@angular/core';
import { IPlant } from '../models/Iplant';
import { PlantsService } from '../services/plants.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';

@Component({
  selector: 'app-plant-detail-screen',
  templateUrl: './plant-detail-screen.component.html',
  styleUrls: ['./plant-detail-screen.component.scss']
})
export class PlantDetailScreenComponent implements OnInit {
  plant!: IPlant;
  sheet!: IPlantSheet;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private plantsService: PlantsService,
    private plantSheetService: PlantsSheetsService,
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

}
