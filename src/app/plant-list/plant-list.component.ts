import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../services/plants.service';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';

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
  ) {

  }

  ngOnInit(): void {
    this.plantsService.getPlants()
      .subscribe((result) => {
        console.log(result)
        this.plantList = result;
      });
  }

  refresh() {
    this.plantsService.getPlants()
      .subscribe((result) => {
        console.log(result)
        this.plantList = result;
      });
  }

  goAddPlant() {
    this.router.navigate(['search-plant']);
  }
}
