import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../services/plants.service';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  protected plantList!: IPlant[];

  constructor(
    private plantsService : PlantsService,
    private router: Router,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.loaderService.setVisibility(true);
    this.plantsService.getPlants()
      .subscribe({
        next: (result) => {
          this.loaderService.setVisibility(false);
          this.plantList = result;
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }

  refresh() {
    this.loaderService.setVisibility(true);
    this.plantsService.getPlants()
      .subscribe({
        next: (result) => {
          this.loaderService.setVisibility(false);
          this.plantList = result;
        },
        error: (e: string) => {
          this.loaderService.setVisibility(false);
          this._snackBar.open(e, "OK", { duration: 3000 });
        }
      });
  }

  goAddPlant() {
    this.router.navigate(['search-plant']);
  }
}
