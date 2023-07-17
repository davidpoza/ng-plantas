import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPlantSheet } from 'src/app/models/IPlantSheet';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() sheet!: IPlantSheet;
  @Input() embedded: boolean = false;

  constructor(
    private router: Router
  ) {

  }

  onClick(sheetId: number){
    if (this.embedded) {
      this.router.navigate([`sheet/${sheetId}`]);
    } else {
      this.router.navigate(['add-plant'], { state: { sheet: this.sheet } });
    }
  }
}
