import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';
import { PlantsService } from '../services/plants.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { PlantsSheetsService } from '../services/plants-sheets.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent implements OnInit {
  @Input() plant!: IPlant;
  @Output() refreshPlantList: EventEmitter<void> = new EventEmitter<void>();
  sheet!: IPlantSheet;

  constructor(
    private router: Router,
    private plantService: PlantsService,
    private plantSheetService: PlantsSheetsService,
  ) {

  }

  ngOnInit() {
    this.plantSheetService.getPlantSheetById(this.plant.sheetId)
      .subscribe(sheetResponse => {
        this.sheet = { ...sheetResponse };
      });
  }

  onClick(plantId: number) {
    this.router.navigate([`plant/${plantId}`]);
  }

  onDelete(plantId: number) {
    this.plantService.deletePlant(plantId)
      .subscribe(() => {
        this.refreshPlantList.emit();
      });
  }

  goToEditPlant() {
    this.router.navigate([`edit-plant`], { state: { plant: this.plant, sheet: this.sheet }});
  }
}
