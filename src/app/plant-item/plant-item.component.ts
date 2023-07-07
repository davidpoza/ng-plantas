import { Component, Input } from '@angular/core';
import { IPlant } from '../models/Iplant';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss']
})
export class PlantItemComponent {
  @Input() plant!: IPlant;
}
