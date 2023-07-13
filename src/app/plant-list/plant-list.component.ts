import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../services/plants.service';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

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
    private loaderService: LoaderService
  ) {

  }

  ngOnInit(): void {
    this.loaderService.setVisibility(true);
    this.plantsService.getPlants()
      .subscribe((result) => {
        this.loaderService.setVisibility(false);
        this.plantList = result;
      });
  }

  refresh() {
    this.loaderService.setVisibility(true);
    this.plantsService.getPlants()
      .subscribe((result) => {
        this.loaderService.setVisibility(false);
        this.plantList = result;
      });
  }

  goAddPlant() {
    this.router.navigate(['search-plant']);
  }
}
