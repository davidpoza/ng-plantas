import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';
import { PlantsService } from '../services/plants.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent {
  @Input() plant!: IPlant;
  @Output() refreshPlantList: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private plantService: PlantsService
  ) {

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
}
