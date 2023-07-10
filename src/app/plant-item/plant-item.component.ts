import { Component, Input } from '@angular/core';
import { IPlant } from '../models/Iplant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent {
  @Input() plant!: IPlant;

  constructor(private router: Router) {

  }

  onClick(plantId: number) {
    this.router.navigate([`plant/${plantId}`]);
  }
}
