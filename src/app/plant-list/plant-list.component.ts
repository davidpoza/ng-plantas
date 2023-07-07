import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../services/plants.service';
import { IPlant } from '../models/Iplant';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  private plantList!: IPlant[];

  constructor(private plantsService : PlantsService) {

  }

  ngOnInit(): void {
    this.plantsService.getPlants()
      .subscribe((result) => {
        console.log(result)
        this.plantList = result;
      });
  }
}
