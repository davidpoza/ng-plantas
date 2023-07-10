import { Component, OnInit, Input } from '@angular/core';
import { IPlantSheet } from 'src/app/models/IPlantSheet';
import { IPlant } from 'src/app/models/Iplant';

@Component({
  selector: 'app-care-instructions',
  templateUrl: './care-instructions.component.html',
  styleUrls: ['./care-instructions.component.scss']
})
export class CareInstructionsComponent implements OnInit {
  @Input() plant!: IPlant;
  @Input() sheet!: IPlantSheet;

  ngOnInit() {

  }
}
