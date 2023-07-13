import { Component, OnInit } from '@angular/core';
import { PlantsSheetsService } from '../services/plants-sheets.service';
import { IPlantSheet } from '../models/IPlantSheet';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  sheets!: IPlantSheet[];
  constructor(
    private plantSheetsService: PlantsSheetsService,
    private loaderService: LoaderService
  ) {


  }

  ngOnInit() {
    this.loaderService.setVisibility(true);
    this.plantSheetsService.getAll()
      .subscribe(result => {
        this.loaderService.setVisibility(false);
        this.sheets = result;
      });
  }


}
