import { Component, OnInit } from '@angular/core';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  sheets!: IPlantSheet[];
  constructor(
    private plantSheetsService: PlantsSheetsService,
  ) {


  }

  ngOnInit() {
    this.plantSheetsService.getAll()
      .subscribe(result => {
        this.sheets = result;
      });
  }


}
