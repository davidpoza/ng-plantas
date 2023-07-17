import { Component, OnInit, Input } from '@angular/core';
import { IPlantSheet } from 'src/app/models/IPlantSheet';
import { IPlant } from 'src/app/models/Iplant';

@Component({
  selector: 'app-visual-indicators',
  templateUrl: './visual-indicators.component.html',
  styleUrls: ['./visual-indicators.component.scss']
})
export class VisualIndicatorsComponent {
  @Input() sheet!: IPlantSheet;
  indicatorArray: number[] = [1,2,3];
}
