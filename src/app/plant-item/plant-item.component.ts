import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';
import { PlantsService } from '../services/plants.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../services/loader.service';

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
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    this.loaderService.setVisibility(true);
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
  }

  onClick(plantId: number) {
    this.router.navigate([`plant/${plantId}`]);
  }

  onDelete(plantId: number) {
    this.loaderService.setVisibility(true);
    this.plantService.deletePlant(plantId)
      .subscribe({
        next: () => {
          this.loaderService.setVisibility(false);
          this.refreshPlantList.emit();
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
